import { useState, useMemo, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Link } from "react-router-dom";
import icon from "../assets/flower.png";
import "../App.css";
import { createRoot } from "react-dom/client";

const App = () => {
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
      <MyMap setSelectedStory={setSelectedStory} id="map" />
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
  center: { lat: 50.8659, lng: 4.6309 },
  zoom: 13,
  disableDefaultUI: true,
  clickableIcons: false,
  mapId: "9e75666bc6c2ee87",
};

function MyMap(setSelectedStory) {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);
  console.log(ref);
  return (
    <>
      <div ref={ref} className="test" id="map" />
      {map && <Bloeiend map={map} />}
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

const Bloeiend = ({ map }) => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log(map);
    const groupByPlaceId = Object.values(
      stories.reduce((group, story) => {
        const { placeId } = story;
        group[placeId] = group[placeId] ?? [];
        group[placeId].push(story);
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
        const marker = new Marker({
          map,
          position: data[0].position,
          icon: image,
          content: {
            html: `<div class="markerBloem">`,
          },
          size: data.length,
          title: data[0].title,
          placeId: data[0].placeId,
        });
        marker.setClass = "markerKaart";
        marker.addListener("click", () => {
           infoWindow.close();
           infoWindow.setContent(`<div class="infoWindow"><h2>${marker.title}</h2> <ul>`+data.map((story) => ( `<li key=${story.title}>${story.title}</li>`))+` 
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
