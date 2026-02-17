window.onload = () => {
    collapsFunc();
    DynamicRequestFunc();

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
let brand_logo = "";



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
        else if (link == "dynamic/brand_designe.html") {
            createBrandFunc();
        }
        else if (link == "dynamic/product_designe.html") {
            createProductFunc();
        }
        else if (link == "dynamic/branding_designe.html") {
            createBrandingFunc();
        }
    }
}
//Start Create Category coding
const createCategoryFunc = () => {
    allcategoryData = getAllData("allcategoryData")
    console.log(allcategoryData);
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
        insertData("allcategoryData", allcategoryData);
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

    // 🔥 CHANGE HERE (clear पहले options नहीं हट रहे थे)
    catdSelect.innerHTML = `<option>choose category</option>`;
    catSelectList.innerHTML = `<option>choose category</option>`;

    for (let data of allcategoryData) {
        catdSelect.innerHTML += `<option>${data.category}</option>`;      // 🔥 CHANGE HERE (backticks missing the)
        catSelectList.innerHTML += `<option>${data.category}</option>`;  // 🔥 CHANGE HERE (backticks missing the)
    }

    // add Dynamic Input Field
    allBtn[0].onclick = () => {

        let inputEl = `
            <div>
                <i class="fa fa-trash mb-2 float-end del-btn"></i>
                <input type="text" class="form-control mb-3" placeholder="Brand">
            </div>
        `;   // 🔥 CHANGE HERE (template literal missing)

        inputBox.innerHTML += inputEl;

        // Delete dynamic input
        let allDelBtn = inputBox.querySelectorAll(".del-btn");
        for (let btn of allDelBtn) {
            btn.onclick = () => {
                btn.parentElement.remove();
            }
        }
    }

    // add brand coding
    brandForm.onsubmit = (e) => {

        e.preventDefault();
        let allinput = brandForm.querySelectorAll("input");

        if (catdSelect.value != "choose category") {

            for (let input of allinput) {

                if (input.value.trim() !== "") {   // 🔥 CHANGE HERE (empty brand prevent)
                    allBrandData.push({
                        category: catdSelect.value,
                        brand: input.value.trim()
                    });
                }
            }

            insertData("allBrandData", allBrandData);  // 🔥 CHANGE HERE (remove JSON.stringify)

            insertMsg();
            brandForm.reset();

        } else {
            swal("Select Category", "Please select category First", "warning");  // 🔥 CHANGE HERE (waring → warning)
        }
    }

    // get brand Data
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

        } else {
            swal("Select Category", "Please select category First", "warning");  // 🔥 CHANGE HERE
        }
    }
}

// Read Brand coding
const readBrandFunc = (filterBrand) => {

    let brandList = document.querySelector(".brand-list");
    brandList.innerHTML = "";

    // Always get fresh data
    let allBrandData = getAllData("allBrandData");

    filterBrand.forEach((brand, index) => {

        brandList.innerHTML += `
            <tr data-index="${index}">
                <td>${index + 1}</td>
                <td>${brand.category}</td>
                <td>${brand.brand}</td>
                <td>
                    <button class="btn btn-primary edit-btn px-2">Edit</button>
                    <button class="btn btn-primary save-btn d-none px-2">Save</button>
                    <button class="btn btn-danger del-btn px-2">Delete</button>
                </td>
            </tr>
        `;
    });

    /* ================= DELETE ================= */

    let allDelBtn = brandList.querySelectorAll(".del-btn");

    allDelBtn.forEach(btn => {

        btn.onclick = () => {

            let row = btn.closest("tr");
            let index = Number(row.getAttribute("data-index"));

            let selectedCategory = filterBrand[index].category;
            let selectedBrand = filterBrand[index].brand;

            // Remove from main array
            allBrandData = allBrandData.filter(item =>
                !(item.category === selectedCategory && item.brand === selectedBrand)
            );

            insertData("allBrandData", allBrandData);

            // Refresh UI
            row.remove();
        };
    });


    /* ================= EDIT / UPDATE ================= */

    let allEditBtn = brandList.querySelectorAll(".edit-btn");

    allEditBtn.forEach(btn => {

        btn.onclick = () => {

            let row = btn.closest("tr");
            let index = Number(row.getAttribute("data-index"));

            let tds = row.querySelectorAll("td");
            let saveBtn = row.querySelector(".save-btn");

            tds[2].contentEditable = true;
            tds[2].focus();

            btn.classList.add("d-none");
            saveBtn.classList.remove("d-none");

            saveBtn.onclick = () => {

                let updatedBrand = tds[2].innerText.trim();
                let category = tds[1].innerText.trim();

                if (updatedBrand === "") return;

                // Update main array
                allBrandData = allBrandData.map(item => {

                    if (item.category === filterBrand[index].category &&
                        item.brand === filterBrand[index].brand) {

                        return {
                            category: category,
                            brand: updatedBrand
                        };
                    }

                    return item;
                });

                insertData("allBrandData", allBrandData);

                // Lock again
                tds[2].contentEditable = false;
                saveBtn.classList.add("d-none");
                btn.classList.remove("d-none");

                // Update filterBrand also
                filterBrand[index].brand = updatedBrand;
            };
        };
    });
};

