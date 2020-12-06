"use strict";
const backdrop = document.querySelector(".backdrop");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarBurger = document.querySelector('.navbar-burger');
navbarBurger.addEventListener("click", () => {
    backdrop.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
    navbarBurger.classList.toggle('is-active');
});
backdrop.addEventListener("click", () => {
    backdrop.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
    navbarBurger.classList.toggle('is-active');
});