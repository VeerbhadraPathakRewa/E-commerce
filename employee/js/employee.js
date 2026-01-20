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
let allProductData = [];
let dy_Link = "";
let thumb = "";
let front = "";
let back = "";
let right = "";
let left = "";



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
//Ajax Request coding
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
        if (link == "dynamic/product_designe.html") {
            createProductFunc();
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
                        <button class="btn btn-primary px-2 edit-btn "><i class=" fa fa-edit"> </i></button>
                        <button class=" d-none btn btn-primary px-2 save-btn "><i class=" fa fa-save "> </i></button>
                        <button class="btn btn-danger px-2 del-btn "><i class=" fa fa-trash "> </i></button>
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
        let id = 0;
        let filterBrand = [];
        if (catSelectList.value != "choose category") {
            for (let brand of allBrandData) {
                if (brand.category == catSelectList.value) {
                    brand["id"] = id;
                    filterBrand.push(brand);
                }
                id++;
            }
            readBrandFunc(filterBrand);


        }
        else {
            swal("Select Category", "Please select category First", "waring");

        }

    }
}
//Read Brand coding
const readBrandFunc = (filterBrand) => {
    let index = 0;
    let brandList = document.querySelector(".brand-list");
    brandList.innerHTML = "";

    for (let brand of filterBrand) {
        brandList.innerHTML += `<tr id ="${brand.id}" index ="${index}">
                    <td>${index + 1}</td>
                    <td>${brand.category}</td>
                    <td>${brand.brand}</td>
                    <td>
                        <button class="btn btn-primary edit-btn px-2 "><i class=" fa fa-edit ">Edit</i></button>
                        <button class="btn btn-primary save-btn d-none px-2 "><i class=" fa fa-save ">save</i></button>
                        <button class="btn btn-danger del-btn px-2 "><i class=" fa fa-trash "></i></button>
                    </td>
                </tr>`;
        index++;
    }

    //start delete brand coding
    let allDelBtn = brandList.querySelectorAll(".del-btn");
    for (let btn of allDelBtn) {
        btn.onclick = () => {
            let parent = btn.parentElement.parentElement;
            let index = parent.getAttribute("index");
            let id = parent.getAttribute("id");
            allBrandData.splice(id, 1);
            filterBrand.splice(index, 1);
            deleteAndUpdateFunc("allBrandData", JSON.stringify(allBrandData), dy_Link, "Deleted", filterBrand);

        }
    }

    //Start update brand coding
    let allEditBtn = brandList.querySelectorAll(".edit-btn");
    for (let btn of allEditBtn) {
        btn.onclick = () => {
            let parent = btn.parentElement.parentElement;
            let id = parent.getAttribute("id");
            let index = parent.getAttribute("index")
            let allTd = parent.querySelectorAll("td");
            let saveBtn = parent.querySelector(".save-btn");
            allTd[2].contentEditable = true;
            allTd[2].focus();
            btn.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            saveBtn.onclick = () => {
                let category = allTd[1].innerHTML;
                let brand = allTd[2].innerHTML
                allBrandData[id] = {
                    category: category,
                    brand: brand
                }
                filterBrand[index] = {
                    category: category,
                    brand: brand,
                    id: id
                }
                deleteAndUpdateFunc("allBrandData", JSON.stringify(allBrandData), dy_Link, "Updated", filterBrand)
            }
        }
    }
}
//Start Create Product coding
const createProductFunc = () => {
    allcategoryData = getAllData("allcategoryData");
    allBrandData = getAllData("allBrandData");
    allProductData = getAllData("allProductData");
    let productForm = document.querySelector(".product-form");
    let catListSelect = document.querySelector(".category-list-select");
    let brandListSelect = document.querySelector(".brand-list-select");
    let allSelect = productForm.querySelectorAll("select");
    let allInput = productForm.querySelectorAll("input");
    let textareaEl = productForm.querySelector("textarea");
    //Read Category for Form
    for (let category of allcategoryData) {
        allSelect[0].innerHTML += `
        <option>${category.category}</option><br> 
        `;
        catListSelect.innerHTML += `
        <option>${category.category}</option>
        `;
    }
    //Read Brand for Form
    allSelect[0].onchange = () => {
        allSelect[1].innerHTML = ' <option value="choose category">Choose Brand</option>';
        if (allSelect[0].value != "choose category") {
            let fileterBrand = allBrandData.filter((brand) => brand.category == allSelect[0].value)
            for (let brand of fileterBrand) {
                allSelect[1].innerHTML += `<option>${brand.brand}</option>`;
            }
        }
        else {
            swal("Choose Category!", "Please Select Category First", "warning");
        }

    }
    //Read brand for List
    catListSelect.onchange = () => {
        brandListSelect.innerHTML = ' <option value="choose category">Choose Brand</option>';
        if (catListSelect.value != "choose category") {
            let fileterBrand = allBrandData.filter((brand) => brand.category == catListSelect.value)
            for (let brand of fileterBrand) {
                brandListSelect.innerHTML += `<option>${brand.brand}</option>`;
            }
        }
        else {
            swal("Choose Category!", "Please Select Category First", "warning");
        }
    }
    //Read Image Binary
    let fReader = new FileReader();
    //Read thumb
    allInput[3].onchange = () => {
        fReader.onload = (e) => {
            thumb = e.target.result;
        }
        fReader.readAsDataURL(allInput[3].files[0]);
    }
    //Read front
    allInput[4].onchange = () => {
        fReader.onload = (e) => {
            front = e.target.result;
        }
        fReader.readAsDataURL(allInput[4].files[0]);
    }
    //Read back
    allInput[5].onchange = () => {
        fReader.onload = (e) => {
            back = e.target.result;
        }
        fReader.readAsDataURL(allInput[5].files[0]);
    }
    //Read right
    allInput[6].onchange = () => {
        fReader.onload = (e) => {
            right = e.target.result;
        }
        fReader.readAsDataURL(allInput[6].files[0]);
    }
    //Read left
    allInput[7].onchange = () => {
        fReader.onload = (e) => {
            left = e.target.result;
        }
        fReader.readAsDataURL(allInput[7].files[0]);
    }
    //Create Product coding
    productForm.onsubmit = (e) => {
        e.preventDefault();
        if (allSelect[1].value != "choose brand") {
            allProductData.push({
                category: allSelect[0].value,
                brand: allSelect[1].value,
                title: allInput[0].value,
                description: textareaEl.value,
                price: allInput[1].value,
                quantity: allInput[2].value,
                thumb: thumb != "" ? thumb : "../common/images/a.png",
                front: front != "" ? front : "../common/images/a.png",
                back: back != "" ? back : "../common/images/a.png",
                right: right != "" ? right : "../common/images/a.png",
                left: left != "" ? left : "../common/images/a.png",

            });
            insertData("allProductData", JSON.stringify(allProductData))
            swal("Data Inserted", "Check Product List", "success");

        }
        else {
            swal("Select Brand!", "Please Choose brand First", "waring")
        }
    }
    //Read Product
    brandListSelect.onchange = function () {
        if (this.value != "choose brand") {
            let id = 0;
            let filterProdcut = [];
            for (let product of allProductData) {
                if (product.category == catListSelect.value && product.brand == this.value) {
                    product["id"] = id;
                    filterProdcut.push(product);
                }
                id++;
            }
            readProductFunc(filterProdcut)

        }
        else {
            swal("Select Brand!", "Please Choose any brand First", "warning");
        }
    }
}
//Read Product Coding
const readProductFunc = (filterProdcut) => {
    let brandList = document.querySelector(".brand-list");
    brandList.innerHTML = "";
    filterProdcut.forEach((product, index) => {
        console.log(product)
        brandList.innerHTML += `<tr id="${product.id}" index="${index}">
                                <td class="text-nowrap">${index + 1}</td>
                                <td class="text-nowrap">${product.category}</td>
                                <td class="text-nowrap">${product.brand}</td>
                                <td class="text-nowrap">${product.title}</td>
                                <td class="text-nowrap">${product.description}</td>
                                <td class="text-nowrap">${product.price}</td>
                                <td class="text-nowrap">${product.quantity}</td>
                                <td class="text-nowrap">
                                    <img src="${product.thumb}" width="50px" alt="">
                                </td>
                                <td class="text-nowrap">
                                    <img src="${product.front}" width="50px" alt="">
                                </td>
                                <td class="text-nowrap">
                                    <img src="${product.back}" width="50px" alt="">
                                </td>
                                <td class="text-nowrap">
                                    <img src="${product.right}" width="50px" alt="">
                                </td>
                                <td class="text-nowrap">
                                    <img src="${product.left}" width="50px" alt="">
                                </td>
                                <td class="text-nowrap">
                                    <button class="btn btn-primary p-1 mx-2"> <i class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger p-1 mx-2"> <i class="fa fa-trash"></i></button>
                                </td>
                            </tr>`;
    });
}