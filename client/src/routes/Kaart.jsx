import { useState, useMemo, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import "../App.css";
import { createRoot } from "react-dom/client";

const App = () => {
  const [selectedStory, setSelectedStory] = useState();
  return (
    <>
      <InfoWindow selectedStory={selectedStory} />
      <MyMap setSelectedStory={setSelectedStory} />
    </>
  );
};

const mapOptions = {
  mapId: "AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ",
  center: { lat: 50.8659, lng: 4.6309 },
  zoom: 13,
  disableDefaultUI: true,
};

function MyMap(setSelectedStory) {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);
  return (
    <>
      <div ref={ref} className="test" id="map" />
      {map && <Bloeiend map={map} setSelectedStory={setSelectedStory} />}
    </>
  );
}

const InfoWindow = (selectedStory) => {
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
};

let stories = [
  {
    title: "Alsemberg 1",
    placeId:
      "EiNBbHNlbWJlcmdsYWFuLCAzMDYwIEJlcnRlbSwgQmVsZ2l1bSIuKiwKFAoSCS3wnuC3YcFHEQChIa7Geh9UEhQKEgmjqyBgxGHBRxHr_dMUrM7KAA",
    position: { lat: 50.86949484562017, lng: 4.638857763970963 },
  },
  {
    title: "Xocolata 1",
    placeId: "ChIJgY5y0IphwUcR5Y-xnoqmj3w",
    position: { lat: 50.870909709745774, lng: 4.6343982666801 },
  },
  {
    title: "Lekkerbek 1",
    placeId: "ChIJ301jjbhhwUcRoHYuwzQ00F4",
    position: { lat: 50.86773949480023, lng: 4.632807306611503 },
  },
  {
    title: "Bakker 1",
    placeId: "ChIJ9aEKUMZhwUcRG_sdZNSSVxU",
    position: { lat: 50.86648359780457, lng: 4.63365656440537 },
  },
  { title: "Bertem square", placeId: "ChIJVVVVVcFhwUcRuJj1_SZAM7Q" },
  {
    title: "Xocolata 2",
    placeId: "ChIJgY5y0IphwUcR5Y-xnoqmj3w",
    position: { lat: 50.870909709745774, lng: 4.6343982666801 },
  },
  {
    title: "Bib 1 ",
    placeId: "ChIJbTp2bU1DwUcRP6tYPKZmzJo",
    position: { lat: 50.866478141048226, lng: 4.630507323263188 },
  },
  {
    title: "Alsemberg 2",
    placeId:
      "EiNBbHNlbWJlcmdsYWFuLCAzMDYwIEJlcnRlbSwgQmVsZ2l1bSIuKiwKFAoSCS3wnuC3YcFHEQChIa7Geh9UEhQKEgmjqyBgxGHBRxHr_dMUrM7KAA",
    position: { lat: 50.86949484562017, lng: 4.638857763970963 },
  },
  {
    title: "Bakker 2",
    placeId: "ChIJ9aEKUMZhwUcRG_sdZNSSVxU",
    position: { lat: 50.86648359780457, lng: 4.63365656440537 },
  },
  {
    title: "Lekkerbek 2",
    placeId: "ChIJ301jjbhhwUcRoHYuwzQ00F4",
    position: { lat: 50.86773949480023, lng: 4.632807306611503 },
  },
  {
    title: "Alsemberg 3",
    placeId:
      "EiNBbHNlbWJlcmdsYWFuLCAzMDYwIEJlcnRlbSwgQmVsZ2l1bSIuKiwKFAoSCS3wnuC3YcFHEQChIa7Geh9UEhQKEgmjqyBgxGHBRxHr_dMUrM7KAA",
    position: { lat: 50.86949484562017, lng: 4.638857763970963 },
  },
];

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
          // on={() => {
          //   console.log("click");
          // }}
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

  rootRef.className = "marker2";

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
};

export default App;
