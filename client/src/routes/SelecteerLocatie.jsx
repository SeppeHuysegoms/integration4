import { useState, useMemo, useEffect, useRef } from "react";
import { Link, redirect } from "react-router-dom";
import icon from "../assets/flower.png";
//import ZoekVeld from "../components/InputZoek";

import { createRoot } from "react-dom/client";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  // if (localStorage.getItem("locatieNaam") != null) {
  //   selelectedLocatieNaam = localStorage.getItem("locatieNaam");
  // }

  const handleMapSelectLocation = (location) => {
    // console.log("handleMapSelectLocation", location);
    setSelectedLocation(location);
  };

  return (
    <>
      <h1> Locatie kiezen </h1>
      <p>Duid op de kaart de plek aan die voor jou van groot belang is.</p>

      <p>
        Denk bijvoorbeeld aan een plek waar je kan ontspannen, een plek waar jij
        je thuis voelt...
      </p>

      <p>Gekozen plek</p>
      <Locatie selectedLocation={selectedLocation} />
      <MyMap
        onSelectLocation={handleMapSelectLocation}
        selectedLocation={selectedLocation}
      />

      <Link to="/schrijfverhaal"> Volgende</Link>
    </>
  );
};
const KortrijkBounds = {
  north: 50.84316251839117,
  south: 50.80540292260651,
  west: 3.2253969501072177,
  east: 3.2892555150254587,
};

function MyMap({ onSelectLocation, selectedLocation }) {
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 50.8268, lng: 3.2544 });
  const [input, setInput] = useState("");
  const [voorstellen, setVoorstellen] = useState([]);

  const [map, setMap] = useState();
  const markersRef = useRef([]);

  const ref = useRef();

  useEffect(() => {
    setMap(
      new window.google.maps.Map(ref.current, {
        clickableIcons: false,
        mapId: "9e75666bc6c2ee87",
        center: { lat: 50.8268, lng: 3.2544 },
        zoom: 5,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: KortrijkBounds,
          strictBounds: true,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (selectedLocation && map) {
      const iconBloem = document.createElement("img");
      iconBloem.src = icon;
      iconBloem.className = "markerBloem";
      // clear all markers from the map
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      let mark = new google.maps.marker.AdvancedMarkerElement({
        position: selectedLocation.geometry.location,
        map: map,
        content: iconBloem,
      });
      markersRef.current.push(mark);
    }
  }, [selectedLocation, map]);

  // if (
  //   localStorage.getItem("lat") != null &&
  //   localStorage.getItem("lng") != null &&
  //   map != null
  // ) {
  //   let lat = localStorage.getItem("lat");
  //   let lng = localStorage.getItem("lng");
  //   let position = new google.maps.LatLng(lat, lng);
  //   map.setCenter({
  //     lat: position.lat(),
  //     lng: position.lng(),
  //   });
  //   addMarker(position, map);
  // }

  if (map) {
    map.addListener("click", async (event) => {
      map.setCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });

      // clear all markers from the map
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const iconBloem = document.createElement("img");
      iconBloem.src = icon;
      iconBloem.className = "markerBloem";
      let mark = new google.maps.marker.AdvancedMarkerElement({
        position: event.latLng,
        map: map,
        content: iconBloem,
      });
      markersRef.current.push(mark);

      const location = await nearbySearch(event.latLng, map);
      onSelectLocation(location);

      //   if (results[0].name !== "Kortrijk" && results[0].types[0] !== "route") {
      //     onSelectLocation(results[0]);
      //     // localStorage.setItem("locatieNaam", results[0].name);
      //     // localStorage.setItem("placeId", results[0].place_id);
      //     // localStorage.setItem("lat", `${location.lat()}`);
      //     // localStorage.setItem("lng", `${location.lng()}`);
      //     // localStorage.setItem("adres", results[0].vicinity);
      //   } else if (
      //     results[1] !== undefined &&
      //     results[1].types[0] !== "route" &&
      //     results[1].name !== "Kortrijk"
      //   ) {
      //     onSelectLocation(results[1]);
      //     // localStorage.setItem("locatieNaam", results[1].name);
      //     // localStorage.setItem("placeId", results[1].place_id);
      //     // localStorage.setItem("lat", `${location.lat()}`);
      //     // localStorage.setItem("lng", `${location.lng()}`);
      //     // localStorage.setItem("adres", results[1].vicinity);
      //   } else {
      //     if (results[0].name !== "Kortrijk") {
      //       onSelectLocation(results[0]);
      //       // localStorage.setItem("locatieNaam", results[0].name);
      //       // localStorage.setItem("placeId", results[0].place_id);
      //       // localStorage.setItem("lat", `${location.lat()}`);
      //       // localStorage.setItem("lng", `${location.lng()}`);
      //       // localStorage.setItem("adres", results[0].vicinity);
      //     }
      //   }
      //   // selelectedLocatieNaam = localStorage.getItem("locatieNaam");
    });
  }

  return (
    <>
      <ZoekVeld
        input={input}
        setInput={setInput}
        voorstellen={voorstellen}
        setVoorstellen={setVoorstellen}
        map={map}
        selectedLocation={selectedLocation}
      />
      <div ref={ref} className="test" id="map" />
    </>
  );
}

