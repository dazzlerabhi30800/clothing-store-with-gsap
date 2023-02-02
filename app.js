const cartContainer = document.querySelector(".cart--container");
const clothesContainer = document.querySelector(".clothes--cart");
const cartIcon = document.querySelector(".cart--logo");
let basket = [];

let generateItems = () => {
  return (cartContainer.innerHTML = itemData
    .slice(0, 6)
    .map((item) => {
      let { id, name, source, actualPrice, discountPrice } = item;
      let search = basket.find((y) => y.id === id);
      return `
    <div class="cart--item shoe--item" id="cart--${id}">
      <h5 class="title">${name}</h5>
      <img src=${source} alt="">
        <div class="details--wrapper">

          <div class="price--container">
            <div class="discount--price">$${discountPrice}</div>
            <div class="actual--price">$${actualPrice}</div>
            <div class="discount">${generateDiscount(
              actualPrice,
              discountPrice
            )}</div>
          </div>

          <div class="button--wrapper">
            <i id="remove--btn" onclick="decrement(${id})" class="fas fa-minus"></i>
            <span id="${id}" class="quantity">${
        search === undefined ? 0 : search.item
      }</span>
            <i id="add--btn" onclick="increment(${id})" class="fas fa-plus"></i>
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
      let search = basket.find((y) => y.id === id);
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
    <i id="remove--btn" onclick="decrement(${id})" class="fas fa-minus"></i>
    <span id="${id}" class="quantity">${
        search === undefined ? 0 : search.item
      }</span>
    <i id="add--btn" onclick="increment(${id})" class="fas fa-plus"></i>
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

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerText = search.item;
  updateCartIcon();
};

let updateCartIcon = () => {
  let totalItem = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
  const cartAmount = document.querySelector(".cart--amount");
  if (totalItem < 1 && totalItem === 0) {
    cartIcon.classList.remove("show");
    cartAmount.textContent = 0;
  } else {
    cartIcon.classList.add("show");
    cartAmount.textContent = totalItem;
  }
};

generateItems();
generateClothItems();