//Start Create Product coding
const createProductFunc = () => {

    let allcategoryData = getAllData("allcategoryData") || [];
    let allBrandData = getAllData("allBrandData") || [];
    let allProductData = getAllData("allProductData") || [];

    let productForm = document.querySelector(".product-form");
    let allSelect = productForm.querySelectorAll("select");
    let allInput = productForm.querySelectorAll("input");
    let textareaEl = productForm.querySelector("textarea");

    let catListSelect = document.querySelector(".category-list-select");
    let brandListSelect = document.querySelector(".brand-list-select");

    // 🔥 FIX 1: reset dropdown before append
    allSelect[0].innerHTML = `<option value="choose category">Choose Category</option>`;
    catListSelect.innerHTML = `<option value="choose category">Choose Category</option>`;

    /* ================= READ CATEGORY ================= */

    for (let category of allcategoryData) {
        allSelect[0].innerHTML += `<option>${category.category}</option>`;
        catListSelect.innerHTML += `<option>${category.category}</option>`;
    }

    /* ================= CATEGORY CHANGE (FORM) ================= */

    allSelect[0].onchange = () => {

        allSelect[1].innerHTML = `<option value="choose brand">Choose Brand</option>`;

        if (allSelect[0].value !== "choose category") {

            let filterBrand = allBrandData.filter(
                brand => brand.category === allSelect[0].value
            );

            filterBrand.forEach(brand => {
                allSelect[1].innerHTML += `<option>${brand.brand}</option>`;
            });

        } else {
            swal("Choose Category!", "Please Select Category First", "warning");
        }
    };

    /* ================= CATEGORY CHANGE (LIST FILTER) ================= */

    catListSelect.onchange = () => {

        brandListSelect.innerHTML = `<option value="choose brand">Choose Brand</option>`;

        if (catListSelect.value !== "choose category") {

            let filterBrand = allBrandData.filter(
                brand => brand.category === catListSelect.value
            );

            filterBrand.forEach(brand => {
                brandListSelect.innerHTML += `<option>${brand.brand}</option>`;
            });

        } else {
            swal("Choose Category!", "Please Select Category First", "warning");
        }
    };

    /* ================= IMAGE VARIABLES FIX ================= */

    let thumb = "";
    let front = "";
    let back = "";
    let right = "";
    let left = "";

    const readImage = (input, callback) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => callback(e.target.result);
            reader.readAsDataURL(input.files[0]);
        }
    };

    allInput[3].onchange = () => readImage(allInput[3], (res) => thumb = res);
    allInput[4].onchange = () => readImage(allInput[4], (res) => front = res);
    allInput[5].onchange = () => readImage(allInput[5], (res) => back = res);
    allInput[6].onchange = () => readImage(allInput[6], (res) => right = res);
    allInput[7].onchange = () => readImage(allInput[7], (res) => left = res);

    /* ================= CREATE PRODUCT ================= */

    productForm.onsubmit = (e) => {

        e.preventDefault();

        if (allSelect[1].value !== "choose brand") {

            allProductData.push({
                id: Date.now(), // 🔥 UNIQUE ID FIX
                category: allSelect[0].value,
                brand: allSelect[1].value,
                title: allInput[0].value,
                description: textareaEl.value,
                price: allInput[1].value,
                quantity: allInput[2].value,
                thumb: thumb || "../common/images/a.png",
                front: front || "../common/images/a.png",
                back: back || "../common/images/a.png",
                right: right || "../common/images/a.png",
                left: left || "../common/images/a.png",
            });

            // 🔥 FIX 2: remove JSON.stringify
            insertData("allProductData", allProductData);

            swal("Data Inserted", "Check Product List", "success");

            productForm.reset();

        } else {
            swal("Select Brand!", "Please Choose Brand First", "warning");
        }
    };

    /* ================= READ PRODUCT FILTER ================= */

    brandListSelect.onchange = function () {

        if (this.value !== "choose brand") {

            let filterProduct = allProductData.filter(product =>
                product.category === catListSelect.value &&
                product.brand === this.value
            );

            readProductFunc(filterProduct);

        } else {
            swal("Select Brand!", "Please Choose Any Brand First", "warning");
        }
    };
};

