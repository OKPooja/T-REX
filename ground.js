//'use strict';

import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './updateCustomProperty.js';

const speed = 0.05;
const groundElement = document.querySelectorAll("[data-ground]");

export function setupGround() {
  setCustomProperty(groundElement[0], "--leftShift", 0);
  setCustomProperty(groundElement[1], "--leftShift", 300);
}

export function updateGround(delta,speedScale) {
  groundElement.forEach(ground => {
    incrementCustomProperty(ground, "--leftShift", delta * speedScale* speed * -1);

    if (getCustomProperty(ground, "--leftShift") <= -300) {
      incrementCustomProperty(ground, "--leftShift", 600);
    }
  });
}
