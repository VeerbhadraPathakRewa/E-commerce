window.onload = () => {
    collapsFunc();
    DynamicRequestFunc();
setTimeout (()=>{
    togglerFunc();
    
},100);
}
// toggler 
//   const togglerFunc = () => {
//             let togglerBtn = document.querySelector(".toggler-btn");
//             let sideNav = document.querySelector(".side-nav");
//             let page = document.querySelector(".page");
//             console.log(togglerBtn);
//             togglerBtn.onclick = () => {
//         //    alert()
//                 let open = sideNav.classList.contains("side-nav-open");
//                 if (open == true) {
//                     sideNav.classList.remove("side-nav-open");
//                     sideNav.classList.add("side-nav-close");
//                     page.classList.remove("page-open");
//                     page.classList.add("page-close");
//                 }
//                 else {
//                     sideNav.classList.add("side-nav-open");
//                     sideNav.classList.remove("side-nav-close");
//                     page.classList.add("page-open");
//                     page.classList.remove("page-close");
//                 }
//             }
//         }
        



//Start Collaps Codding
const collapsFunc = () => {
    let collapseBtn = document.querySelector(".collapse-btn");
    collapseBtn.onclick = function () {
        const ul = this.nextElementSibling;
        ul.classList.toggle("show");
    }
}
//Dynamic Request coding
const DynamicRequestFunc = () => {
    let activeEl = document.querySelector(".active");
    let activeLink = activeEl.getAttribute("access-link");
    dynamicAjaxFunc(activeLink);

    let allCollapsBtn = document.querySelectorAll(".collapse-item");
    for (let el of allCollapsBtn) {
        el.onclick = (e) => {
            for (let el of allCollapsBtn) {
                el.classList.remove("active")
            }
            let link = e.target.getAttribute("access-link");
            dynamicAjaxFunc(link);
            el.classList.add("active")
        }
    }
}

const dynamicAjaxFunc = (link) => {
    let page = document.querySelector(".page")
    let ajax = new XMLHttpRequest();
    ajax.open("GET", link, true);
    ajax.send()

    // get resopnse
    ajax.onload = () => {
        let resoponse = ajax.response;
        page.innerHTML = resoponse;
        if (link == "dynamic/cat_designe.html") {
            createCategoryFunc();
        }
    }
}
//Start Create Category
const createCategoryFunc = () => {
    let inputBoxEl = document.querySelector(".input-box");
    let addFieldBtn = document.querySelector(".add-field-btn");
    addFieldBtn.onclick = () => {

        inputBoxEl.innerHTML += ` <div>
                    <i style="curosr:pointer" class=" fa fa-trash mb-2 del-btn float-end"></i>
                    <input class="form-control mb-3" placeholder="Category">
                </div>`;
        let allDelBtn = inputBoxEl.querySelectorAll(".del-btn");
        for (let btn of allDelBtn) {
            btn.onclick = (e) => {
                e.target.parentElement.remove();
            }
        }
    }
}
