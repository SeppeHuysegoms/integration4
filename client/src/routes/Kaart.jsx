import { useState, useMemo, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Link, useLoaderData } from "react-router-dom";
import "../style/bloeiendePlekken.css";
import icon from "../assets/flower.png";
import arrow from "../assets/images/arrow.svg";
import bloeiendePlekkenMobile from "../assets/images/bloeiendePlekkenMobile.png";
import Lottie from "lottie-web";
import klok from "../assets/klok.json";

import { createRoot } from "react-dom/client";
import { getStories } from "../entries";

export async function loader({request}) {
  const stories = await getStories();
  return {stories};
}
//date
let today = new Date();
let date_to_reply = new Date("2025-01-01");
let timeinmilisec = date_to_reply.getTime() - today.getTime();
let difference = (Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24)));



const App = () => {
  const { stories } = useLoaderData();
  console.log(stories);
  //plaatsen
  const locations = Object.values(
    stories.reduce((group, story) => {
      const { placeid } = story;
      console.log(placeid);
      group[placeid] = group[placeid] ?? [];
      group[placeid].push(story);
      return group;
    }, {})
  );

  //lottie 

  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: document.querySelector(".animatie"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: klok,
    });

  
  }, []);

  const [selectedStory, setSelectedStory] = useState();
  return (
    <>
      <header className="header header--kaart">
        <div className="black">
          <div className="header__titlebox--kaart">
            <h1 className="header__title header__title--kaart">
              <span className="title--rotate">
                B<span>L</span>OEIENDE{" "}
              </span>{" "}
              <br />
              PLEKKEN
            </h1>
            <p className="uitroepteken--kaart">!</p>
          </div>

          <img
            src={bloeiendePlekkenMobile}
            alt="skatepark kortrijk"
            className="header__image header__image--kaart"
          />
        </div>

        <div className="header__content--kaart">
          <p>
            Elk verhaal laat Kortrijk meer en meer bloeien. Kijk voor wie jouw
            plaats ook b(l)oeit of ontdek misschien een nieuwe plek.
          </p>
          <a href="#map" className="button">
            Bekijk kaart
          </a>
        </div>
      </header>

      <section className="kaartBeeld2">
        <ul className="kaartBeeld2__list">
          <li className="list__item--kaart">
            <div className="animatie"></div>
            <h2>{difference}</h2>
            <p>Dagen om deel te nemen</p>
          </li>
          <li className="list__item--kaart">
            <h2>{stories.length}</h2>
            <p>Zaadjes geplant</p>
          </li>
          <li className="list__item--kaart">
            <h2>{locations.length}</h2>
            <p>Verschillende b(l)oeiende plekken</p>
          </li>
        </ul>
      </section>

      <section className="section section--kaart">
        <h2>Ontdek de kaart</h2>
        <MyMap stories={stories} id="map" />
      </section>

      <section className="section section--jouwVerhaal">
        <h2>Wat is jouw verhaal?</h2>
        <p>
          Heb jij zelf ook een plek die je zou laten willen bloeien in Kortrijk?
          Zoek onze posters in de stad of houd onze Instagram pagina in de
          gaten. Je kan namelijk kans maken op een leuke extra!
        </p>
        <a>@Bloeiend!</a>
        <p>
          Te veel moeite voor je? Don’t worry! Je kan ook vanaf hier simpelweg
          je verhaal planten.
        </p>
        <Link to="/plant" className="button">
          <img src={arrow} alt="arrow" className="arrowButton" />
          Plant jouw verhaal
        </Link>
      </section>
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
