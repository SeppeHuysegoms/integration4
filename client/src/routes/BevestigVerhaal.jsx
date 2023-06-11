import {redirect, Link } from "react-router-dom";

const Bevestig = () => {
  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");
  return (
    <div>
      <h1>Bevestigen</h1>
      <h2>Gekozen plek</h2>
      <p>{locatieNaam}</p>
      <h2>Persoonlijk verhaal</h2>

      <p>{verhaal}</p>
      <h2>Gelukt!</h2>
      <p>Je kunt nu je verhaal planten!</p>
      <Link to="/bevestig">Bevestigen</Link>
    </div>
  );
};

export default Bevestig;
