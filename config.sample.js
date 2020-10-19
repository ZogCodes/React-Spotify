const config = {
  baseURL: "https://accounts.spotify.com/en/authorize",
  clientID: "",
  responseType: "token",
  redirectURI: "http://localhost:8080/",
  scopes: "user-top-read playlist-modify-public streaming",
  clientSecret: ""
};

export default config;
