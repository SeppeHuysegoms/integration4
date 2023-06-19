import "../style/stadsgids.css";
import stadsgids from "../assets/images/stadsgids.png";
import stadsgidsDesktop from "../assets/images/stadsgids-desktop.png";

export default function Index() {
  return (
    <header className="stadsgids">
      <h1 className="stadsgids__title">
        {" "}
        404 page coming soon
        <span className="uitroepteken uitroepteken--stadsgids">!</span>
      </h1>
      <img className="stadsgids__image" src={stadsgids} alt="compositie" />
      <img
        className="stadsgids__image--desktop"
        src={stadsgidsDesktop}
        alt="compositie"
      />
    </header>
  );
}
