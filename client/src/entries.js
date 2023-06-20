import localforage from "localforage";
import { graphQLRequest } from "./utils/graphql.js";

export async function register(
  name,
  email,
  password,
  verhaal,
  locatieNaam,
  placeId,
  lat,
  lng,
  adres
) {
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

  console.log("register result", result.data.register);
  console.log("register result", result.data.register.jwt);

  plantVerhaal(
    lat,
    lng,
    placeId,
    locatieNaam,
    verhaal,
    adres,
    result.data.register.user.id,
    result.data.register.jwt
  );
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

export async function getPersonalStories(jwt, authorId) {
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
}`,
    {},
    jwt
  );

  console.log("getPersonalStories result", result.data.entries);
  return result.data.entries;
}

export async function getProfileData(jwt, authorId) {
  const result = await graphQLRequest(
    `query MyQuery {
  user(id: "${authorId}") {
    ... on User {
      id
      email
      username
    }
  }
}`,
    { authorId },
    jwt
  );
  console.log("getProfileData result", result.data.user);
  return result.data.user;
}



export async function editStory(verhaal, jwt, idVerhaal) {
  const { result } = await graphQLRequest(
    `mutation editVerhaal($verhaal: String, $idVerhaal: ID) {
  save_entries_default_Entry(
    id: $idVerhaal
    verhaal: $verhaal
  ) {
    id
    verhaal
  }
}`,
    { verhaal, idVerhaal },
    jwt
  );

  //console.log("editStory result", result.data.entries);
  //return result.data.entries[0];
}
