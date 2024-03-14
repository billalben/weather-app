"use strict";

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/**
 * Add event listener on multiple elements
 * @param {NodeList} elements - Array of elements
 * @param {string} eventType - Event type e.g. "click", "change" ...
 * @param {Function} callback - Callback function
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) {
    element.addEventListener(eventType, callback);
  }
};

// Toggle search for mobile devices
const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const togglerSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", togglerSearch);
