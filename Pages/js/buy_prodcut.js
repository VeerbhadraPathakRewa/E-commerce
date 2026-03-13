if (localStorage.getItem("__au__") != null) {
    let email = localStorage.getItem("__au__");
    let allOrderData = [];
    allOrderData = getAllData("allOrderData");
    let relationbox = document.querySelector(".relation-box")
    let imgbox = document.querySelector(".img-box")
    let detailsBox = document.querySelector(".details-box")
    let url = location.href
    let id = url.split("=")[1];
    let allProductData = getAllData("allProductData");
    let allRegistrationData = getAllData("allRegistrationData");
    let allDeleveryData = getAllData("allDeleveryData");
    let currentProduct = allProductData[id];
    console.log(currentProduct)
    let userinfo = allRegistrationData.find((data) => data.email == email)


    relationbox.innerHTML += `
        <a href="#"></a>  ${currentProduct.category}
        <a href="#"></a> >> ${currentProduct.brand}
        <a href="#"></a> >> ${currentProduct.title}
        `;
    imgbox.innerHTML = `
        <div class="w-25">
            <img src="${currentProduct.front}" class="border s-img mb-3 " width="100" height="100">
            <img src="${currentProduct.back}" class="border s-img mb-3 " width="100" height="100">
            <img src="${currentProduct.left}" class="border s-img mb-3 " width="100" height="100">
            <img src="${currentProduct.right}" class="border s-img mb-3 " width="100" height="100">
        </div>
        <div class ="w-75 d-flex justify-content-center align-items-center ">
            <img src="${currentProduct.thumb}" class="border mb-3 p-img " width="80%">
        </div>  
        `;
    detailsBox.innerHTML = `
    <div>
    <h4 class="text-capitalize">    ${currentProduct.title}</h4>
    <p class="text-uppercase">    ${currentProduct.brand}</p>
    <p class="fw-bold"> <i class="fa fa-rupee" ></i>&nbsp; ${currentProduct.price}</p> 
    <h5>
    Description <br>
    ${currentProduct.description}
    </h5><br>
    <h5>
    Quantity <br>
    <input type="number" required class="w-25 form-control qty " >
    </h5><br>
   
   <div class="pay-mode">
    <h5>
    Payment Mode <br>
    <input type="radio" value="online" name="pay-mode" > <span>&nbsp; Online &nbsp;&nbsp;</span>
    <input type="radio" value="cod" name="pay-mode"><span>&nbsp; Cash on Dilevery</span>
    </h5>
    </div><br>

    <button class="btn btn-primary buy-btn">
    <i class="fa fa-bag-shopping"></i> Buy Now 
    </button>
    <button class="btn btn-danger cart-btn">
    <i class="fa fa-cart-shopping"></i>Add to Cart
    </button>
    <h5><br>
    Check Product Availibilty </h5>
    <input type="number" class="pincode form-control" > 
    <br>
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="area-msg"></h5>
      <button class="btn btn-primary float-end check-btn">Check Area</button>
      </div>
    </div>
    `;

    let allSImg = imgbox.querySelectorAll(".s-img");
    let pImg = imgbox.querySelector(".p-img");
    let pinCodeEl = detailsBox.querySelector(".pincode");
    let checkMsg = detailsBox.querySelector(".area-msg");
    let checkBtn = detailsBox.querySelector(".check-btn");
    let buyBtn = detailsBox.querySelector(".buy-btn");
    let payMode = detailsBox.querySelector(".pay-mode");
    let qtyEl = detailsBox.querySelector(".qty");
    let allInput = payMode.querySelectorAll("input");

    //Check Delevery area
    let checkArea = allDeleveryData.find((data) => {
        return data.pincode == userinfo.pincode;
    });
    if (checkArea == undefined) {
        buyBtn.innerHTML = "Oops! Delivery Not Available in your area.";
        buyBtn.disabled = true;
        buyBtn.className = "btn btn-danger text-white"
        payMode.classList.add("d-none")
    }
    else {
        if (checkArea.payment_mode == "All") {
            payMode.classList.remove("d-none");
        }
        else {
            allInput[1].classList.add("d-none");
            allInput[1].nextElementSibling.classList.add("d-none")
        }
    }

    //Check area by PinCode
    checkBtn.onclick = () => {
        let pincode = pinCodeEl.value;
        let checkPin = allDeleveryData.find((data) => data.pincode == pincode)
        if (checkPin == undefined) {
            checkMsg.innerHTML = "Oops! Delivery Not Available in your area.";
            checkMsg.className = "text-danger"
        }
        else {
            checkMsg.innerHTML = checkPin.days
            checkMsg.className = "text-success"
        }
    }

    //Preview images
    for (let img of allSImg) {
        img.onclick = () => {
            let src = img.src;
            pImg.src = src;
            pImg.className = "p-img animate__animated animate__zoomIn";
            setTimeout(() => {
                pImg.className = "p-img";

            }, 500)
        }
    }
    //Place order codeing
    buyBtn.onclick = () => {

        let value;
        let otp = Math.floor(Math.random() * 456123);
        let finalPrice = qtyEl.value * currentProduct.price;
        let updatedQty = currentProduct.quantity - qtyEl.value;

        for (let input of allInput) {
            if (input.checked) {
                value = input.value;
            }
        }
        if (value != undefined) {
            if (value == "cod") {
                currentProduct["quantity"] = updatedQty;
                allProductData[id] = currentProduct;
                allOrderData.unshift({
                    productInfo: currentProduct,
                    userinfo: userinfo,
                    qty: qtyEl.value,
                    finalPrice: finalPrice,
                    paymentMod: value,
                    otp: otp,
                    purchaseDate: new Date(),
                    productId: id,
                    status: "Order Placed",
                });
                insertData("allOrderData", allOrderData);
                insertData("allProductData", allProductData);
                swal("Order Placed", "Check order on Profile", "success")
            }
            else {
                swal("Online not accepted", "Choose Cash on Delivery", "warning")
            }
        }
        else {
            swal("Select Payment Mode", "Select mode", "warining");
        }

    }

}
else {
    window.location = "http://localhost/e-commerce/Pages/login.html"
}