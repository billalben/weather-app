"use strict";

import { updateWeather, error404 } from "./app.js";
export const defaultLocation = "#/weather?lat=34.883850&lon=-1.314020"; // Tlemcen, Algeria

const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;

      // updateWeather(`lat=${latitude}`, `lon=${longitude}`);
      updateWeather(latitude, longitude);
    },
    (err) => {
      window.location.hash = defaultLocation;
    }
  );
};

/**
 * @param {string} query - Searched query
 */

// const searchedLocation = (query) => updateWeather(...query.split("&"));
const searchedLocation = function (query) {
  const params = query?.split("&");
  const lat = params?.find((param) => param.startsWith("lat=")).split("=")[1];
  const lon = params?.find((param) => param.startsWith("lon=")).split("=")[1];
  updateWeather(lat, lon);
};
// example: updateWeather("lat=34.883850", "lon=-1.314020")

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);
  const [route, query] = requestURL.includes
    ? requestURL.split("?")
    : [requestURL];

  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
