'use strict';

//  thumbnails switch mechanics

const productThumbList = document.getElementsByClassName("product-image_thumbs_item");
//console.log(123,productThumbList);
const thumbElements = Array.from(productThumbList);
const productfullImage = document.getElementsByClassName("product-image_full")[0];

thumbElements.map((elm)=>{
    // elm.onclick = ()=>thumbClick();
    elm.onclick = thumbClick;
    console.log(elm);
})
function thumbClick(e){
    const thumbElement = e.target;
    productfullImage.src = thumbElement.src;
    productfullImage.classList.add("flash");
    setTimeout(()=>{
        productfullImage.classList.remove("flash");
    }, 250);
}



//  number control mechanics

const countButtons = document.querySelectorAll(".product__text-count>button");
const countNumberInput = document.getElementsByClassName("product__text-count_number")[0];
let cuntNumberValue = 1;

countButtons[0].onclick = (e)=>{ updateCounter(1); }
countButtons[1].onclick = (e)=>{ updateCounter(-1); }
countNumberInput.onchange = (e)=>{ cuntNumberValue = +e.target.value };

function updateCounter(dir){
    if( (cuntNumberValue>1 && dir<1) || dir>0 ){
        cuntNumberValue += dir
        countNumberInput.value = cuntNumberValue;
    }

}



//  e-mail validation

const emailCheckRegExp = /[a-z0-9\-\.]+\@[a-z0-9\-]+\.[a-z0-9\-\.]+/g;
const subscribeForm = document.getElementById("subscribe-form");
const subscribeEmailInput = subscribeForm.querySelector("[name=email]");
const subscribeWrongEmailText = subscribeForm.querySelector(".wrongEmail");

subscribeEmailInput.onkeydown = (evt)=>{
    console.log("key");
    subscribeEmailInput.classList.remove("wrongEmailInput");
    subscribeWrongEmailText.classList.remove("wrongEmailDetected");
}
subscribeForm.onsubmit = (evt)=>{
    console.log("SUBMIT");
	evt.preventDefault();
    const emailValue = subscribeEmailInput.value; //evt.target.email.value;
    const isEmailCorrect = emailCheckRegExp.test(emailValue);
    console.log(emailValue+" is email? "+ isEmailCorrect);
    if(!isEmailCorrect){
        subscribeEmailInput.classList.add("wrongEmailInput");
        subscribeWrongEmailText.classList.add("wrongEmailDetected");
    }else{
        subscribeEmailInput.classList.remove("wrongEmailInput");
        subscribeWrongEmailText.classList.remove("wrongEmailDetected");
    }
}



//  popup mechanics

//
const popup = document.getElementsByClassName("popup")[0];
const popupShadow = popup.querySelector(".popup__shadow");
const popupText = popup.querySelector("p");
const popupCloseCross = popup.querySelector(".panel__cross");
const popupProductHilite= popup.querySelector(".popup__panel__hilite");
const popupProducNumber = popup.querySelector(".popup__panel__number");
console.log(popup,popupShadow,popupCloseCross,popupProductHilite,popupProducNumber);

popupShadow.onclick = popupCloseCross.onclick = closePopup;
function closePopup(){
    popup.classList.remove("popupAppear");
    popup.classList.add("popup_closed");
}
function showPopup(props){
    props.name = document.getElementsByClassName("product-name")[0].innerText;
    props.count = cuntNumberValue;
    const counted = props.where=="в избранное" ? "" : `в количестве <span class="popup__panel__number">${props.count}</span> единиц`;
    popupText.innerHTML = `Товар <span class="popup__panel__hilite">${props.name}</span> ${counted} добавлен <a href="#">${props.where}</a>`;
    popup.classList.add("popupAppear");
}

const btnAddToCart = document.getElementsByClassName("product__button_add-to-cart")[0];
const btnAddToFavs = document.getElementsByClassName("product__button_favorite")[0];

btnAddToCart.onclick = ()=>{showPopup({name:"Носки", count:4, where:"в корзину"})};
btnAddToFavs.onclick = ()=>{showPopup({name:"Носки", count:4, where:"в избранное"})};



//  header hiding
const headerElm = document.getElementsByTagName("header")[0];
let lastY = 0;
const bodyElmnt = document.getElementsByTagName('body')[0]
bodyElmnt.onscroll = function() {
    var doc = document.documentElement;
    const nowY = window.pageYOffset;
    // const topp = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    if(nowY > lastY){
        headerElm.classList.add("header-hidden");
    }else{
        headerElm.classList.remove("header-hidden");
    }

    console.log("scrolling: " + nowY);
    lastY = nowY;
};



//  menu appear     header__item_menu
const headerMenuShowButton = document.getElementsByClassName("header__menu_btn")[0];
const headerMenuCloseButton = document.getElementsByClassName("header__menu_close")[0];
const headerMenu = document.getElementsByClassName("header__menu")[0];
const headerMenuShadow = document.getElementsByClassName("header__menu_shadow")[0];

headerMenuShowButton.onclick = showMenu;
headerMenuCloseButton.onclick = hideMenu;
headerMenuShadow.onclick = hideMenu;

function showMenu(){
    console.log("showMenu")
    headerMenu.classList.add("header__menu_shown");
    // document.body.style="overflow: hidden";
}
function hideMenu(){
    console.log("hideMenu")
    headerMenu.classList.remove("header__menu_shown");
    // document.body.style="";
}