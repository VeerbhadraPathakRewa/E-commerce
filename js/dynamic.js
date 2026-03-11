setTimeout(() => {
    dynamicNavbarFunc();
    createFooterFunc();
}, 500)


//get All branding Data
let braindingData = getAllData("allBrandingData")
let regData = getAllData("allRegistrationData")

//Creating Dynamic navbar
const dynamicNavbarFunc = () => {
    let allCategory = getAllData("allcategoryData");
    let dynamicBox = document.querySelector(".dynamic-box");
    let brandLogo = document.querySelector(".brand-logo");
    let brandName = document.querySelector(".brand-name");

    for (let category of allCategory) {
        dynamicBox.innerHTML += ` <li class="nav-item ">
                        <a href="#" class="nav-link text-dark fw-bold">${category.category}</a>
                    </li>  `;

    }
    dynamicBox.innerHTML += `
     <div class="btn-group">
                    <button class="btn">
                        <i class="fa fa-shopping-cart"></i>
                        <div style="position: absolute; top: -10px; left: 20px;width: 25px;height: 25px;border-radius:25%; background-color: red; color: white;">
                            <span class="count-cart">0</span>
                        </div>
                    </button>
                    <button class="btn">
                        <i class="fa fa-search"></i>
                    </button>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle " data-bs-toggle="dropdown">
                            <i class="fa fa-user"></i>
                        </button>
                        <ul class="dropdown-menu menu-box">
                            
                        </ul>
                    </div>

                </div>            
    
    `;
    brandLogo.src = braindingData[0].b_logo;
    brandName.innerHTML = braindingData[0].b_name;
    //User dropdown menu
    let menuBox = document.querySelector(".menu-box")
    if (localStorage.getItem("__au__") != null) {
        let email = localStorage.getItem("__au__");
        let currentData = regData.filter((data) => data.email == email);
        menuBox.innerHTML = `<li><a href="#" class="drowpdown-item">
                                    <i class="fa fa-user"></i>${currentData[0].fullname}</a></li>
                            <li><a href="#" class="drowpdown-item logout-btn">
                                    <i class="fa-solid fa-right-from-bracket"></i>LogOut</a></li>`;
        let logoutBtn = document.querySelector(".logout-btn");
        logoutBtn.onclick = (e) => {
            e.preventDefault()
            localStorage.removeItem("__au__");
            setTimeout(() => {
                window.location = "http://localhost/e-commerce"
            }, 400)
        }
    }
    else {
        menuBox.innerHTML = `<li><a href="http://localhost/e-commerce/Pages/signup.html" class="drowpdown-item">
                                    <i class="fa fa-user"></i>SignUp</a></li>
                            <li><a href="http://localhost/e-commerce/Pages/login.html" class="drowpdown-item">
                                    <i class="fa-solid fa-right-from-bracket"></i>LogIn</a></li>`;


    }
    countCart();
}
const createFooterFunc = () => {

    let venueBox = document.querySelector(".venue-box");
    let socialMeadiaBox = document.querySelector(".social-media-box");
    let allAtag = socialMeadiaBox.querySelectorAll("a");
    let allPTag = venueBox.querySelectorAll("p");
    let allCategory = getAllData("allcategoryData");
    let footerCategoryBox = document.querySelector(".footer-category-box");
    for (let category of allCategory) {
        footerCategoryBox.innerHTML += ` <li class="nav-item ">
                        <a href="#" class="nav-link  fw-bold">${category.category}</a>
                    </li>  `;

    }
    //Social Meadia link updating
    allAtag[0].href = braindingData[0].b_facebook;
    allAtag[1].href = braindingData[0].b_twitter;
    allAtag[2].href = braindingData[0].b_whatsapp;
    allAtag[3].href = braindingData[0].b_instagram;
    //Venue Updating
    allPTag[0].innerHTML += braindingData[0].b_email;
    allPTag[1].innerHTML += braindingData[0].b_address;
    allPTag[2].innerHTML += braindingData[0].b_mobile;
    allPTag[3].innerHTML += braindingData[0].b_domain;

}
const dynamicRequest = (element, pageRequest) => {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", pageRequest, true);
    ajax.send();
    //get Response
    ajax.onload = () => {
        element.innerHTML = ajax.response;

    }
}
//add to cart coding
const addToCart = () => {
    let allCartProductData = [];
    allCartProductData = getAllData("allCartProductData");
    let allProductData = getAllData("allProductData");
    let allCartBtn = document.querySelectorAll(".cart-btn");
    for (let btn of allCartBtn) {
        btn.onclick = () => {
            if (localStorage.getItem("__au__") != null) {
                let username = localStorage.getItem("__au__");
                let index = btn.getAttribute("index");
                let cartProduct = allProductData[index];
                cartProduct["product_id"] = index;
                cartProduct["username"] = username;

                let checkProduct = allCartProductData.find((data) => {
                    return data.product_id == index && data.username == username;
                });
                if (checkProduct == undefined) {
                    allCartProductData.push(cartProduct);
                    insertData("allCartProductData", (allCartProductData))
                    swal("Cart Added!", "Please check on Cart", "success");
                    countCart();
                }
                else {
                    swal("Already in cart", "Please Check you Cart", "warning");
                }

                console.log(checkProduct);
            }
            else {
                window.location = "http://localhost/e-commerce/Pages/login.html";
            }
        }
    }
}

const countCart = () => {
    let countCartEl = document.querySelector(".count-cart")
    let allCartProductData = getAllData("allCartProductData");
    if (localStorage.getItem("__au__") != null) {
        let username = localStorage.getItem("__au__")
        let filterCart = allCartProductData.filter((data) => data.username == username)
        countCartEl.innerHTML = filterCart.length;
    }


}
