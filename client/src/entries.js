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

export async function editProfile(newData, jwt) {
  const result = await graphQLRequest(
    `mutation MyMutation {
  updateViewer(input: {username: "${newData.username}", email: "${newData.email}"}) {
    id
  }
}`,
    { newData },
    jwt
  );
  console.log("editGegevens result", result.data.user);
  return result.data.user;
}
