import { useState, useMemo, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Link, useLoaderData } from "react-router-dom";
import "../style/bloeiendePlekken.css";
import icon from "../assets/flower.png";
import arrow from "../assets/images/arrow.svg";
import bloeiendePlekkenMobile from "../assets/images/bloeiendePlekkenMobile.png";
import Lottie from "lottie-react";
import klok from "../assets/klok.json";
import locatie from "../assets/locatie.json";
import plant from "../assets/plant.json";
import zoek from "../assets/images/zoek.svg";
import marker from "../assets/marker.svg";
import infoWindowZaadjes from "../assets/infoWindowZaadjes.svg";
import jouwVerhaal from "../assets/images/jouwVerhaal.png";
import instagramEmpty from "../assets/instagramEmpty.svg";
import jouwVerhaalDesktop from "../assets/images/jouwVerhaalDesktop.png";
import bloeiendePlekkenDesktop from "../assets/images/bloeiendePlekkenDesktop.png";

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
          <picture className="header__image--kaart">
            <source
              media="(min-width: 800px)"
              srcSet={bloeiendePlekkenDesktop}
            />
            <source
              media="(min-width: 300px)"
              srcSet={bloeiendePlekkenMobile}
            />

            <img
              src={bloeiendePlekkenMobile}
              alt="skatepark kortrijk"
              className="header__image header__image--kaart"
            />
          </picture>
        </div>

        <div className="header__content--kaart">
          <p>
            Elk verhaal laat Kortrijk meer en meer bloeien. Kijk voor wie jouw
            plaats ook b(l)oeit of ontdek misschien een nieuwe plek.
          </p>
          <a href="#map" className="button">
            <img src={arrow} alt="arrow" className="arrowButton" />
            Bekijk kaart
          </a>
        </div>
      </header>

      <section className="kaartBeeld2">
        <ul className="kaartBeeld2__list">
          <li className="list__item--kaart">
            <Lottie animationData={klok} className="item__animatie--klok" />
            <h2>{difference}</h2>
            <p>
              Dagen om deel <br /> te nemen
            </p>
          </li>
          <li className="list__item--kaart">
            <Lottie animationData={plant} className="item__animatie--plant" />
            <h2>{stories.length}</h2>
            <p>
              Zaadjes <br /> geplant
            </p>
          </li>
          <li className="list__item--kaart">
            <Lottie
              animationData={locatie}
              className="item__animatie--locatie"
            />
            <h2>{locations.length}</h2>
            <p>
              Verschillende <br /> b(l)oeiende plekken
            </p>
          </li>
        </ul>
      </section>

      <section className="section section--kaart">
        <MyMap stories={stories} id="map" />
      </section>

      <section className="section section--jouwVerhaal">
        <div className="jouwVerhaal__titel">
          <h2>
            Wat is <br /> jouw verhaal
            <span className="uitroepteken">?</span>{" "}
          </h2>
          <picture className="jouwVerhaal__image">
            <source media="(min-width: 800px)" srcSet={jouwVerhaalDesktop} />
            <source media="(min-width: 300px)" srcSet={jouwVerhaal} />

            <img
              className="jouwVerhaal__image"
              src={jouwVerhaal}
              alt="jouw verhaal"
            />
          </picture>
        </div>
        <div className="jouwVerhaal__content">
          <p>
            Heb jij zelf ook een plek die je zou laten willen bloeien in
            Kortrijk? <br />
            Zoek onze posters in de stad of houd onze Instagram pagina in de
            gaten. Je kan namelijk kans maken op een leuke extra!
          </p>
          <a
            className="jouwVerhaal__instagram"
            href="https://instagram.com/bloeiendkortrijk?igshid=MzNlNGNkZWQ4Mg=="
          >
            <img src={instagramEmpty} alt="instagram logo" /> @BloeiendKortrijk
          </a>
          <p>
            Te veel moeite voor je? Don’t worry! Je kan ook vanaf hier simpelweg
            je verhaal planten.
          </p>
          <Link to="/plant" className="button">
            <img src={arrow} alt="arrow" className="arrowButton" />
            Plant jouw verhaal
          </Link>
        </div>
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
    const [input, setInput] = useState("");
    const [voorstellen, setVoorstellen] = useState([]);
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);
  console.log(ref);
  return (
    <div className="kaart">
      <ZoekVeld
        input={input}
        setInput={setInput}
        voorstellen={voorstellen}
        setVoorstellen={setVoorstellen}
        map={map}
      />
      <div ref={ref} className="test" id="map" />
      {map && <Bloeiend map={map} stories={stories} />}
    </div>
  );
}

const ZoekVeld = ({
  input,
  setInput,
  voorstellen,
  setVoorstellen,
  map,
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
                centerSearch(voorstel.place_id, map, setInput, voorstel)
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

const centerSearch = async (
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
  map.setZoom(16);

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
      infoWindow.className = "infoWindow2";
      const markers = data.map((data) => {
        let basis;
        let size;
        if (data.length < 25) {
          basis = 10;
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
          map.setZoom(19);
           infoWindow.close();
           if(window.innerWidth < 800){
           infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, 450), anchor: marker });
            } else {
              infoWindow.setOptions({ pixelOffset: new google.maps.Size(-500, 300), anchor: marker });
            }
           console.log(data);
           infoWindow.setContent(
             `<div class="infoWindow"><h2>${marker.title}</h2> <div class="info__zaadjes"> <img class="infoWindowZaadjes" src="${infoWindowZaadjes}" alt="icon zaadjes"
            className="header__image header__image--kaart" /> <p>${data.length} geplante zaadjes </p> </div> <h3> Uitgelichte verhalen voor deze plek </h3>  <ul>` +
               data.map(
                 (story) => `<li key=${story.id}>
                  <p>${story.verhaal}</p>
                  <p>${splitDate(story.dateCreated)} </p> </li>`
               ) +
               ` 
           </ul></div>`
           );
           infoWindow.open(marker.map, marker);
           map.setCenter({
             lat: position.lat(),
             lng: position.lng(),
           });
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
function splitDate(date) {
  const split = date.split("T");
  const splitDate = split[0];
  const splitDate2 = splitDate.split("-");
  const splitDate3 = splitDate2[2] + "/" + splitDate2[1] + "/" + splitDate2[0];
  return splitDate3;
}


export default App;
