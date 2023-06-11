export default function Index() {
  return (
    <>
      <h1> Profiel </h1>
      <ul>
        <li>
          <Link to="/profiel/verhalen">Mijn verhalen</Link>
        </li>
        <li>
          <Link to="/profiel/gegevens">Persoonlijke gegevens</Link>
        </li>
      </ul>

      <h2>Seppe's verhalen</h2>
      <ul>
        <li>
          <h3></h3>
          <p></p>
          <p></p>
          <button>Bewerken</button>
        </li>
      </ul>

      <h3>Maak de connectie</h3>
      <p>
        Benieuwd hoe andere een connectie hebben met jouw gekozen plek? Bekijk
        hun verhalen via de kaart.
      </p>
      <Link to="/kaart">Bekijk de kaart</Link>

      <h2>Persoonlijke gegevens</h2>
      <Form method="post" id="contact-form">
        <label className="flexColumn">
          <span>Naam</span>
          <input
            type="text"
            name="naam"
            placeholder="Naam"
            defaultValue="seppe.huysegoms1@student.howest.be"
          />
        </label>
        <label className="flexColumn">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue="seppe.huysegoms1@student.howest.be"
          />
        </label>

        <label className="flexColumn">
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue="123456"
          />
        </label>

        <button type="submit">Login</button>
      </Form>
    </>
  );
}
