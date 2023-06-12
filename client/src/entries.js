import localforage from "localforage";
import { graphQLRequest } from "./utils/graphql.js";

export async function register(name, email, password) {
  console.log("registering", email, password, name);
  const result = await graphQLRequest(
    `mutation MyMutation {
  register(
    email: "${email}", password: "${password}" username: "${name}") {
     jwt
      user {
        id
      }
  }
}`
  );

  console.log("authenticate result", result);
  return result.data.register;
}

export async function plantVerhaal(
  latitude,
  longitude,
  placeid,
  title,
  verhaal,
  adres,
  authorId,
  jwt
) {
  console.log(
    "plantVerhaal",
    latitude,
    longitude,
    placeid,
    title,
    verhaal,
    adres,
    authorId,
    jwt
  );
  console.log("plantVerhaal", jwt);
  const { result } = await graphQLRequest(
    `mutation plantVerhaal($latitude: Number, $longitude: Number, $placeid: String, $title: String, $verhaal: String, $authorId: ID, $adres: String) {
  save_entries_default_Entry(
    latitude: $latitude
    longitude: $longitude
    placeid: $placeid
    title: $title
    verhaal: $verhaal
    authorId: $authorId
    adres: $adres
  ) {
    id
  }
}`,
    { latitude, longitude, placeid, title, verhaal, authorId, adres },
    jwt
  );

  if (result.errors) {
    throw new Error(result.errors[0].debugMessage);
    return null;
  } else {
    return result.data.entries[0];
  }
  console.log("plantVerhaal result");
  console.log("plantVerhaal result", result);
}

export async function getStories() {
  const result = await graphQLRequest(
    `query MyQuery {
  entries {
    ... on entries_default_Entry {
      id
      adres
      dateCreated
      longitude
      latitude
      verhaal
      title
      placeid
    }
  }
}`
  );
  //console.log("getStories result", result.data.entries);

  return result.data.entries;
}
