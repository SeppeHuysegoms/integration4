import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigation } from "react-router-dom";

const Root = () => {
  const navigation = useNavigation();
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
