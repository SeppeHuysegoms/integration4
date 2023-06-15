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
        setVoorstellen(arrayPrediction);
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
  let position = await getName(placeID, map)
  let location = new google.maps.LatLng(
    position.geometry.location.lat(),
    position.geometry.location.lng()
  );

 const iconBloem = document.createElement("img");
  iconBloem.src = icon;
  iconBloem.className = "markerBloem";
  let mark = new google.maps.marker.AdvancedMarkerElement({
    position: location,
    map: map,
    content: iconBloem,
  });
  console.log(selectedLocation);
  if (selectedLocation != null) {
    selectedLocation.setMap(null);
  }
  selectedLocation = mark;
};


  const getName = async (placeID, map) => {
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
          resolve(results);
        }
      );
    });
  };

