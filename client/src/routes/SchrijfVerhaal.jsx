import { Link, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bloemPaars from "../assets/images/bloemPaars.svg";
import arrow from "../assets/images/arrow.svg";
import "../style/insturen.css";
import verhaalSchrijven from "../assets/verhaalSchrijven.gif";
import NavForm from "../components/NavForm";

export default function Index() {
  const [characters, setCharacters] = useState(0);
  console.log(localStorage.getItem("story"));
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("locatieNaam") == null ||
      localStorage.getItem("locatieNaam") == undefined
    ) {
      console.log("redirect");

      navigate("/selecteerlocatie");
    }
  }, );

  const [story, setStory] = useState();
  useEffect(() => {
    if (localStorage.getItem("story")) {
      setStory(localStorage.getItem("story"));
    }
  }, []);

  const handleStory = (story) =>{
    if (story === undefined || story === null || story === "") {
      setStory(null);
      localStorage.removeItem("story");
      return;
    }
    setStory(story);
    localStorage.setItem("story", story);
  }

  return (
    <>
      <NavForm step={2} />
      <header className="header--insturen">
        <h1 className="insturen__titel"> Schrijf je verhaal </h1>;
        <img src={bloemPaars} className="bloemTitel" alt="bloem" />
      </header>

      <section className="section--insturen section--verhaal">
        <p>
          Ideaal! Nu jouw plaats gekozen is, kan je een persoonlijke boodschap
          mee sturen.
        </p>
        <p>Waarom deze plek? Wat maakt deze plek voor jou zo bijzonder?</p>

        <img
          src={verhaalSchrijven}
          className="verhaalSchrijvenAnimatie"
          alt="verhaal schrijven"
        />
      </section>

      <section className="section--insturen section--verhaalTypen">
        <label className="insturen__form">
          Jouw boodschap
          <textarea
            id="story"
            name="name"
            placeholder="Typ hier je verhaal"
            onChange={(e) => handleChange(e, handleStory, setCharacters)}
            value={story}
            rows="3"
            required
            maxLength={500}
            minLength={10}
          />
        </label>
        <p className="form__charachters">
          {" "}
          Characters left: {500 - characters}
        </p>
        <Bevestig story={story} />
  
     
      </section>
    </>
  );
}

function Bevestig({ story }) {
  console.log(story);
  if (story == undefined || story == null || story == "") {
    return (
      <div className="button button--white button--verhaal button--disabled">
        <img src={arrow} alt="arrow" className="arrowButton" />
        <p>Naar bevestigingsscherm</p>
      </div>
    );
  } else {
    return (
      <Link
        onClick={(verhaal) => {
          console.log(verhaal);
          localStorage.setItem("story", story);
          window.scroll(0, 0);
        }}
 
        to="/register"
        className="button button--verhaal button--white"
      >
        <img src={arrow} alt="arrow" className="arrowButton" />
        Naar bevestigingsscherm
      </Link>
    );
  }
}


const handleChange = (event, handleStory, setCharacters) => {
  setCharacters(event.target.value.length);
  handleStory(event.target.value);
};
