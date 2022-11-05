'use strict';
import { setupGround, updateGround } from './ground.js';

const worldWidth = 100;
const worldHeight = 30;
const SPEED_SCALE_INC=0.0001

const worldElement = document.querySelector("[data-world]");

const setPixelToWorldScale = function () {
  let worldToPixelScale;

  if (window.innerWidth / window.innerHeight < worldWidth / worldHeight)
    worldToPixelScale = window.innerWidth / worldWidth;
  else worldToPixelScale = window.innerHeight / worldHeight;

  worldElement.style.width = `${worldToPixelScale * worldWidth}`;
  worldElement.style.height = `${worldToPixelScale * worldHeight}`;
};


window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener("keydown", handleStart,{once: true})

let lastTime;
let speedScale
setupGround();
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta,speedScale);
  updateSpeedScale(delta)
  lastTime = time;
  window.requestAnimationFrame(update);
}
function updateSpeedScale(delta)
{
  speedScale+=delta*SPEED_SCALE_INC
}
function handleStart()
{
  lastTime=null
  speedScale=1
  setupGround()
  window.requestAnimationFrame(update);
  
}
window.requestAnimationFrame(update);