//Read Product Coding
const readProductFunc = (filterProduct) => {

    let productForm = document.querySelector(".product-form");
    let allSelect = productForm.querySelectorAll("select");
    let allBtn = productForm.querySelectorAll("button");
    let allInput = productForm.querySelectorAll("input");
    let textareaEl = productForm.querySelector("textarea");
    let brandList = document.querySelector(".brand-list");

    let allProductData = getAllData("allProductData") || [];

    brandList.innerHTML = "";

    /* ================= TABLE RENDER ================= */

    filterProduct.forEach((product, index) => {

        brandList.innerHTML += `
            <tr data-id="${product.id}">
                <td>${index + 1}</td>
                <td>${product.category}</td>
                <td>${product.brand}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td><img src="${product.thumb}" width="50"></td>
                <td><img src="${product.front}" width="50"></td>
                <td><img src="${product.back}" width="50"></td>
                <td><img src="${product.right}" width="50"></td>
                <td><img src="${product.left}" width="50"></td>
                <td>
                    <button class="btn btn-primary edit-btn p-1 mx-2">Edit</button>
                    <button class="btn btn-danger del-btn p-1 mx-2">Delete</button>
                </td>
            </tr>
        `;
    });

    /* ================= DELETE ================= */

    let allDelBtn = brandList.querySelectorAll(".del-btn");

    allDelBtn.forEach(btn => {

        btn.onclick = () => {

            let row = btn.closest("tr");
            let id = Number(row.getAttribute("data-id"));

            // 🔥 FIX: filter by id instead of splice
            allProductData = allProductData.filter(product => product.id !== id);

            insertData("allProductData", allProductData);

            row.remove();

            swal("Deleted!", "Product Removed Successfully", "success");
        };
    });

    /* ================= EDIT ================= */

    let allEditBtn = brandList.querySelectorAll(".edit-btn");

    allEditBtn.forEach(btn => {

        btn.onclick = () => {

            let row = btn.closest("tr");
            let id = Number(row.getAttribute("data-id"));

            let product = allProductData.find(p => p.id === id);

            if (!product) return;

            // Fill Form
            allSelect[0].value = product.category;
            allSelect[1].value = product.brand;

            allSelect[0].disabled = true;
            allSelect[1].disabled = true;

            allInput[0].value = product.title;
            textareaEl.value = product.description;
            allInput[1].value = product.price;
            allInput[2].value = product.quantity;

            let thumb = product.thumb;
            let front = product.front;
            let back = product.back;
            let right = product.right;
            let left = product.left;

            allBtn[0].classList.add("d-none");
            allBtn[1].classList.remove("d-none");

            /* ================= UPDATE ================= */

            allBtn[1].onclick = () => {

                allProductData = allProductData.map(p => {

                    if (p.id === id) {
                        return {
                            id: id,  // 🔥 preserve id
                            category: allSelect[0].value,
                            brand: allSelect[1].value,
                            title: allInput[0].value,
                            description: textareaEl.value,
                            price: allInput[1].value,
                            quantity: allInput[2].value,
                            thumb: thumb,
                            front: front,
                            back: back,
                            right: right,
                            left: left,
                        };
                    }

                    return p;
                });

                insertData("allProductData", allProductData);

                swal("Updated!", "Product Updated Successfully", "success");

                allBtn[0].classList.remove("d-none");
                allBtn[1].classList.add("d-none");

                allSelect[0].disabled = false;
                allSelect[1].disabled = false;

                productForm.reset();

                readProductFunc(allProductData);
            };
        };
    });
};

