// let father = document.getElementById("container");
// function addTask() {
//   let child1 = document.getElementById("inputTask");
//   let task = child1.value;
//   if (task == "") {
//     alert("enter your task");
//   } else {
//     let child2 = document.createElement("div");
//     father.appendChild(child2);
//     child2.style.backgroundColor = "#eeeeee";
//     child2.style.width = "300px";
//     child2.style.padding = "10px";
//     child2.style.margin = "5px";
//     child2.style.borderRadius = "10px";
//     child2.style.margin = "20px auto";
//     child2.style.textAlign = "center";
//     let tasktag = document.createElement("h3");
//     child2.appendChild(tasktag);
//     tasktag.innerHTML = task;
//     console.log(task);

//     let delbtn = document.createElement("button");
//     child2.appendChild(delbtn);
//     console.log(delbtn)
//     delbtn.innerHTML = "delete";
//     console.log(delbtn)
//     delbtn.onclick = deltask;
//     function deltask() {
//       this.parentElement.remove();
//     }
//     let editbtn = document.createElement("button");
//     child2.appendChild(editbtn);
//     editbtn.innerHTML = "edit";
//     editbtn.onclick = edittask;
//     function edittask() {
//       let oldtask = this.parentElement.querySelector("h3");
//       let newtask = prompt("enter your game");

//       if (task != "") {
//         oldtask.innerHTML = newtask;
//       } else {
//         alert("enter your game");
//       }
//     }
//   }
// }
// function searchGame() {

//     let search = document.getElementById("gameSearch").value
//         .toLowerCase()
//         .trim();

//     if (search === "fc 26") {
//         openFC26();

//     } else if (search === "spider-man 2" || search === "spiderman 2") {
//         openSpiderMan();

//     } else if (search === "gang beasts") {
//         openGangBeasts();

//     } else if (search === "god of war") {
//         openGodOfWar();

//     } else if (search === "gta" || search === "gta 5") {
//         openGTA();

//     } else if (search === "cuphead") {
//         openCuphead();

//     } else if (search === "minecraft") {
//         openMinecraft();

//     } else {
//         alert("Game not found");
//     }
// }
// let fc26Quantity = 1;

// function increaseQuantity() {
//     fc26Quantity++;
//     document.getElementById("fc26Quantity").textContent = fc26Quantity;
// }

// function decreaseQuantity() {
//     if (fc26Quantity > 1) {
//         fc26Quantity--;
//         document.getElementById("fc26Quantity").textContent = fc26Quantity;
//     }
// }

// function deleteFC26() {
//     document.getElementById("fc26Modal").style.display = "none";

//     fc26Quantity = 1;
//     document.getElementById("fc26Quantity").textContent = fc26Quantity;
// }
// img.onclick = function () {
//     document.getElementById("main").style.display = "block";
// };
// document.getElementById("close").onclick = function () {
//     document.getElementById("main").style.display = "none";
// };
// Saved items stay in this browser.
function getItems(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function saveItems(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
    updateCounters();
}

let quantity = 1;

function updateQuantity() {
    const number = document.querySelector(".quantity span");
    const minus = document.querySelector(".quantity button");

    if (number) number.textContent = quantity;
    if (minus) minus.disabled = quantity === 1;
}

function increaseQuantity() {
    quantity++;
    updateQuantity();
}

function decreaseQuantity() {
    quantity = Math.max(1, quantity - 1);
    updateQuantity();
}

function getProduct() {
    const info = document.querySelector(".product-info");
    if (!info) return null;

    return {
        id: location.pathname.split("/").pop(),
        name: info.querySelector("h1").textContent.trim(),
        price: Number(
            info.querySelector("h2").textContent.replace(/[^0-9.]/g, "")
        )
    };
}

function addProductToCart(product, amount = 1) {
    const cart = getItems("gamehub-cart");
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += amount;
    } else {
        cart.push({ ...product, quantity: amount });
    }

    saveItems("gamehub-cart", cart);
    document.getElementById("shop-message").textContent =
        `${amount} × ${product.name} added to your cart.`;
}

function addToCart() {
    const product = getProduct();
    if (product) addProductToCart(product, quantity);
}

function toggleWishlist() {
    const product = getProduct();
    if (!product) return;

    const wishlist = getItems("gamehub-wishlist");
    const exists = wishlist.some(item => item.id === product.id);

    const updated = exists
        ? wishlist.filter(item => item.id !== product.id)
        : [...wishlist, product];

    saveItems("gamehub-wishlist", updated);

    document.getElementById("shop-message").textContent =
        product.name + (
            exists
                ? " removed from your wishlist."
                : " added to your wishlist."
        );
}

function updateCounters() {
    const cart = getItems("gamehub-cart");
    const wishlist = getItems("gamehub-wishlist");

    document.getElementById("cart-count").textContent =
        cart.reduce((total, item) => total + item.quantity, 0);

    document.getElementById("wishlist-count").textContent =
        wishlist.length;

    const product = getProduct();
    const button = document.querySelector(".product-info .wishlist");

    if (product && button) {
        const saved = wishlist.some(item => item.id === product.id);
        button.textContent = saved
            ? "♥ Remove from Wishlist"
            : "♡ Add to Wishlist";

        button.setAttribute("aria-pressed", String(saved));
    }
}

function makeButton(text, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.addEventListener("click", action);
    return button;
}

