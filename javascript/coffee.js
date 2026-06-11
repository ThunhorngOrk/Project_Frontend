let product = [];
let cardItem = [];

// Display product
const Display = (prd) => {
    if (prd.length > 0) {
        prd.forEach((item) => {
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
                        <p class="card-text text-muted small">
                            ${item.cooking}
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
};

// Fetch data
fetch("https://ngunmakara.github.io/API-coffee/")
    .then((res) => res.json())
    .then((pcdata) => {
        product = pcdata;
        console.log(product);
        Display(product);
    })
    .catch((err) => console.log(err));

// Search product
document.getElementById("search").addEventListener("input", function (e) {
    let searchValue = e.target.value.toLowerCase();
    console.log(searchValue);

    let found = product.filter((pro) => {
        return pro.name.toLowerCase().includes(searchValue);
    });
    document.getElementById("show-product").innerHTML = ``;
    if (found.length > 0) {
        Display(found);
        document.getElementById("txt-search").innerHTML = ``;
    } else {
        document.getElementById("txt-search").innerHTML = `Product is Not Found!`;
    }
});

// fc add to cart
const addToCart = (productId) => {
    let prd = product.find((pro) => pro.id === productId);
    let itemcart = cardItem.find((i) => i.id === productId);
    if (itemcart) {
        itemcart.quantity += 1;
    } else {
        cardItem.push({ ...prd, quantity: 1 });
    }
    Swal.fire({
        title: `${prd.name} added to cart!`,
        text: "Please check your cart",
        icon: "success",
    });
    Update();
};

const Update = () => {
    let cartCount = document.getElementById("cart_count");
    let tocart = document.getElementById("cart-items");

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
        cardItem.forEach((item) => {
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
                </div>`;
            tocart.innerHTML = showitem;
        });
        let totalpayment = cardItem.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );

        show = `<div class="card-footer">

        <div class="mb-3 ">
        <label class="col-form-label">Select Payment Method</label>

        <div class="form-check">
            <input class="form-check-input  " type="radio" name="bank" value="ABA" id="aba">
            <label class="form-check-label" for="aba"><img src="https://i.pinimg.com/1200x/72/ae/d6/72aed6a382d80ba47b86f5690ea8bb1a.jpg" alt="ABA" width="30px" class="me-2 bank-img ">ABA Bank</label>
        </div>

        <div class="form-check">
            <input class="form-check-input " type="radio" name="bank" value="ACLEDA" id="acleda">
            <label class="form-check-label" for="acleda"><img src="https://i.pinimg.com/736x/9b/d9/e5/9bd9e55527b9a81e922697eb7c94b713.jpg" alt="ACLEDA" width="30px" class="me-2 bank-img ">ACLEDA Bank</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="bank" value="KB PRASAK Bank" id="kbprask">
            <label class="form-check-label" for="kbprask"><img src="https://i.pinimg.com/1200x/06/e9/4c/06e94cc0a6c032b6ce65a67b32ed4bf7.jpg" alt="KB PRASAK Bank" width="30px" class="me-2 bank-img ">KB PRASAK Bank</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="bank" value="Vattanac Bank" id="nbc">
            <label class="form-check-label" for="nbc"><img src="https://worldecomag.com/wp-content/uploads/2021/10/Vattanac-Bank-Logo-1.png" alt="Vattanac Bank" width="30px" class="me-2 bank-img ">Vattanac Bank</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="bank" value="Cash on Delivery" id="cod">
            <label class="form-check-label" for="cod"><img src="https://i.pinimg.com/736x/fd/5d/36/fd5d360ff078dc897e88dbed7c95118e.jpg" alt="COD" width="30px" class="me-2 bank-img ">Cash on Delivery</label>
        </div>
    </div>

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
                </div>`;
        document.getElementById("card-summary").innerHTML = show;
    }
};

const Removecart = (productId) => {
    cardItem = cardItem.filter((i) => i.id !== productId);
    Update();
};

const UpdateQTY = (productId, qtycount) => {
    const qtyData = cardItem.find((i) => i.id === productId);

    if (qtyData) {
        qtyData.quantity += qtycount;

        if (qtyData.quantity < 1) {
            Removecart(productId);
            return;
        }
    }
    Update();
};

const Checkout = () => {
    if (cardItem.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Your cart is empty",
            text: "You can't Payment with empty cart",
        });
        return;
    }

    //  Get selected payment method
    const selectedBank = document.querySelector('input[name="bank"]:checked');

    if (!selectedBank) {
        Swal.fire({
            icon: "warning",
            title: "Select Payment Method",
            text: "Please choose a bank before payment",
        });
        return;
    }

    let bank = selectedBank.value;

    //  Success (you can replace with real API later)
    cardItem = [];
    Update();

    Swal.fire({
        icon: "success",
        title: "Thank You For Order",
        text: "Payment Method: " + bank,
        dragger: true,
    });

    console.log("Selected Bank:", bank);
};

// modal form
document.querySelector(".btn-secondary").addEventListener("click", function () {
    const form = document.getElementById("userForm");

    //  If form invalid
    if (!form.checkValidity()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can't add your information",
        });
        return;
    }

    //  Check gender manually
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can't add your information",
        });
        return;
    }

    //  If success
    Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Information added successfully!",
    });

    form.reset();
});
