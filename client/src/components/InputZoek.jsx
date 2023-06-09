import { useEffect } from "react";

const ZoekVeld = ({ input, setInput, voorstellen, setVoorstellen }) => {
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
          types: ["(cities)"],
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
            <li key={voorstel.place_id}>{voorstel.description}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ZoekVeld;
