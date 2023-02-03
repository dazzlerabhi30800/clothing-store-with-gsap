let checkoutCartWrapper = document.querySelector(".checkout--cart--wrapper");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCheckoutItems = () => {
  if (basket.length !== 0) {
    return (checkoutCartWrapper.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = itemData.find((y) => y.id === id);
      let { name, source, discountPrice } = search;
      return `
      <div class="checkout--cart--item" id="checkout--${id}">
          <img
            src=${source}
            alt="clothes"
            aria-hidden="true"
          />
          <div class="detail--container">
            <div class="info--container">
              <div class="name--wrapper">
                  <span>${discountPrice}$</span>
                  <i onclick="removeItem(${id})" class="fas fa-times"></i>
              </div>
              <h5>${name}</h5>
            </div>
            <div class="add--wrapper">
              <i onclick="decrement(${id})" class="fas fa-minus"></i>
              <span id="${id}">${item}</span>
              <i onclick="increment(${id})" class="fas fa-plus"></i>
            </div>
            <div class="total--amount">$${item * discountPrice}</div>
          </div>
        </div>
`;
    }));
  } else {
    checkoutCartWrapper.innerHTML = `
      <h2 class="empty--cart">The Cart is Empty Idiot !!</h2>
    `;
  }
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
  localStorage.setItem("data", JSON.stringify(basket));
  generateCheckoutItems();
  totalAmount();
  showClearBtn();
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCheckoutItems();
  totalAmount();
  showClearBtn();
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerText = search.item;
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

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCheckoutItems();
  totalAmount();
  showClearBtn();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  let amountDiv = document.querySelector(".totalPrice");
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = itemData.find((y) => y.id === id);
        return item * search.discountPrice;
      })
      .reduce((a, b) => a + b, 0);
    amountDiv.textContent = "$" + amount;
  } else {
    amountDiv.textContent = 0;
  }
};

let clearBtn = document.querySelector(".clear--btn");
let showClearBtn = () => {
  if (basket.length !== 0) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }
};

clearBtn.addEventListener("click", () => {
  basket = [];
  generateCheckoutItems();
  totalAmount();
  showClearBtn();
  localStorage.setItem("data", JSON.stringify(basket));
});

generateCheckoutItems();
totalAmount();
showClearBtn();
