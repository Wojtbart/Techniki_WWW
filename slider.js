const slideList=[
    {
        img: "img/photo1.jpeg",
        text:"Auto 1"
    },
    {
        img: "img/photo2.jpeg",
        text:"Auto 2"
    },
    {
        img: "img/photo3.jpeg",
        text:"Auto 3"
    },
]

let active=0;
const time=5000; //w ms

const image=document.querySelector('img.sliderImg')
const h1=document.querySelector('.slider h1')
const dots=[...document.querySelectorAll('.dots span')];

const changeDot=()=>{
    const nr=dots.findIndex(dot=> dot.classList.contains('active'));
    dots[nr].classList.remove('active');
    dots[active].classList.add('active')

}

const changeSlide=()=>{

    active++;
    if(active===slideList.length){
        active=0;
    }
    image.src=slideList[active].img;
    
    // image.style.WebkitTransition = 'opacity 1s';
    h1.textContent=slideList[active].text;
    changeDot();
};

const opacity=()=>{

   image.classList.add(".slider img .active")
   h1.classList.add(".slider img .active")
};
setInterval(opacity,300)
setInterval(changeSlide,time)
