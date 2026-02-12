//Creating Dynamic navbar
const dynamicNavbarFunc = () => {
    let allCategory = getAllData("allcategoryData");
    let dynamiBox = document.querySelector(".dynamic-box");
    let footerCategoryBox = document.querySelector(".footer-category-box");
    dynamiBox.innerHTML = "";
    for (let item of allCategory) {
        dynamiBox.innerHTML += `  <li class="nav-item ">
                    <a href="#" class="nav-link text-dark fw-bold">${item.category}</a>
                </li>`;
    }
    for (let item of allCategory) {
        footerCategoryBox.innerHTML += `  <li class="nav-item ">
                    <a href="#" class="nav-link fw-bold">${item.category}</a>
                </li>`;
    }
    dynamiBox.innerHTML += ` <div class="btn-group">
                    <button class="btn">
                        <i class="fa fa-shopping-cart"></i>
                    </button>
                    <button class="btn">
                        <i class="fa fa-search"></i>
                    </button>
                    <button class="btn">
                        <i class="fa fa-user"></i>
                    </button>
                </div>`;
}
dynamicNavbarFunc();    
