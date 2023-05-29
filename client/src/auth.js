import { graphQLRequest } from "./utils/graphql.js";
console.log("auth.js");

export async function authenticate(email, password) {
  console.log("authenticating", email, password);
  const result = await graphQLRequest(
    `mutation authenticate {
    authenticate(email: "${email}", password: "${password}") {
      jwt
      user {
        id
      }
    }
  }`
  );
  console.log("authenticate result", result);
  return result.data.authenticate;
}
