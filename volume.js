'use strict';
export let a;
const volumeElem = document.querySelector("[data-volume]");
const volumeControlElem = document.querySelector("[data-volume-controls");
const settings = document.querySelector("[data-volume-sfx");
const disappearingButtons = document.querySelectorAll("[data-hide]");
const goBackElem = document.querySelector("[data-go-back]");
let audio = document.querySelector("[data-audio]");
console.log(disappearingButtons);

settings.addEventListener("click", function(){
    for(const button of disappearingButtons){
    button.classList.add("hide");
}
    volumeElem.classList.remove("hide");
    volumeControlElem.classList.remove("hide");
    goBackElem.classList.remove("hide");
})
volumeControlElem.addEventListener("change", function(e){
    a = e.currentTarget.value / 100;
    audio.volume = e.currentTarget.value / 100;;
});
goBackElem.addEventListener("click", function(){
    for(const button of disappearingButtons){
        button.classList.remove("hide");
    }
        volumeElem.classList.add("hide");
        volumeControlElem.classList.add("hide");
        goBackElem.classList.add("hide");
})