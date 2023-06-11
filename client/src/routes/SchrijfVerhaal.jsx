import { Link } from "react-router-dom";
import { useState } from "react";

export default function Index() {
  const [story, setStory] = useState();
  let verhaal
  if (localStorage.getItem("story")) {
    verhaal = localStorage.getItem("story");
  }

  return (
    <>
      <h1> Schrijf je verhaal </h1>;
      <p>
        Ideaal! Nu jouw plaats gekozen is, kan je een persoonlijke boodschap mee
        sturen.
      </p>
      <p>Waarom deze plek? Wat maakt deze plek voor jou zo bijzonder?</p>
      <textarea
        name="name"
        placeholder="Typ hier je verhaal"
        onChange={(e) => handleChange(e, verhaal)}
        value={verhaal}
        rows="3"
      />
      <Link
        onClick={() => {
          localStorage.setItem("story", story);
        }}
        to="/register"
      >
        Volgende
      </Link>
    </>
  );
}

const handleChange = (event, verhaal) => {
  localStorage.setItem("story", event.target.value);
  verhaal = event.target.value;
};
