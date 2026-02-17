
window.onload = () => {
    dynamicNavbarFunc();
    createFooterFunc();
}
  //get All branding Data
        let braindingData = getAllData("allBrandingData")
        console.log(braindingData);
        



//Creating Dynamic navbar
const dynamicNavbarFunc = () => {
    let allCategory = getAllData("allcategoryData");
    let dynamicBox = document.querySelector(".dynamic-box");
    let footerCategoryBox = document.querySelector(".footer-category-box");

    for (let category of allCategory) {
        dynamicBox.innerHTML += ` <li class="nav-item ">
                        <a href="#" class="nav-link text-dark fw-bold">${category.category}</a>
                    </li>  `;
                
    }
    dynamicBox.innerHTML += `<div class="btn-group">
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
const createFooterFunc = () =>{
        let allCategory = getAllData("allcategoryData");
        let footerCategoryBox = document.querySelector(".footer-category-box");
         for (let category of allCategory) {
        footerCategoryBox.innerHTML += ` <li class="nav-item ">
                        <a href="#" class="nav-link  fw-bold">${category.category}</a>
                    </li>  `;
                   
    }

}
const dynamicRequest =(element, pageRequest)=>{
    const ajax =new XMLHttpRequest();
    ajax.open ("GET", pageRequest,true);
    ajax.send();
    //get Response
    ajax.onload=()=>{
       element.innerHTML=ajax.response;
  
    }
}
