import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <h1> Hey </h1>
      <p>Plant hier jouw bloem voor de toekomst</p>

      <p>
        Wil jij deel uitmaken van de toekomst van Kortrijk door een virtuele
        bloemen te planten op de plekken die jou het meest b(l)oeien?
      </p>

      <p>
        Volg de eenvoudige stappen en plant vandaag nog jouw bloem voor de
        toekomst.
      </p>

      <Link to="/selecteerlocatie"> Plant een bloem</Link>
    </>
  );
}
