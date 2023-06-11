import { redirect, Link } from "react-router-dom";
const Bevestig = () => {
  const verhaal = localStorage.getItem("story");
  const locatieNaam = localStorage.getItem("locatieNaam");
  return (
    <div>
      <h1>Klaar</h1>
      <p>Benieuwd naar wat er nu gebeurt met jouw ingezonden verhaal?</p>
      <p>Ontdek er alles over op onze website</p>
      <Link to="/home">Wat gebeurt er nu</Link>
      <Link to="/profiel">Naar profiel</Link>
    </div>
  );
};

export default Bevestig;
