const cartContainer = document.querySelector(".cart--container");
const clothesContainer = document.querySelector(".clothes--cart");
console.log(clothesContainer);

let generateItems = () => {
  return (cartContainer.innerHTML = itemData
    .slice(0, 6)
    .map((item) => {
      let { id, name, source, actualPrice, discountPrice } = item;
      return `
    <div class="cart--item shoe--item" id="cart--${id}">
    <h5 class="title">${name}</h5>
    <img src=${source} alt="">
    <div class="details--wrapper">

    <div class="price--container">
    <div class="discount--price">$${discountPrice}</div>
    <div class="actual--price">$${actualPrice}</div>
<div class="discount">${generateDiscount(actualPrice, discountPrice)}</div>
    </div>

    <div class="button--wrapper">
    <i id="remove--btn" class="fas fa-minus"></i>
    <span class="quantity">0</span>
    <i id="add--btn" class="fas fa-plus"></i>
    </div>
    </div>
    </div>

`;
    })
    .join(""));
};

let generateClothItems = () => {
  return (clothesContainer.innerHTML = itemData
    .slice(6)
    .map((item) => {
      let { id, name, source, actualPrice, discountPrice } = item;
      return `
    <div class="cart--item clothes--item" id="cart--${id}">
    <h5 class="title">${name}</h5>
    <img src=${source} alt="">
    <div class="details--wrapper">

    <div class="price--container">
    <div class="discount--price">$${discountPrice}</div>
    <div class="actual--price">$${actualPrice}</div>
<div class="discount">${generateDiscount(actualPrice, discountPrice)}</div>
    </div>

    <div class="button--wrapper">
    <i id="remove--btn" class="fas fa-minus"></i>
    <span class="quantity">0</span>
    <i id="add--btn" class="fas fa-plus"></i>
    </div>
    </div>
    </div>

`;
    })
    .join(""));
};

let generateDiscount = (actualPrice, discountPrice) => {
  let discount = Math.floor((discountPrice * 100) / actualPrice);
  let actualDiscount = Math.floor(100 - discount);
  return actualDiscount + "%";
};

generateItems();
generateClothItems();
