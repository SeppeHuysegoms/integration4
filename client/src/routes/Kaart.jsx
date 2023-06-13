import { useState, useMemo, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Link, useLoaderData } from "react-router-dom";
import icon from "../assets/flower.png";

import { createRoot } from "react-dom/client";
import { getStories } from "../entries";

export async function loader({request}) {
  const stories = await getStories();
  return {stories};
}

const App = () => {
  const {stories} = useLoaderData();
  console.log(stories);
  const [selectedStory, setSelectedStory] = useState();
  return (
    <>
      <h1>B(l)oeiende plekken</h1>
      <p>
        Elk verhaal laat Kortrijk meer en meer bloeien. Kijk voor wie jouw
        plaats ook b(l)oeit of ontdek misschien een nieuwe plek.
      </p>
      <a href="#map">Bekijk kaart</a>
      <div>
        <div>
          <p>120</p>
          <p>Dagen om deel te nemen</p>
        </div>
        <div>
          <p>1305</p>
          <p>Zaadjes geplant</p>
        </div>
        <div>
          <p>60</p>
          <p>Verschillende b(l)oeiende plekken</p>
        </div>
      </div>
      <MyMap stories={stories} id="map" />
      <h2>Wat is jouw verhaal?</h2>
      <p>
        Heb jij zelf ook een plek die je zou laten willen bloeien in Kortrijk?
        Zoek onze posters in de stad of houd onze Instagram pagina in de gaten.
        Je kan namelijk kans maken op een leuke extra!
      </p>
      <a>@Bloeiend!</a>
      <p>
        Te veel moeite voor je? Don’t worry! Je kan ook vanaf hier simpelweg je
        verhaal planten.
      </p>
      <Link to="/plant">Plant jouw verhaal</Link>
    </>
  );
};

const mapOptions = {
  mapId: "AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ",
  center: { lat: 50.8268, lng: 3.2544 },
  zoom: 13,
  disableDefaultUI: true,
  mapId: "65d60a0f50d564df",
};

function MyMap({stories}) {
  console.log(stories);
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);
  console.log(ref);
  return (
    <>
      <div ref={ref} className="test" id="map" />
      {map && <Bloeiend map={map} stories={stories} />}
    </>
  );
}

/*const InfoWindow = (selectedStory) => {
  const [data, setData] = useState(selectedStory);
  console.log(data);
  if (!data) {
    return (
      <div>
        <h2>{data[0].title}</h2>
        <p>{data[0].placeId}</p>
        <p>{data[0].position}</p>

        <ul>
          {data.map((story) => (
            <li key={story.title}>{story.title}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};*/



const Bloeiend = ({ map, stories }) => {
  console.log(stories);
  const [data, setData] = useState();
  useEffect(() => {
    console.log(map);
    const groupByPlaceId = Object.values(
      stories.reduce((group, story) => {
        const {placeid} = story;
        console.log(placeid);
        group[placeid] = group[placeid] ?? [];
        group[placeid].push(story);
        return group;
      }, {})
    );
    setData(groupByPlaceId);
    console.log(groupByPlaceId);

    const setMarkers = async (data) => {
      const { Marker } = await google.maps.importLibrary("marker");
      const { InfoWindow } = await google.maps.importLibrary("maps");
      const infoWindow = new InfoWindow();
      const markers = data.map((data) => {
        let basis;
        let size;
        if (data.length < 25) {
          basis = 9;
          size = 0.75;
        } else if (data.length < 50) {
          basis = 15;
          size = 0.5;
        } else if (data.length < 100) {
           basis = 29;
           size = 0.25;
        } else if (data.length < 200) {
          basis = 51;
          size = 0.125;
        } else {
          basis = 62;
          size = 0.0625;
        }
        const image = {
          url: icon,
          scaledSize: new window.google.maps.Size(
            basis + data.length * size,
            basis + data.length * size
          ),
          className: "markerBloem",
        };
        console.log(data);
        let position = new google.maps.LatLng(
          data[0].latitude,
          data[0].longitude
        );
        const marker = new Marker({
          map,
          position: position,
          icon: image,
          content: {
            html: `<div class="markerBloem">`,
          },
          size: data.length,
          title: data[0].title,
          placeId: data[0].placeid,
        });
        marker.setClass = "markerKaart";
        marker.addListener("click", () => {
           infoWindow.close();
           infoWindow.setContent(`<div class="infoWindow"><h2>${marker.title}</h2> <ul>`+data.map((story) => ( `<li key=${story.title}>${story.verhaal}</li>`))+` 
           </ul></div>`);
           infoWindow.open(marker.map, marker);
          console.log("click");
          console.log(marker.placeId);
        });
        return marker;
      });
      console.log(markers);
      return markers;
    };

    console.log(data);
    setMarkers(groupByPlaceId);
  }, [stories]);
};

/*
function Bloeiend({ map, setSelectedStory }) {

  const groupByPlaceId = Object.values(
    stories.reduce((group, story) => {
      const { placeId } = story;
      group[placeId] = group[placeId] ?? [];
      group[placeId].push(story);
      return group;
    }, {})
  );
  
  console.log(groupByPlaceId);
  const [data, setData] = useState(groupByPlaceId);
  const [hover, setHover] = useState();
  const beachFlagImg = document.createElement("img");
  beachFlagImg.src =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  return (
    <>
      {Object.entries(data).map(([key, data]) => (
        <Marker
          key={key}
          map={map}
          position={data[0].position}
          size={data.length}

        >
          <div
            className={`marker ${hover ? "hover" : ""}`}
            // onMouseEnter={() => {
            //   setHover(key);
            //   console.log("click");
            //   setSelectedStory(data);
            //   console.log(data);
            // }}
          >
            <h2>TESTEEEEE</h2>
            <img
              src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              alt="bachflag"
              style={{ width: data.length * 10, height: data.length * 10 }}
              onClick={() => {
                console.log("click");
              }}
            />
          </div>
        </Marker>
      ))}
    </>
  );
}

const Marker = ({ map, position, children, size }) => {
  const markerRef = useRef();
  const rootRef = useRef();


  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");

      container.className = "marker2";
      container.style.color = "red";
      rootRef.current = createRoot(container);
      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      });
    }
  }, []);

  useEffect(() => {
    rootRef.current.render(children);
    markerRef.current.size = size;
    markerRef.current.position = position;
    markerRef.current.map = map;
  }, [map, position, children, size]);
};*/

export default App;
