import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import "../style/insturen.css";
import NavForm from "../components/NavForm";

import locatie from "../assets/locatie.json";
import markerBloem from "../assets/images/markerBloem.svg";
import zoek from "../assets/images/zoek.svg";
import arrow from "../assets/images/arrow.svg";
import marker from "../assets/marker.svg";

import { createRoot } from "react-dom/client";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("locatieNaam") != null) {
      setSelectedLocation({
        locatieNaam: localStorage.getItem("locatieNaam"),
        placeId: localStorage.getItem("placeId"),
        lat: localStorage.getItem("lat"),
        lng: localStorage.getItem("lng"),
        adres: localStorage.getItem("adres"),
      });
    }
  }, []);

  const handleMapSelectLocation = (location) => {
    if (location === null) {
      setSelectedLocation(null);
      localStorage.removeItem("locatieNaam");
      localStorage.removeItem("placeId");
      localStorage.removeItem("lat");
      localStorage.removeItem("lng");
      localStorage.removeItem("adres");
      return;
    }
    setSelectedLocation(location[0]);
    localStorage.setItem("locatieNaam", location[0].locatieNaam);
    localStorage.setItem("placeId", location[0].placeId);
    localStorage.setItem("lat", location[0].lat);
    localStorage.setItem("lng", location[0].lng);
    localStorage.setItem("adres", location[0].adres);
  };

  return (
    <div className="insturen">
      <NavForm step={1} />

      <div className="insturen__content">
        <header className="header--insturen header--selecteerLocatie">
          <h1 className="insturen__titel"> Locatie kiezen </h1>
          <Lottie animationData={locatie} className="insturen__animatie" />
        </header>

        <section className="section--insturen section--selecteerLocatie">
          <p>Duid op de kaart de plek aan die voor jou van groot belang is.</p>

          <p>
            Denk aan een plek waar jij je thuis voelt, een plek die een
            belangrijke betekenis voor jou heeft.
          </p>
        </section>

        <section className="selecteerLocatie__kaart">
          <MyMap
            onSelectLocation={handleMapSelectLocation}
            selectedLocation={selectedLocation}
          />
        </section>

        <section className="section__gekozenLocatie">
          <h2 className="insturen__titel gekozenLocatie__titel">
            Gekozen plek
          </h2>
          <Locatie selectedLocation={selectedLocation} />
        </section>

        <div className="centerButton button__selecteerLocatie">
          <Bevestig selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  );
};

function Bevestig({ selectedLocation }) {
  if (selectedLocation) {
    return (
      <Link
        to="/schrijfverhaal"
        className="button button--white"
        onClick={() => {
          window.scroll(0, 0);
        }}
      >
        <img src={arrow} alt="arrow" className="arrowButton" />
        Naar boodschap
      </Link>
    );
  } else {
    return (
      <div className="button button--white button--disabled">
        <img src={arrow} alt="arrow" className="arrowButton" />
        <p>Naar boodschap</p>
      </div>
    );
  }
}
const KortrijkBounds = {
  north: 50.84316251839117,
  south: 50.80540292260651,
  west: 3.2253969501072177,
  east: 3.2892555150254587,
};

function MyMap({ onSelectLocation, selectedLocation }) {
  const [marker, setMarker] = useState(null);
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
      iconBloem.src = markerBloem;
      iconBloem.className = "markerBloem";
      // clear all markers from the map
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      let position = new google.maps.LatLng(
        selectedLocation.lat,
        selectedLocation.lng
      );
      map.setCenter({
        lat: position.lat(),
        lng: position.lng(),
      });

      let mark = new google.maps.marker.AdvancedMarkerElement({
        position: position,
        map: map,
        content: iconBloem,
      });
      markersRef.current.push(mark);
    }
  }, [selectedLocation, map]);

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
      iconBloem.src = markerBloem;
      iconBloem.className = "markerBloem";
      let mark = new google.maps.marker.AdvancedMarkerElement({
        position: event.latLng,
        map: map,
        content: iconBloem,
      });
      markersRef.current.push(mark);

      const location = await nearbySearch(event.latLng, map);

      if (location === null) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        onSelectLocation(null);
        return;
      }

      onSelectLocation([
        {
          locatieNaam: location.name,
          placeId: location.place_id,
          lat: location.geometry.location.lat(),
          lng: location.geometry.location.lng(),
          adres: location.vicinity,
        },
      ]);
      //onSelectLocation(location);
    });
  }

  return (
    <div className="kaart--insturen">
      <ZoekVeld
        input={input}
        setInput={setInput}
        voorstellen={voorstellen}
        setVoorstellen={setVoorstellen}
        map={map}
        selectedLocation={selectedLocation}
        onSelectLocation={onSelectLocation}
        markersRef={markersRef}
      />
      <div ref={ref} className="map" id="map" />
    </div>
  );
}

function Locatie({ selectedLocation }) {
  console.log(selectedLocation);
  if (selectedLocation) {
    return <p>{selectedLocation.locatieNaam}</p>;
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
        radius: 30,
        rankby: RankBy.DISTANCE,
      },
      (results) => {
        // console.log(results);
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
  onSelectLocation,
  markersRef,
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
        // console.log(arrayPrediction);
        setVoorstellen(arrayPrediction);
      };

      placesDemo();
    }, [input]);
  }

  return (
    <div className="zoekVeld--kaart">
      <div className="zoekVeld__input">
        <img src={zoek} alt="zoek" className="zoekVeld__zoek" />
        <input
          type="text"
          placeholder="Zoek hier..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {voorstellen && input && (
        <ul className="voorstellen__list">
          {voorstellen.map((voorstel) => (
            <li
              className="voorstellen__item"
              key={voorstel.place_id}
              onClick={() =>
                addMarkerZoek(
                  voorstel.place_id,
                  map,
                  setInput,
                  voorstel,
                  markersRef,
                  onSelectLocation
                )
              }
            >
              <img src={marker} alt="marker" className="marker" />
              <div>
                <p>{voorstel.structured_formatting.main_text}</p>
                <p>{voorstel.structured_formatting.secondary_text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const addMarkerZoek = async (
  placeID,
  map,
  setInput,
  voorstel,
  markersRef,
  onSelectLocation
) => {
  setInput("");
  let position = await getPos(placeID, map);

  let location = new google.maps.LatLng(
    position.geometry.location.lat(),
    position.geometry.location.lng()
  );

  map.setCenter({
    lat: location.lat(),
    lng: location.lng(),
  });

  markersRef.current.forEach((marker) => marker.setMap(null));
  markersRef.current = [];

  onSelectLocation([
    {
      locatieNaam: voorstel.structured_formatting.main_text,
      placeId: placeID,
      lat: location.lat(),
      lng: location.lng(),
      adres: position.formatted_address,
    },
  ]);

  const iconBloem = document.createElement("img");
  iconBloem.src = markerBloem;
  iconBloem.className = "markerBloem";
  let mark = new google.maps.marker.AdvancedMarkerElement({
    position: location,
    map: map,
    content: iconBloem,
  });
  markersRef.current.push(mark);
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
