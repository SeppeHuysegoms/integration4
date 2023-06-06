import { useState, useMemo, useEffect, useRef } from "react";
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
      <AutoComplete />
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



export default App;