//Create branding Details coding
const createBrandingFunc = () => {

    let brandingForm = document.querySelector(".branding-form");
    if (!brandingForm) return;

    let allInput = brandingForm.querySelectorAll("input");
    let allTextArea = brandingForm.querySelectorAll("textarea");
    let lengthCountTextArea = brandingForm.querySelectorAll(".textarea");
    let allBtn = brandingForm.querySelectorAll("button");
    let editBrandBtn = document.querySelector(".edit-branding-btn");

    let brand_logo = "";

    /* ================= TEXTAREA LENGTH COUNT ================= */

    lengthCountTextArea.forEach(textarea => {
        textarea.oninput = () => {
            let span = textarea.parentElement.querySelector("span");
            if (span) span.innerHTML = textarea.value.length;
        };
    });

    /* ================= LOGO UPLOAD ================= */

    allInput[1].onchange = () => {

        if (allInput[1].files && allInput[1].files[0]) {

            let fReader = new FileReader();

            fReader.onload = (e) => {
                brand_logo = e.target.result;
            };

            fReader.readAsDataURL(allInput[1].files[0]);
        }
    };

    /* ================= INSERT / UPDATE ================= */

    brandingForm.onsubmit = (e) => {

        e.preventDefault();

        let allBrandingData = getAllData("allBrandingData") || [];

        // 🔥 Preserve old logo if not changed
        if (allBrandingData.length > 0 && !brand_logo) {
            brand_logo = allBrandingData[0].b_logo;
        }

        let brandingObject = {
            b_name: allInput[0].value.trim(),
            b_logo: brand_logo,
            b_domain: allInput[2].value,
            b_email: allInput[3].value,
            b_facebook: allInput[4].value,
            b_twitter: allInput[5].value,
            b_whatsapp: allInput[6].value,
            b_instagram: allInput[7].value,
            b_mobile: allInput[8].value,
            b_address: allTextArea[0].value,
            b_about: allTextArea[1].value,
            b_privacy: allTextArea[2].value,
            b_cookie: allTextArea[3].value,
            b_terms: allTextArea[4].value,
        };

        if (allBrandingData.length > 0) {

            allBrandingData[0] = brandingObject;
            swal("Updated!", "Branding Updated Successfully", "success");

        } else {

            allBrandingData.push(brandingObject);
            swal("Inserted!", "Branding Created Successfully", "success");
        }

        insertData("allBrandingData", allBrandingData);

        readBrandingFunc();
    };

    /* ================= READ BRANDING ================= */

    const readBrandingFunc = () => {

        let branding = getAllData("allBrandingData") || [];

        if (branding.length === 0) return;

        let data = branding[0];

        editBrandBtn?.classList.remove("d-none");

        allInput[0].value = data.b_name;
        brand_logo = data.b_logo || "";

        allInput[2].value = data.b_domain;
        allInput[3].value = data.b_email;
        allInput[4].value = data.b_facebook;
        allInput[5].value = data.b_twitter;
        allInput[6].value = data.b_whatsapp;
        allInput[7].value = data.b_instagram;
        allInput[8].value = data.b_mobile;

        allTextArea[0].value = data.b_address;
        allTextArea[1].value = data.b_about;
        allTextArea[2].value = data.b_privacy;
        allTextArea[3].value = data.b_cookie;
        allTextArea[4].value = data.b_terms;

        allInput.forEach(input => input.disabled = true);
        allTextArea.forEach(textarea => textarea.disabled = true);

        allBtn[0].classList.add("d-none");
        allBtn[1].classList.remove("d-none");
        allBtn[1].disabled = true;

        editBrandBtn.onclick = () => {

            allInput.forEach(input => input.disabled = false);
            allTextArea.forEach(textarea => textarea.disabled = false);

            allBtn[1].disabled = false;
        };
    };

    readBrandingFunc();
};
