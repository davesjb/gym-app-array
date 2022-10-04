const burger = document.querySelector("[data-burger]")
const body = document.querySelector("body")

burger.addEventListener("click", () => {
  burgerToggle()
})

export function burgerToggle() {
  body.classList.toggle("mobile-open")
  body.classList.remove("scroll-up", "scroll-down")
}