function Locatie({ selectedLocation }) {
  console.log(selectedLocation);
  if (selectedLocation) {
    return <p>{selectedLocation.name}</p>;
  }
  return <p>Klik op een plek op de kaart</p>;
}

const nearbySearch = async (position, map) => {
  return new Promise(async (resolve) => {
    const { PlacesService, RankBy } = await google.maps.importLibrary("places");
    const service = new PlacesService(map);
    service.nearbySearch(
      {
        location: position,
        radius: 20,
        rankby: RankBy.DISTANCE,
      },
      (results) => {
        for (let result of results) {
          if (
            result.name !== "Kortrijk" &&
            result.types &&
            result.types[0] !== "route"
          ) {
            return resolve(result);
          }
        }
        for (let result of results) {
          if (result.name !== "Kortrijk") {
            return resolve(result);
          }
        }
        resolve(null);
      }
    );
  });
};

const ZoekVeld = ({
  input,
  setInput,
  voorstellen,
  setVoorstellen,
  map,
  selectedLocation,
}) => {
  const southWest = new google.maps.LatLng(
    50.82040292260651,
    3.2133969501072177
  );
  const northEast = new google.maps.LatLng(
    50.83216251839117,
    3.3122555150254587
  );
  const KortrijkBounds = new google.maps.LatLngBounds(southWest, northEast);
  if (input) {
    useEffect(() => {
      const placesDemo = async () => {
        const { AutocompleteService } = await google.maps.importLibrary(
          "places"
        );
        const service = new AutocompleteService();
        const prediction = await service.getPlacePredictions({
          input: `${input}`,
          CompositionRestrictions: { country: "be" },
          locationRestriction: KortrijkBounds,
          fields: ["place_id", "name", "address_components", "geometry "],
        });
        let arrayPrediction = [];
        prediction.predictions.map((prediction) => {
          arrayPrediction.push(prediction);
        });
        console.log(arrayPrediction);
        setVoorstellen(arrayPrediction);
      };

      placesDemo();
    }, [input]);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Zoek een locatie"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {voorstellen && input && (
        <ul>
          {voorstellen.map((voorstel) => (
            <li
              key={voorstel.place_id}
              onClick={() =>
                addMarkerZoek(voorstel.place_id, map, setInput, voorstel)
              }
            >
              {voorstel.structured_formatting.main_text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const addMarkerZoek = async (placeID, map, setInput, voorstel) => {
  setInput("");
  let position = await getPos(placeID, map);
  console.log(position);
  let location = new google.maps.LatLng(
    position.geometry.location.lat(),
    position.geometry.location.lng()
  );
  map.setCenter({
    lat: location.lat(),
    lng: location.lng(),
  });
  localStorage.setItem("locatieNaam", voorstel.structured_formatting.main_text);
  localStorage.setItem("placeId", placeID);
  localStorage.setItem("lat", `${location.lat()}`);
  localStorage.setItem("lng", `${location.lng()}`);
  localStorage.setItem("adres", position.formatted_address);
  selelectedLocatieNaam = voorstel.structured_formatting.main_text;

  const iconBloem = document.createElement("img");
  iconBloem.src = icon;
  iconBloem.className = "markerBloem";
  let mark = new google.maps.marker.AdvancedMarkerElement({
    position: location,
    map: map,
    content: iconBloem,
  });
  console.log(selectedLocation);
  if (selectedLocation != null) {
    selectedLocation.setMap(null);
  }
  selectedLocation = mark;
};

const getPos = async (placeID, map) => {
  return new Promise(async (resolve) => {
    const { PlacesService } = await google.maps.importLibrary("places");
    const service = new PlacesService(map);
    service.getDetails(
      {
        placeId: `${placeID}`,
      },
      (results) => {
        resolve(results);
      }
    );
  });
};

export default App;
