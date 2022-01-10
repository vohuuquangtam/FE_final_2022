import cookie from "js-cookie";

function getToken() {
  let token = cookie.get("token") ? "Bearer " + cookie.get("token") : null;
  return token;
}

function headerHelper(type = "application/json") {
  let header = {
    "Content-Type": type,
  };
  const token = getToken();
  if (token) header["Authorization"] = getToken();
  return header;
}

export default headerHelper;
