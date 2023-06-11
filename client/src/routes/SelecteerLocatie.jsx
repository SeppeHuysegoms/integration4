/*import { Link } from "react-router-dom";
import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import icon from "../assets/flower.png";


export default function Index() {
  const [location, setLocation] = useState();

  return (
    <>
      <h1> Locatie kiezen </h1>
      <p>Duid op de kaart de plek aan die voor jou van groot belang is.</p>

      <p>
        Denk bijvoorbeeld aan een plek waar je kan ontspannen, een plek waar jij
        je thuis voelt...
      </p>

      <p>Gekozen plek</p>

      <Locatie location={location} />

      <Kaart />

      <Link
        onClick={() => {
          localStorage.setItem("locatieNaam", "test");
          localStorage.setItem("placeId", "123");
          localStorage.setItem("lat", location.lat);
          localStorage.setItem("lng", location.lng);
        }}
        to="/schrijfverhaal"
      >
        {" "}
        Volgende
      </Link>
    </>
  );
}

function Locatie(location) {
  if (!location) {
    return <p>{location}</p>;
  } else {
    return <p>Klik op een plek op de kaart</p>;
  }
}

function Kaart() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ",
  });

  if (!isLoaded) return <div>Loading... </div>;
  return (
    <div>
      <Map />
    </div>
  );
}

const Map = () => {
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 50.8268, lng: 3.2544 });
  const image = {
    url: icon,
    scaledSize: new window.google.maps.Size(40, 40),
    className: "markerBloem",
  };
  const KortrijkBounds = {
    north: 50.83216251839117,
    south: 50.82040292260651,
    west: 3.2133969501072177,
    east: 3.3122555150254587,
  };
  return (
    <div>
      <h1>Map</h1>
      <GoogleMap
        zoom={12}
        center={center}
        options={{ restriction: { latLngBounds: KortrijkBounds, strictBounds: false } }}
        mapContainerClassName="mapContainer"
        onClick={(e) => onMapClick(e, setMarker, setCenter)}
      >
        {marker &&
          (console.log(marker),
          (
            <MarkerF
              icon={image}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))}
      </GoogleMap>
      {marker && (
        <>
          <p>longitude: {marker.lng}</p>
          <p>latitude: {marker.lat}</p>
        </>
      )}
    </div>
  );
};

const onMapClick = (event, setMarker, setCenter) => {
  setMarker({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
    time: new Date(),
  });
  setCenter({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  });
  //getName(event.latLng);
  console.log(event.latLng.lat());
};

const getName = async (position) => {
  let details = new URL(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat()},${position.lng()}&radius=10&key=AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ`
  );
  let response = await fetch(details);
  let data = await response.json();
  console.log(data);
};*/

import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/flower.png";
import ZoekVeld from "../components/InputZoek"

import "../App.css";
import { createRoot } from "react-dom/client";
let selectedLocation = null;

const App = () => {
  const [location, setLocation] = useState();
  const [input, setInput] = useState('');
  const [voorstellen, setVoorstellen] = useState([]);
  const [selected, setSelected] = useState(null);
  return (
    <>
      <h1> Locatie kiezen </h1>
      <p>Duid op de kaart de plek aan die voor jou van groot belang is.</p>

      <p>
        Denk bijvoorbeeld aan een plek waar je kan ontspannen, een plek waar jij
        je thuis voelt...
      </p>

      <p>Gekozen plek</p>

      <Locatie location={location} />
      <ZoekVeld
        input={input}
        setInput={setInput}
        voorstellen={voorstellen}
        setVoorstellen={setVoorstellen}
      />
      <MyMap />

      <Link
        onClick={() => {
          localStorage.setItem("locatieNaam", "test");
          localStorage.setItem("placeId", "123");
          localStorage.setItem("lat", location.lat);
          localStorage.setItem("lng", location.lng);
        }}
        to="/schrijfverhaal"
      >
        {" "}
        Volgende
      </Link>
    </>
  );
};
const KortrijkBounds = {
  north: 50.84516251839117,
  south: 50.81240292260651,
  west: 3.2133969501072177,
  east: 3.3122555150254587,
};


function MyMap() {
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 50.8268, lng: 3.2544 });
  const [map, setMap] = useState();
  const image = {
    url: icon,
    scaledSize: new window.google.maps.Size(40, 40),
    className: "markerBloem",
  };
  const ref = useRef();

  useEffect(() => {
    setMap(
      new window.google.maps.Map(ref.current, {
        clickableIcons: false,
        mapId: "9e75666bc6c2ee87",
        center: { lat: 50.8268, lng: 3.2544 },
        zoom: 13,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: KortrijkBounds,
          strictBounds: false,
        },
      })
    );
  }, []);

  if (map) {
    map.addListener("click", (e) => {
      onMapClick(e, setMarker, setCenter, map, marker);
    });
  }

  return (
    <>
      <div ref={ref} className="test" id="map" />
    </>
  );
}

function Locatie(location) {
  if (!location) {
    return <p>{location}</p>;
  } else {
    return <p>Klik op een plek op de kaart</p>;
  }
}

const onMapClick = (event, setMarker, setCenter, map, marker) => {

  map.setCenter({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  });
  //getName(event.latLng);
  console.log(event.latLng.lat());

  addMarker(event.latLng, map);
};

const addMarker = (location, map) => {
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
  getName(location);
};

const getName = async (position) => {

  const { PlacesService, RankBy } = await google.maps.importLibrary("places");
  console.log(PlacesService);
  const order = RankBy.DISTANCE;
  const service = new PlacesService();
  console.log(service.nearbySearch);
  const locations = await service.nearbySearch({
    location: position,
    rankBy: order,
  });
  console.log(locations);

};


export default App;
