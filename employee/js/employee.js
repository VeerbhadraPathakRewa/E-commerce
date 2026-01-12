window.onload = () => {
    collapsFunc();
    DynamicRequestFunc();
    setTimeout(() => {
        togglerFunc();

    }, 100);
}


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
            crateBrandFunc();
        }

    }
}
//Start Create Category coding
const createCategoryFunc = () => {
    let categoryList = document.querySelector(".category-list");
    let categoryForm = document.querySelector(".category-form");
    let inputBoxEl = document.querySelector(".input-box");
    let addFieldBtn = document.querySelector(".add-field-btn");
    let allcategoryData = [];
    if (localStorage.getItem("allcategoryData") !== null) {
        allcategoryData = JSON.parse(localStorage.getItem("allcategoryData"));
    }
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
        localStorage.setItem("allcategoryData", JSON.stringify(allcategoryData));
        swal("Success", "Your Category creation is Done!", "success");
        readcategorydata();
        categoryForm.reset('');

    }
    //Create category data
    const readcategorydata = () => {
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
                localStorage.setItem("allcategoryData", JSON.stringify(allcategoryData));
                readcategorydata();
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
                    localStorage.setItem("allcategoryData", JSON.stringify(allcategoryData));
                    readcategorydata();
                    allTD[1].contentEditable = false;
                }
            }
        }
    }
    readcategorydata();
}
// Start Create Brand coding 
const crateBrandFunc = () => {
    alert();
}