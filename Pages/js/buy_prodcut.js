if (localStorage.getItem("__au__") != null) {
    let relationbox = document.querySelector(".relation-box")
    let imgbox = document.querySelector(".img-box")
    let detailsBox = document.querySelector(".details-box")
    let url = location.href
    let id = url.split("=")[1];
    let allProductData = getAllData("allProductData");
    let currentProduct = allProductData[id];
    console.log(currentProduct)
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
    <p class="fw-bold"> <i class="fa fa-rupee" ></i>&nbsp; ${currentProduct.price}</p><br>
    <h5>
    Description <br>
    ${currentProduct.description}
    </h5><br>
    <h5>
    Quantity <br>
    <input type="number" class="w-25 form-control" >
    </h5><br>
    <h5>
    Payment Mode <br>
    <input type="radio" value="online" name="pay-mode" > &nbsp; Online
    <input type="radio" value="cod" name="pay-mode" >&nbsp; Cash on Dilevery
    </h5><br>

    
    <h5>
    Check Product Availibilty <br>
    <input type="number" class="form-control" > 
    </h5>
    <button class="btn btn-danger"><i class="fa fa-shoping-cart></i>Add to Cart</button>
    <button class="btn btn-primary"><i class="fa fa-shoping-bag></i> Buy Now </button>
    </div>

    `;

}
else {
    window.location = "http://localhost/e-commerce/Pages/login.html"
}