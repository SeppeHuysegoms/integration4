/*import { useState, useMemo, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {useAutocomplete} from "@ubilabs/google-maps-react-hooks";

import "../App.css";
import { createRoot } from "react-dom/client";
const App = () => {
  return (
    <Wrapper
      apiKey="AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ"
      version="beta"
      libraries={["marker, places"]}
    >
      <MyMap />
    </Wrapper>
  );
};

const mapOptions = {
  mapId: "AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ",
  center: { lat: 50.8659, lng: 4.6309 },
  zoom: 13,
  disableDefaultUI: true,
};

function MyMap() {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);
  return (
    <>
      <div ref={ref} id="map" />
    </>
  );
}

function AutoComplete() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useAutocomplete({
    inputField: inputRef && inputRef.current,
  });
  console.log(inputRef);

  return (
    <input ref={inputRef} value={inputValue} onChange={event => setInputValue(event.target.value)} />
  );
}



export default App;*/


import { useState, useMemo, useEffect, useRef } from "react";
import {GoogleMap, useLoadScript, MarkerF, InfoWindow} from "@react-google-maps/api";
import icon from "../assets/flower.png";


export default function App() {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ",
  });

  if (!isLoaded) return <div>Loading... </div>;
  return  <div> <Map /> </div>;
}

const Map = () => {
  
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 50.8659, lng: 4.6309 });
  const image = {
    url: icon,
    scaledSize: new window.google.maps.Size(40, 40),
    className: "markerBloem",
  };
  return (
    <div>
      <h1>Map</h1>
      <GoogleMap
        zoom={10}
        center={center}
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
}

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

}

const getName = async (position) => {
  let details = new URL(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat()},${position.lng()}&radius=10&key=AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ`
  );
  let response = await fetch(details);
  let data = await response.json();
  console.log(data);
};

