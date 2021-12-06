import cookie from "js-cookie";

function getToken() {
  let token = cookie.get("token") ? "Bearer " + cookie.get("token") : null;
  return token;
}

function headerHelper() {
  let header = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) header["Authorization"] = getToken();
  return header;
}

export default headerHelper;
