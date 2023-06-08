import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigation } from "react-router-dom";
import { useEffect } from "react";

// voorbeeld geocoding

const Root = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   const placesDemo = async () => {
  //     const { AutocompleteService } = await google.maps.importLibrary("places");
  //     const service = new AutocompleteService();
  //     const predictions = await service.getPlacePredictions({
  //       input: "Br",
  //       types: ["(cities)"],
  //     });
  //     console.log(predictions);
  //   };

  //   placesDemo();
  // }, []);
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div
          className={`wrapper ${
            navigation.state === "loading" ? "loading" : ""
          }`}
        >
          <Outlet />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Root;
