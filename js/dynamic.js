//Creating Dynamic navbar
const dynamicNavbarFunc = () => {
    let allCategory = getAllData("allcategoryData");
    console.log(allCategory);
    let dynamiBox = document.querySelector(".dynamic-box");
    // for (let category of allCategory){
    //     alert()
    //     dynamiBox.innerHTML+=`  <li class="nav-item ">
    //                     <a href="#" class="nav-link text-dark fw-bold">${category}</a>
    //                 </li>`;
    // }
    // dynamiBox.innerHTML +=` <div class="btn-group">
    //                     <button class="btn">
    //                         <i class="fa fa-shopping-cart"></i>
    //                     </button>
    //                     <button class="btn">
    //                         <i class="fa fa-search"></i>
    //                     </button>
    //                     <button class="btn">
    //                         <i class="fa fa-user"></i>
    //                     </button>
    //                 </div>`;
}
dynamicNavbarFunc();    