function showItems(type) {
    const key = type === "cart"
        ? "gamehub-cart"
        : "gamehub-wishlist";

    const items = getItems(key);
    const list = document.getElementById("saved-items");
    const dialog = document.getElementById("shop-dialog");

    document.getElementById("shop-title").textContent =
        type === "cart" ? "Your Cart" : "Your Wishlist";

    list.replaceChildren();

    if (items.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No items yet.";
        list.appendChild(message);
    }

    items.forEach(item => {
        const row = document.createElement("div");
        row.className = "saved-item";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const price = document.createElement("span");
        price.textContent = `$${item.price.toFixed(2)}`;

        row.append(name, price);

        if (type === "cart") {
            const number = document.createElement("span");
            number.textContent = item.quantity;

            function changeQuantity(amount) {
                const cart = getItems(key);
                const product = cart.find(p => p.id === item.id);

                product.quantity = Math.max(
                    1, product.quantity + amount
                );

                saveItems(key, cart);
                showItems(type);
            }

            const minus = makeButton("−", () => changeQuantity(-1));
            minus.disabled = item.quantity === 1;

            row.append(
                minus,
                number,
                makeButton("+", () => changeQuantity(1))
            );
        } else {
            row.append(
                makeButton("Add to Cart", () => {
                    addProductToCart(item);
                })
            );
        }

        row.append(
            makeButton("Remove", () => {
                saveItems(
                    key,
                    getItems(key).filter(p => p.id !== item.id)
                );
                showItems(type);
            })
        );

        list.appendChild(row);
    });

    document.getElementById("cart-total").textContent =
        type === "cart"
            ? "Total: $" + items.reduce(
                (total, item) =>
                    total + item.price * item.quantity,
                0
            ).toFixed(2)
            : "";

    if (!dialog.open) dialog.showModal();
}

function searchGame() {
    const search = document.getElementById("gameSearch");
    if (!search) return;

    const name = search.value.toLowerCase().trim();

    const pages = {
        "fc 26": "fc26.html",
        "fc26": "fc26.html",
        "spider-man 2": "sp.html",
        "spiderman 2": "sp.html",
        "gang beasts": "gng.html",
        "it takes two": "ittak.html",
        "god of war": "gow.html",
        "god of war ragnarok": "gow.html",
        "gta": "GTA.html",
        "gta 5": "GTA.html",
        "cuphead": "ch.html",
        "minecraft": "min.html",
        "ps5": "lec6hw.html"
    };

    if (pages[name]) {
        window.location.href = "./" + pages[name];
    } else {
        document.getElementById("shop-message").textContent =
            "Game not found.";
    }
}

function setupShop() {
    const style = document.createElement("style");

    style.textContent = `
        .shop-controls {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding: 15px;
        }

        .shop-controls button,
        #shop-dialog button {
            padding: 10px 14px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background: white;
            color: black;
            cursor: pointer;
        }

        #shop-message {
            padding: 0 15px;
            color: #167779;
            font-family: Arial, sans-serif;
        }

        #shop-dialog {
            width: min(650px, 90vw);
            max-height: 80vh;
            box-sizing: border-box;
            overflow: auto;
            padding: 24px;
            border: none;
            border-radius: 12px;
            background: white;
            color: black;
            font-family: Arial, sans-serif;
        }

        #shop-dialog::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }

        .saved-item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            padding: 15px 0;
            border-bottom: 1px solid #ddd;
        }

        .saved-item strong {
            flex: 1;
            min-width: 120px;
        }

        #cart-total {
            font-size: 20px;
            font-weight: bold;
        }
    `;

    document.head.appendChild(style);

    const controls = document.createElement("div");
    controls.className = "shop-controls";

    controls.innerHTML = `
        <button type="button" id="view-cart">
            🛒 Cart (<span id="cart-count">0</span>)
        </button>

        <button type="button" id="view-wishlist">
            ♡ Wishlist (<span id="wishlist-count">0</span>)
        </button>
    `;

    const message = document.createElement("p");
    message.id = "shop-message";
    message.setAttribute("role", "status");

    document.body.prepend(controls, message);

    const dialog = document.createElement("dialog");
    dialog.id = "shop-dialog";
    dialog.setAttribute("aria-labelledby", "shop-title");

    dialog.innerHTML = `
        <button type="button" id="close-shop"
                aria-label="Close cart or wishlist">×</button>
        <h2 id="shop-title"></h2>
        <div id="saved-items"></div>
        <p id="cart-total"></p>
    `;

    document.body.appendChild(dialog);

    document.getElementById("view-cart").onclick =
        () => showItems("cart");

    document.getElementById("view-wishlist").onclick =
        () => showItems("wishlist");

    document.getElementById("close-shop").onclick =
        () => dialog.close();

    const cartButton = document.querySelector(".product-info .cart");
    const wishlistButton =
        document.querySelector(".product-info .wishlist");

    if (cartButton) {
        cartButton.type = "button";
        cartButton.onclick = addToCart;
    }

    if (wishlistButton) {
        wishlistButton.type = "button";
        wishlistButton.onclick = toggleWishlist;
    }

    const search = document.getElementById("gameSearch");

    if (search) {
        search.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                searchGame();
            }
        });
    }

    updateQuantity();
    updateCounters();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupShop);
} else {
    setupShop();
}
