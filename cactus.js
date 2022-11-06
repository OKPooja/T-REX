import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const Speed= 0.05
const Cactus_int_min=500
const Cactus_int_max=2700;
const worldElement=document.querySelector("[data-world]")

let nextCactusTime

export function setupCactus()
{
    nextCactusTime=Cactus_int_min
    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        cactus.remove()
    })
}
export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      incrementCustomProperty(cactus, "--left", delta * speedScale * Speed * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    })
    if(nextCactusTime<=0){
        createCactus()
        nextCactusTime=randomNumberBetween(Cactus_int_min,Cactus_int_max)/speedScale
    }
    nextCactusTime-=delta
}
export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus=>
        {
            return cactus.getBoundingClientRect()
        })

}
function createCactus(){
    const cactus=document.createElement("img")
    cactus.dataset.cactus=true
    cactus.src="imgs/cac.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    worldElement.append(cactus)
}
function randomNumberBetween(min,max)
{
   return Math.floor(Math.random()*(max-min+1)+min)
}