import error from "../assets/images/error.png";
import errorDesktop from "../assets/images/error--desktop.png";

const Error = () => {
  return (
    <>
      <header className="header header--error">
        <picture className="header__image">
          <source media="(min-width: 1000px)" srcSet={errorDesktop} />
          <source
            media="(min-width: 250px)"
            srcSet={error}
            className="header__image--mobile"
          />
          <img src={error} className="header__image" />
        </picture>
      </header>
    </>
  );
};

export default Error;
