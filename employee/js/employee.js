window.onload = () => {
    collapsFunc();
    DynamicRequestFunc();
    setTimeout(() => {
        togglerFunc();
    }, 100);
}
//Globle Variables
let allcategoryData = [];
let allBrandData = [];
let dy_Link = "";




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
                el.classList.remove("active");
            }
            let link = e.target.getAttribute("access-link");
            dynamicAjaxFunc(link);
            el.classList.add("active");
        }
    }
}
const dynamicAjaxFunc = (link) => {
    dy_Link = link
    let page = document.querySelector(".page");
    let ajax = new XMLHttpRequest();
    ajax.open("GET", link, true);
    ajax.send();
    // get resopnse
    ajax.onload = () => {
        let resoponse = ajax.response;
        page.innerHTML = resoponse;
        if (link == "dynamic/cat_designe.html") {
            createCategoryFunc();
        }
        if (link == "dynamic/brand_designe.html") {
            createBrandFunc();
        }
    }
}
//Start Create Category coding
const createCategoryFunc = () => {
    allcategoryData = getAllData("allcategoryData")
    console.log(allcategoryData)
    let categoryForm = document.querySelector(".category-form");
    let inputBoxEl = document.querySelector(".input-box");
    let addFieldBtn = document.querySelector(".add-field-btn");
    // if (localStorage.getItem("allcategoryData") !== null) {
    //     allcategoryData = JSON.parse(localStorage.getItem("allcategoryData"));
    // }
    //start add field
    addFieldBtn.onclick = () => {
        inputBoxEl.innerHTML += ` <div>
                    <i style="curosr:pointer" class=" fa fa-trash mb-2 del-btn float-end"></i>
                    <input class="form-control mb-3" required placeholder="Category">
                </div>`;
        let allDelBtn = inputBoxEl.querySelectorAll(".del-btn");
        for (let btn of allDelBtn) {
            btn.onclick = (e) => {
                e.target.parentElement.remove();
            }
        }
    }
    //start add category codding
    categoryForm.onsubmit = (e) => {
        e.preventDefault();
        let allinput = categoryForm.querySelectorAll("input");
        for (let input of allinput) {
            allcategoryData.push({
                category: input.value
            });
        }
        insertData("allcategoryData", JSON.stringify(allcategoryData));
        insertMsg();
        readcategorydata();
        categoryForm.reset('');

    }

    readcategorydata();
}
//Read category data
const readcategorydata = () => {
    let categoryList = document.querySelector(".category-list");
    categoryList.innerHTML = "";
    allcategoryData.forEach((data, index) => {
        categoryList.innerHTML += `<tr index="${index}">
                    <td>${index + 1}</td>
                    <td>${data.category}</td>
                    <td>
                        <button class="btn btn-primary px-2 edit-btn "><i class=" fa fa-edit">Edit</i></button>
                        <button class=" d-none btn btn-primary px-2 save-btn "><i class=" fa fa-save ">save</i></button>
                        <button class="btn btn-danger px-2 del-btn "><i class=" fa fa-trash ">Delete</i></button>
                    </td>
                </tr>`;
    });

    //Category Delete Codding
    let allDelBtn = categoryList.querySelectorAll(".del-btn");
    for (let btn of allDelBtn) {
        btn.onclick = () => {
            let parent = btn.parentElement.parentElement;
            let index = parent.getAttribute("index");
            allcategoryData.splice(index, 1);
            deleteAndUpdateFunc("allcategoryData", JSON.stringify(allcategoryData), dy_Link, "Deleted");


        }
    }
    //Category Edit Codding
    let allEditBtn = categoryList.querySelectorAll(".edit-btn");
    for (let btn of allEditBtn) {
        btn.onclick = () => {
            let parent = btn.parentElement.parentElement;
            let index = parent.getAttribute("index");
            let allTD = parent.querySelectorAll("td");
            let saveBtn = parent.querySelector(".save-btn");

            allTD[1].contentEditable = true;
            allTD[1].focus();
            btn.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            //Save Button Coding
            saveBtn.onclick = () => {
                let category = allTD[1].innerHTML
                allcategoryData[index] = {
                    category: category
                }
                deleteAndUpdateFunc("allcategoryData", JSON.stringify(allcategoryData), dy_Link, "Updated");
            }
        }
    }
}
// Start Create Brand coding 
const createBrandFunc = () => {
    allcategoryData = getAllData("allcategoryData");
    allBrandData = getAllData("allBrandData");
    let brandList = document.querySelector(".brand-list");
    let brandForm = document.querySelector(".brand-form");
    let inputBox = brandForm.querySelector(".input-box");
    let allBtn = brandForm.querySelectorAll("button");
    let catdSelect = brandForm.querySelector("select");
    let catSelectList = document.querySelector(".cat-list-select");
    for (let data of allcategoryData) {
        catdSelect.innerHTML += ` <option>${data.category}</option>`;
        catSelectList.innerHTML += ` <option>${data.category}</option>`;
    }
    //add Dynamic Input Field
    allBtn[0].onclick = () => {
        let inputEl = `<div>
                    <i class="fa fa-trash mb-2 float-end del-btn"></i>
                    <input type="text" class="form-control mb-3" placeholder="Brand">
                </div>`;
        inputBox.innerHTML += inputEl;
        //Delete dynamic input
        let allDelBtn = inputBox.querySelectorAll(".del-btn");
        for (let btn of allDelBtn) {
            btn.onclick = () => {
                btn.parentElement.remove();
            }
        }
    }
    //add brand coding
    brandForm.onsubmit = (e) => {
        e.preventDefault();
        let allinput = brandForm.querySelectorAll("input")
        if (catdSelect.value != "choose category") {
            for (let input of allinput) {
                allBrandData.push({
                    category: catdSelect.value,
                    brand: input.value
                })
            }
            insertData("allBrandData", JSON.stringify(allBrandData));
            insertMsg();
            brandForm.reset('');
        }
        else {
            swal("Select Category", "Please select category First", "waring");
        }
    }
    //get brand Data
    catSelectList.onchange = () => {
        brandList.innerHTML ="";
        if (catSelectList.value != "choose category") {
            let filterBrand = allBrandData.filter((data) => {
                return data.category == catSelectList.value
            });
            let index =0;
            for (let brand of filterBrand) {
                brandList.innerHTML += `<tr>
                    <td>${index+1}</td>
                    <td>${brand.category}</td>
                    <td>${brand.brand}</td>
                    <td>
                        <button class="btn btn-primary px-2 "><i class=" fa fa-edit "></i></button>
                        <button class="btn btn-danger px-2 "><i class=" fa fa-trash "></i></button>
                    </td>
                </tr>`;
                index ++;
            }
        }
        else {
            swal("Select Category", "Please select category First", "waring");

        }

    }
}