if (localStorage.getItem("__au__") != null) {
    let email = localStorage.getItem("__au__");

    let relationbox = document.querySelector(".relation-box")
    let imgbox = document.querySelector(".img-box")
    let detailsBox = document.querySelector(".details-box")
    let url = location.href
    let id = url.split("=")[1];
    let allProductData = getAllData("allProductData");
    let allRegistrationData = getAllData("allRegistrationData");
    let allDeleveryData = getAllData("allDeleveryData");
    let currentProduct = allProductData[id];
    let userinfo = allRegistrationData.find((data) => data.email == email)
    console.log(userinfo)

    relationbox.innerHTML += `
        <a href="#"></a>  ${currentProduct.category}
        <a href="#"></a> >> ${currentProduct.brand}
        <a href="#"></a> >> ${currentProduct.title}
        `;
    imgbox.innerHTML = `
        <div class="w-25">
            <img src="${currentProduct.front}" class="border mb-3 " width="100" height="100">
            <img src="${currentProduct.back}" class="border mb-3 " width="100" height="100">
            <img src="${currentProduct.left}" class="border mb-3 " width="100" height="100">
            <img src="${currentProduct.right}" class="border mb-3 " width="100" height="100">
        </div>
        <div class ="w-75 d-flex justify-content-center align-items-center ">
            <img src="${currentProduct.thumb}" class="border mb-3 " width="80%">
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
    <input type="number" class="w-25 form-control" >
    </h5><br>
   
   <div class="pay-mode">
    <h5>
    Payment Mode <br>
    <input type="radio" value="online" name="pay-mode" > <span>&nbsp; Online</span>
    <input type="radio" value="cod" name="pay-mode" ><span>&nbsp; Cash on Dilevery</span>
    </h5>
    </div><br>

    <button class="btn btn-primary buy-btn">
    <i class="fa fa-shoping-bag"></i> Buy Now 
    </button>
    <button class="btn btn-danger cart-btn">
    <i class="fa fa-shoping-cart"></i>Add to Cart
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

    let pinCodeEl = detailsBox.querySelector(".pincode");
    let checkMsg = detailsBox.querySelector(".area-msg");
    let checkBtn = detailsBox.querySelector(".check-btn");
    let buyBtn = detailsBox.querySelector(".buy-btn");
    let payMode = detailsBox.querySelector(".pay-mode");
    let allInput = detailsBox.querySelectorAll("input");
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

}
else {
    window.location = "http://localhost/e-commerce/Pages/login.html"
}