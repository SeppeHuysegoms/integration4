import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/flower.png";
import ZoekVeld from "../components/InputZoek";

import { createRoot } from "react-dom/client";
let selectedLocation = null;

const App = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    if (localStorage.getItem("locatieNaam") != null) {
      setLocation(localStorage.getItem("locatieNaam"));
    }
  }, []);

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
    console.log(lat);
    console.log(lng);
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
  if (!localStorage.getItem("locatieNaam")) {
    return <p>{localStorage.getItem("locatieNaam")}</p>;
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

const addMarker = async (location, map) => {
  console.log("location");
  const iconBloem = document.createElement("img");
  iconBloem.src = icon;
  iconBloem.className = "markerBloem";
  console.log(location);
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

  if (name[0].name !== "Kortrijk" && name[0].types[0] !== "route") {
    console.log(1);
    localStorage.setItem("locatieNaam", name[0].name);
    localStorage.setItem("placeId", name[0].place_id);
    localStorage.setItem("lat", `${location.lat()}`);
    localStorage.setItem("lng", `${location.lng()}`);
  } else if (
    name[1] !== undefined &&
    name[1].types[0] !== "route" &&
    name[1].name !== "Kortrijk"
  ) {
    console.log(2);
    localStorage.setItem("locatieNaam", name[1].name);
    localStorage.setItem("placeId", name[1].place_id);
    localStorage.setItem("lat", `${location.lat()}`);
    localStorage.setItem("lng", `${location.lng()}`);
  } else {
    console.log(3);
    if (name[0].name !== "Kortrijk") {
      localStorage.setItem("locatieNaam", name[0].name);
      localStorage.setItem("placeId", name[0].place_id);
      localStorage.setItem("lat", `${location.lat()}`);
      localStorage.setItem("lng", `${location.lng()}`);
    }
  }
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
        console.log(results);
        resolve(results);
      }
    );
  });
};

export default App;
