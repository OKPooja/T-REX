import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty"

const Speed= 0.05
const Cactus_int_min=500
const Cactus_int_max=2000
const worldElement=document.querySelector("[data-world]")

let nextCactusTime

export function setupCactus()
{
    nextCactusTime=Cactus_int_min
   
}
export function updateCactus(delta, speedScale)
{
    document.querySelector("[data-cactus]").forEach(cactus=>{
        incrementCustomProperty(cactus, "--left",delta*speedScale*Speed-1)
        if (getCustomProperty(cactus,"--left")<=-100){
            cactus.remove()
        }
    })
    if(nextCactusTime<=0){
        createCactus()
        nextCactusTime=randomNumberBetween(Cactus_int_min, Cactus_int_max)/speedScale
    }
    nextCactus-=delta
}
function createCactus(){
    const cactus=document.createElement("img")
    cactus.dataset.cactus=true
    cactus.src="imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    worldElement.append(cactus)
}
function randomNumberBetween(min,max)
{
   return Math.floor(Math.random()*(max-min+1)+min)
}