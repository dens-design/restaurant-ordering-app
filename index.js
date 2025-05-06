import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu");
const orderContainer = document.getElementById("custom-order");
const orderWrapper = document.getElementById("order");
const modal = document.getElementById("payment-modal");
let order = [];
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  completeOrder();
});

document.addEventListener("click", function (e) {
  if (
    !Array.from(document.querySelectorAll("#payment-modal *")).includes(
      e.target
    ) &&
    e.target.id != "payment-modal"
  ) {
    //Necessary to also close modal when outside modal click target is complete button
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      return;
    }
  }
  if (e.target.dataset.add) {
    addItem(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  } else if (e.target.id === "complete-order") {
    order.length === 0
      ? document.getElementById("complete-error").classList.remove("hidden")
      : modal.classList.remove("hidden");
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
  document.getElementById("complete-error").classList.add("hidden");
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
function completeOrder() {
  orderWrapper.innerHTML = `<p class="success-message">Thanks, ${
    document.getElementById("name").value
  }! Your order is on its way!</p>`;
}

renderMenu();
