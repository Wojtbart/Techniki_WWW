const burger = document.querySelector(".menu_hamburger");

const iconBurger = document.querySelector(".fa-bars");
const iconX = document.querySelector(".fa-times");
const column = document.querySelectorAll("nav ul li");
const ulList = document.querySelector("nav ul");

console.log(window.innerWidth);
if(window.innerWidth>1023){
  burger.classList.add('.menu_hamburger.active')
}

// if(window.innerWidth<1280){
burger.addEventListener("click", function () {
    // console.log(column);
    iconBurger.classList.toggle("show");//tak
    iconX.classList.toggle("show");//nie
    ulList.classList.toggle("show");
    for (let i = 0; i < column.length; i++) {
        column[i].classList.toggle("show");
      }
})


// }
