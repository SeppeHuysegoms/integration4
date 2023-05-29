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
