import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigation } from "react-router-dom";

const Root = () => {
  const navigation = useNavigation();
  return (
    <main>
      <Navbar />
      <div
        className={`wrapper ${navigation.state === "loading" ? "loading" : ""}`}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
