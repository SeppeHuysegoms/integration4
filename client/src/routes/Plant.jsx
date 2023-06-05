import { useState, useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


import "../App.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

function Map() {

  constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }
    const center = useMemo(() => ({ lat: 50.8268, lng: 3.2544 }), []);
    const [selected, setSelected] = useState(null);
  return (
    <GoogleMap
      mapContainerClassName="map-container"
      center={{ lat: 50.8268, lng: 3.2544 }}
      zoom={10}
    >
      <MarkerF position={{ lat: 50.8268, lng: 3.2544 }} />
    </GoogleMap>
  );
}

export default App;
