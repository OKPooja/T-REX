'use strict';
import { setupGround, updateGround } from './ground.js';

const worldWidth = 100;
const worldHeight = 30;

const worldElement = document.querySelector('[data-world]');

const setPixelToWorldScale = function () {
  let worldToPixelScale;

  if (window.innerWidth / window.innerHeight < worldWidth / worldHeight)
    worldToPixelScale = window.innerWidth / worldWidth;
  else worldToPixelScale = window.innerHeight / worldHeight;

  worldElement.style.width = `${worldToPixelScale * worldWidth}`;
  worldElement.style.height = `${worldToPixelScale * worldHeight}`;
};

window.addEventListener('resize', setPixelToWorldScale);
let lastTime;
setupGround();
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta);
  lastTime = time;
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
