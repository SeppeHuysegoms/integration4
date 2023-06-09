import { useEffect } from "react";

const Suggesties = ({ input }) => {
  useEffect(() => {
    console.log("test");
    console.log(input);
    const placesDemo = async () => {
      const { AutocompleteService } = await google.maps.importLibrary("places");
      const service = new AutocompleteService();
      const predictions = await service.getPlacePredictions({
        input: {input},
        types: ["(cities)"],
      });
      console.log(predictions);
    };

    placesDemo();
  }, []);

  console.log("test 2");
  return (
    <div>
      <p>test</p>
      <p>{input}</p>
    </div>
  );
};

export default Suggesties;
