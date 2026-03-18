if (localStorage.getItem("__au__") != null) {
    let username = localStorage.getItem("__au__");
    let mediaBox = document.querySelector(".media-box");
    let allCartProductData = getAllData("allCartProductData")
    let filterData = allCartProductData.filter((data) => data.username)
    filterData.forEach((data, index) => {

        mediaBox.innerHTML += `
    <div class="media d-flex p-3 border mb-3 shadow-lg">
    <div class="media-left"> 
    <img src ="${data.thumb}" widht="100">
    </div>
    <div class="media-body mx-2"> 
    <h5> ${data.title}</h5>
    <span>${data.brand}</span>
    <br>
    <span><i class="fa fa-rupee"></i>${data.price}</span>
    <div class="btn btn-group shadow-sm">
    <button class="btn-danger "><i class="fa fa-trash"></i></button>
    <a href="http://localhost/e-commerce/Pages/buy_product.html?product_id=${data.product_id}" class="btn-primary btn">Buy Now</a>
    </div>
    </div>
    </div>
    
    `;
    })
}
else {
    window.location = "http://localhost/e-commerce/Pages/login.html"
}