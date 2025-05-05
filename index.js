import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu");
const orderContainer = document.getElementById("custom-order");
const orderWrapper = document.getElementById("order");
let order = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addItem(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  }
});

function renderMenu() {
  const htmlString = menuArray
    .map(function (item) {
      return `
        <div class="card">
        <div class="menu-item">
          <p class="item-emoji">${item.emoji}</p>
          <div class="menu-text">
            <h2>${item.name}</h2>
            <p class="gray">${item.ingredients.join(", ")}</p>
            <p class="price">${item.price + "$"}</p>
          </div>
        </div>
        <button class="add-item" data-add="${item.id}">+</button>
      </div>
        `;
    })
    .join("");

  menuContainer.innerHTML = htmlString;
}
function addItem(id) {
  order.push(id);
  renderOrder();
  updatePrice();
}
function removeItem(index) {
  order.splice(index, 1);
  renderOrder();
  updatePrice();
}

function renderOrder() {
  orderWrapper.classList.remove("hidden");
  const htmlString = order
    .map(function (orderId, index) {
      return `
            <div class="order-item">
                <p class="order-item-name">${menuArray[orderId].name}</h2>
                <button class="remove-order-item gray" data-remove="${index}">remove</button>
                <p class="order-item-price price">${
                  menuArray[orderId].price + "$"
                }</p>
            </div>
            `;
    })
    .join("");
  orderContainer.innerHTML = htmlString;
}

function updatePrice() {
  const totalPrice = document.getElementById("total-price");
  const sum = order.reduce(function (total, current) {
    return (total += menuArray[current].price);
  }, 0);
  console.log(sum);
  sum === 0
    ? (orderContainer.innerHTML = `<span class="placeholder-text gray"
          >There are no items in your cart.</span
        >`)
    : "";

  totalPrice.textContent = sum + "$";
}

renderMenu();
