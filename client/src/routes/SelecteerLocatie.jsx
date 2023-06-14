import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/flower.png";
//import ZoekVeld from "../components/InputZoek";

import { createRoot } from "react-dom/client";
let selectedLocation = null;
let selelectedLocatieNaam = null;

const App = () => {
  if (localStorage.getItem("locatieNaam") != null) {
    selelectedLocatieNaam = localStorage.getItem("locatieNaam");
  }

  return (
    <>
      <h1> Locatie kiezen </h1>
      <p>Duid op de kaart de plek aan die voor jou van groot belang is.</p>

      <p>
        Denk bijvoorbeeld aan een plek waar je kan ontspannen, een plek waar jij
        je thuis voelt...
      </p>

      <p>Gekozen plek</p>
      <Locatie />
      <MyMap />

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

function MyMap() {
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 50.8268, lng: 3.2544 });
  const [input, setInput] = useState("");
  const [voorstellen, setVoorstellen] = useState([]);

  const [map, setMap] = useState();

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

  if (
    localStorage.getItem("lat") != null &&
    localStorage.getItem("lng") != null &&
    map != null
  ) {
    let lat = localStorage.getItem("lat");
    let lng = localStorage.getItem("lng");
    let position = new google.maps.LatLng(lat, lng);
    map.setCenter({
      lat: position.lat(),
      lng: position.lng(),
    });
    addMarker(position, map);
  }

  if (map) {
    map.addListener("click", (e) => {
      onMapClick(e, setMarker, setCenter, map, marker);
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

function Locatie() {
  useEffect(() => {
    console.log(selelectedLocatieNaam);
    const showName = () => {
      if (selelectedLocatieNaam != null) {
        return <p>{selelectedLocatieNaam}</p>;
      } else {
        return <p>Klik op een plek op de kaart</p>;
      }
    };

    showName();
  }, [selelectedLocatieNaam]);
}

const onMapClick = (event, setMarker, setCenter, map, marker) => {
  map.setCenter({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  });
  //getName(event.latLng);

  addMarker(event.latLng, map);
};

const addMarker = async (location, map) => {
  const iconBloem = document.createElement("img");
  iconBloem.src = icon;
  iconBloem.className = "markerBloem";
  let mark = new google.maps.marker.AdvancedMarkerElement({
    position: location,
    map: map,
    content: iconBloem,
  });

  if (selectedLocation != null) {
    selectedLocation.setMap(null);
  }
  selectedLocation = mark;
  let name = await getName(location, map);
  console.log(name);

  if (name[0].name !== "Kortrijk" && name[0].types[0] !== "route") {
    localStorage.setItem("locatieNaam", name[0].name);
    localStorage.setItem("placeId", name[0].place_id);
    localStorage.setItem("lat", `${location.lat()}`);
    localStorage.setItem("lng", `${location.lng()}`);
    localStorage.setItem("adres", name[0].vicinity);
  } else if (
    name[1] !== undefined &&
    name[1].types[0] !== "route" &&
    name[1].name !== "Kortrijk"
  ) {
    localStorage.setItem("locatieNaam", name[1].name);
    localStorage.setItem("placeId", name[1].place_id);
    localStorage.setItem("lat", `${location.lat()}`);
    localStorage.setItem("lng", `${location.lng()}`);
    localStorage.setItem("adres", name[1].vicinity);
  } else {
    if (name[0].name !== "Kortrijk") {
      localStorage.setItem("locatieNaam", name[0].name);
      localStorage.setItem("placeId", name[0].place_id);
      localStorage.setItem("lat", `${location.lat()}`);
      localStorage.setItem("lng", `${location.lng()}`);
      localStorage.setItem("adres", name[0].vicinity);
    }
  }
  selelectedLocatieNaam = localStorage.getItem("locatieNaam");
};

const getName = async (position, map) => {
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
        resolve(results);
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
