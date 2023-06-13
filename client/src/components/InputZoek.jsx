import { useEffect } from "react";
import icon from "../assets/flower.png";

const ZoekVeld = ({ input, setInput, voorstellen, setVoorstellen, map, selectedLocation }) => {
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
      console.log("test");
      console.log(input);
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
        console.log(prediction);
        let arrayPrediction = [];
        prediction.predictions.map((prediction) => {
          arrayPrediction.push(prediction);
        });
        console.log(arrayPrediction);
        setVoorstellen(arrayPrediction);
        console.log(voorstellen);
      };

      placesDemo();
    }, [input]);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Zoek een locatie"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {voorstellen && input && (
        <ul>
          {voorstellen.map((voorstel) => (
            <li
              key={voorstel.place_id}
              onClick={() =>
                addMarker(voorstel.place_id, map, selectedLocation)
              }
            >
              {voorstel.description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ZoekVeld;

const addMarker = async (placeID, map, selectedLocation) => {
  console.log(`${placeID}`);

  let position = await getName(placeID, map)

 /* const iconBloem = document.createElement("img");
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
  selectedLocation = mark;*/
};

  const placesDemo = async () => {
    const { PlacesService } = await google.maps.importLibrary("places");
    const service = new PlacesService();
    console.log(service.getDetails());

    const details = await service.getDetails({
      placeId: "ChIJXeWW5CY7w0cRdvPij3Vrp58",
      fields: ["formatted_addres", "geometry "],
    });

    console.log(details);
  };

  const getName = async (placeID, map) => {
    console.log(placeID);
    return new Promise(async (resolve) => {
      const { PlacesService} = await google.maps.importLibrary(
        "places"
      );
      const service = new PlacesService(map);
      service.getDetails(
        {
          placeId: `${placeID}`,
        },
        (results) => {
          console.log(results);
          resolve(results);
        }
      );
    });
  };

