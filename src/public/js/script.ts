const backdrop = <HTMLDivElement>document.querySelector(".backdrop")!
const navbarMenu = <HTMLDivElement>document.querySelector(".navbar-menu")!
const navbarBurger = <HTMLAnchorElement>document.querySelector('.navbar-burger')!

navbarBurger.addEventListener("click", () => {
    backdrop.classList.toggle("is-active")
    navbarMenu.classList.toggle("is-active")
    navbarBurger.classList.toggle('is-active')
})

backdrop.addEventListener("click", ()=> {
    backdrop.classList.toggle("is-active")
    navbarMenu.classList.toggle("is-active")
    navbarBurger.classList.toggle('is-active')
})