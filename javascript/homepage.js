let product = []
let cardItem = []

// Display product
const Display = (prd) => {
    if (prd.length > 0) {
        prd.forEach(item => {
            document.getElementById("show-product").innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 border-0 product-card">
                    <img src="${item.image}"
                        class="card-img-top" alt="..." />

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted small">
                            ${item.discription}
                        </p>

                        <h6 class="text-primary mb-2">$${item.price}</h6>

                        <button onclick='addToCart(${item.id})' class="btn btn-success mt-auto w-100" >
                            <i class="bi bi-cart-plus"></i> Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        document.getElementById("show-product").innerHTML += `
            <h1 class="text-center text-danger-emphasis fw-bold">
                Product is Not Found.
            </h1>
        `;
    }
    Update();
}

// Fetch data
fetch("https://ngunmakara009-cmd.github.io/API-Khmer-food/")
    .then(res => res.json())
    .then(pcdata => {
        product = pcdata
        console.log(product)
        Display(product)
    })
    .catch(err => console.log(err))

// Search product
document.getElementById("search").addEventListener("input", function (e) {
    let searchValue = e.target.value.toLowerCase()
    console.log(searchValue);

    let found = product.filter(pro => {
        return pro.name.toLowerCase().includes(searchValue)
    })
    document.getElementById("show-product").innerHTML = ``;
    if (found.length > 0) {
        Display(found);
        document.getElementById("txt-search").innerHTML = ``;
    } else {
        document.getElementById("txt-search").innerHTML = `Product is Not Found!`
    }
})

// fc add to cart
const addToCart = (productId) => {
    let prd = product.find(pro => pro.id === productId)
    let itemcart = cardItem.find(i => i.id === productId)
    if (itemcart) {
        itemcart.quantity += 1;
    } else {
        cardItem.push({ ...prd, quantity: 1 })
    }
    Swal.fire({
        title: `${prd.name} added to cart!`,
        text: "Please check your cart",
        icon: "success"
    });
    Update();
}

const Update = () => {
    let cartCount = document.getElementById("cart_count")
    let tocart = document.getElementById("cart-items")

    let total = cardItem.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerHTML = total;

    cartCount.innerHTML = total;

    let show = ``;
    let showitem = ``;
    if (cardItem.length === 0) {
        tocart.innerHTML = `<h3 class="text-center">Your cart is empty.</h3>`;
        show = `<div class="card-footer">
                    <div class="d-flex justify-content-between fw-bold">
                        <span>Total Payment:</span>
                        <span>$0</span>
                    </div>
                    <button onclick="Checkout()" class="btn btn-dark w-100 mt-3">Payment</button>
                </div>`;
        document.getElementById("card-summary").innerHTML = show;
    } else {
        cardItem.forEach(item => {
            showitem += `<div class="cart-item">
                    <img src="${item.image}" alt="">

                    <div class="cart-info">
                        <h6>${item.name}</h6>
                        <p>$${item.price.toFixed(2)}</p>

                        <div class="cart-actions">
    <button onclick="UpdateQTY(${item.id}, -1)">-</button>
    <span>${item.quantity}</span>
    <button onclick="UpdateQTY(${item.id}, 1)">+</button>
</div>
                    </div>
                    <i class="bi bi-trash remove-btn" onclick="Removecart(${item.id})"></i>
                </div>`
            tocart.innerHTML = showitem
        })
        let totalpayment = cardItem.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        show = `<div class="card-footer">

                <div class="mb-3">
    <label for="promoCode" class="col-form-label">Promotion Code</label>
    <input 
        id="promoCode" 
        type="text" 
        class="form-control" 
        placeholder="Enter promo code"
    >
</div>
                    <div class="d-flex justify-content-between fw-bold">
                        <span>Total Payment:</span>
                        <span>$${totalpayment}</span>
                    </div>
                    <button onclick="Checkout()" class="btn btn-dark w-100 mt-3">Payment</button>
                </div>`
        document.getElementById("card-summary").innerHTML = show;
    }

}

const Removecart = (productId) => {
    cardItem = cardItem.filter(i => i.id !== productId)
    Update();
}

const UpdateQTY = (productId, qtycount) => {
    const qtyData = cardItem.find(i => i.id === productId);

    if (qtyData) {
        qtyData.quantity += qtycount;

        if (qtyData.quantity < 1) {
            Removecart(productId);
            return;
        }
    }
    Update();
}

const Checkout = () => {
    if (cardItem.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Your cart is empty",
            text: "You can't Payment with empty cart",
        });
    } else {
        cardItem = [];
        Update();
        Swal.fire({
            icon: "success",
            title: "Thank You For Order",
            dragger: true
        });
    }
}

// modal form
document.querySelector(".btn-secondary").addEventListener("click", function () {

    const form = document.getElementById("userForm");

    //  If form invalid
    if (!form.checkValidity()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You can't add your information"
        });
        return;
    }

    //  Check gender manually
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You can't add your information"
        });
        return;
    }

    //  If success
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: "Information added successfully!"
    });

    form.reset();
});

//style typing effect
let words = "ORDER YOUR FAVOITE FOOD ONLINE";
let i = 0;
let forward = true;

setInterval(() => {
    if (forward) {
        document.getElementById("typing").textContent = words.slice(0, i++);
        if (i > words.length) forward = false;
    } else {
        document.getElementById("typing").textContent = words.slice(0, i--);
        if (i < 0) forward = true;
    }
}, 170);
