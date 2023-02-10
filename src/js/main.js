import gsap from "gsap"; 

/* eslint-disable no-undef */
/* varabiler */
let menuIsOpen = false;
let menuOverlay = false;
let width = document.documentElement.clientWidth;
//let nav;

const menuOptions = document.querySelectorAll(".menu-overlay a");

window.onscroll = function() { console.log("hej"); };
 
function init() {
    menuOverlay = document.querySelector(".menu-overlay");
    //nav = document.querySelector("nav").addEventListener("scroll", changeNavColor);

    gsap.to(menuOverlay, {x: width, opacity: 0});
    
    /* Create eventlisteners */
    window.addEventListener("resize", updateScreenSize);

    /* Calling functions */
    createEventListeners();
    //changeNavColor();

    window.onscroll = function() { console.log("hej"); };
}

function createEventListeners() {
    document.querySelector(".menuToggleBtn").addEventListener("click", toggleMenu);
    document.querySelector(".menuToggleBtn").addEventListener("keypress", toggleMenu);

    for (let i = 0; i < menuOptions.length; i++) // Closes menu after a link press
        menuOptions[i].addEventListener("click", () => {
            closeMenu();
        });
}

function updateScreenSize() {
    width = document.documentElement.clientWidth;
    console.log(width);
}

function toggleMenu() {
    if (!menuIsOpen) { // Mobile menu button handler
        menuOverlay.classList.remove("hide-menu-overlay");
        updateScreenSize();
        openMenu();
        gsap.to(menuOverlay, {x: 0, duration: 1, opacity: 1});
        createEventListeners();
    } else {
        menuOverlay.classList.remove("hide-menu-overlay");
        updateScreenSize();
        closeMenu();
        gsap.to(menuOverlay, {x: width, duration: 1, opacity: 0});
        createEventListeners();
    }
}


function closeMenu() {
    gsap.to(".second-row>span:nth-child(1)", {x:0, y:0, duration: 0.15});
    gsap.to(".third-row>span:nth-child(2)", {x:0, y:0, duration: 0.15, delay: 0.1});
    gsap.to(".second-row>span:nth-child(3)", {x:0, y:0, duration: 0.15, delay: 0.2});
    gsap.to(".first-row>span:nth-child(2)", {x:0, y:0, duration: 0.15, delay: 0.3});
    menuIsOpen = false;
}
function openMenu() {
    gsap.to(".first-row>span:nth-child(2)", {x:8.6, y:8.6, duration: 0.15});
    gsap.to(".second-row>span:nth-child(3)", {x:-8.6, y:8.6, duration: 0.15, delay: 0.1});
    gsap.to(".third-row>span:nth-child(2)", {x:-8.6, y:-8.6, duration: 0.15, delay: 0.2});
    gsap.to(".second-row>span:nth-child(1)", {x:8.6, y:-8.6, duration: 0.15, delay: 0.3});
    menuIsOpen = true;
}

init();
createEventListeners();
