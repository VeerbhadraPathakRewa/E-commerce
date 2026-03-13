//Show product coding
const showProduct = () => {
    const allProductData = getAllData("allProductData")
    let prodcutList = document.querySelector(".product-list")
    allProductData.forEach((product, index) => {
        prodcutList.innerHTML += `
            <div class="col-md-3 mb-5"align="center">
                <img src="${product.thumb}" class="w-100" alt="">
                <span class="fw-bold">${product.brand}</span><br>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa-regular text-warning fa-star"></i>
                <i class="fa-regular text-warning fa-star"></i>
                <i class="fa-regular text-warning fa-star"></i>
                <br>
                <span class="fw-bold">${product.title}</span>
                <span>
                    <i class="fa fa-indian-rupee-sign"></i>
                    ${product.price}
                </span>
                <br>
                <button index="${index}" class="cart-btn btn btn-danger mt-3"><i class="fa-solid fa-cart-shopping"></i>Add to Cart</button>
                <a href="http://localhost/e-commerce/Pages/buy_product.html?product_id=${index}" index="${index}" class="btn btn-primary mt-3"><i class="fa fa-bag-shopping"></i>Buy Now</a>
            </div>`

    });
    addToCart();
}
showProduct();
//category Showcase coding
const showCategory = () => {
    const allshowcaseData = getAllData("allShowcaseData");
    let categoryList = document.querySelector(".category-list");
    let tLeftImg = "common/images/a.jpg";
    let tLeftLabel = "";

    let bLeftImg = "common/images/a.jpg";
    let bLeftLabel = "";

    let centerImg = "common/images/b.jpg";
    let centerLabel = "";

    let bRightImg = "common/images/a.jpg";
    let bRightLabel = "";

    let tRightImg = "common/images/a.jpg";
    let tRightLabel = "";
    let i;
    for (i = 0; i < allshowcaseData.length; i++) {
        if (allshowcaseData[i].direction == "top-left") {
            tLeftImg = allshowcaseData[i].image;
            tLeftLabel = allshowcaseData[i].label;
        }
        else if (allshowcaseData[i].direction == "bottom-left") {
            bLeftImg = allshowcaseData[i].image;
            bLeftLabel = allshowcaseData[i].label;
        }
        else if (allshowcaseData[i].direction == "center") {
            centerImg = allshowcaseData[i].image;
            centerLabel = allshowcaseData[i].label;
        }
        else if (allshowcaseData[i].direction == "bottom-right") {
            bRightImg = allshowcaseData[i].image;
            bRightLabel = allshowcaseData[i].label;
        }
        else if (allshowcaseData[i].direction == "top-right") {
            tRightImg = allshowcaseData[i].image;
            tRightLabel = allshowcaseData[i].label;
        }
    }

    categoryList.innerHTML += `
            <div class="col-md-4">
                <div class="position-relative mb-5">
                    <button class="btn border p-2 bg-white" style="position: absolute; top: 50%; left: 50%; transform: translate(-5%,-50%);">${tLeftLabel}</button>
                    <img src="${tLeftImg}" alt="">
                </div>
                <div class="position-relative mb-5">
                    <button class="btn border p-2 bg-white" style="position: absolute; top: 50%; left: 50%; transform: translate(-85%,-50%);">${bLeftLabel}</button>
                    <img src="${bLeftImg}" alt="">
                </div>
            </div>
            <div class="col-md-4">
                <div class="position-relative mb-5">
                    <button class="btn border p-2 bg-white" style="position: absolute; top: 50%; left: 50%; transform: translate(-85%,-50%);">${centerLabel}</button>
                    <img src="${centerImg}" alt="">
                </div>
            </div>
            <div class="col-md-4">
                <div class="position-relative mb-5">
                    <button class="btn border p-2 bg-white" style="position: absolute; top: 50%; left: 50%; transform: translate(-85%,-50%);">${tRightLabel}</button>
                    <img src="${tRightImg}" alt="">
                </div>
                <div class="position-relative mb-5">
                    <button class="btn border p-2 bg-white" style="position: absolute; top: 50%; left: 50%; transform: translate(-85%,-50%);">${bRightLabel}</button>
                    <img src="${bRightImg}" alt="">
                </div>
            </div>



`;
}
showCategory();
//carousel Coding
const createCarouselFunc = () => {
    let textAlign = "";
    let carouselInner = document.querySelector(".carousel-inner")
    const allHeaderShowcase = getAllData("allHeaderShowcase");
    if (allHeaderShowcase.length > 0) {
        for (let data of allHeaderShowcase) {
            if (data.h_align == "center") {
                textAlign = "text-start"
            }
            else {
                textAlign = "text-start"
            }
            carouselInner.innerHTML += `
            <div class="carousel-item ">
                <img src="${data.titleImage}" alt="LA" class="d-block">
                <div class="carousel-caption h-100 d-flex" style="justify-content:${data.h_align};align-items:${data.v_align}">
                <div>
                  <h1 style="color:${data.titleColor}; font-size:"${data.titleSize}">${data.titleText}</h1>
                  <h4 style="color:${data.subTitleColor}; font-size:"${data.subTitleSize}">${data.subTitleText}</h4>
               <div>
               ${data.button}
               
                </div>
                  </div>
                
                </div>
            </div>
            `;
        }

        carouselInner.innerHTML += `
            <button class="carousel-control-prev" type="button"data-bs-target="#demo" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button"data-bs-target="#demo" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            </button>
        `;
        document.querySelector(".carousel-item").classList.add("active");
    }
}
createCarouselFunc();