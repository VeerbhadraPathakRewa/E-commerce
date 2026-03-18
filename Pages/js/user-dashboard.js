window.onload = () => {
    let username = localStorage.getItem("__au__");
    let allOrderData = getAllData("allOrderData")
    let alldeliverData = getAllData("allDeliverData")
    let allOrderList = document.querySelector(".all-order-list");
    let allDeliverList = document.querySelector(".all-deliverd-list");
    showallOrder(allOrderData, allOrderList, username);
    showallOrder(alldeliverData, allDeliverList, username);
}

//formate date
const formateDate = (dateStr) => {
    let date = new Date(dateStr);
    let dd = date.getDate()
    dd < 10 ? dd = "0" + dd : dd;
    let mm = date.getMonth() + 1;
    mm < 10 ? mm = "0" + mm : mm;
    let yy = date.getFullYear();
    return dd + "-" + mm + "-" + yy + " " + date.toLocaleTimeString();
};

const showallOrder = (allData, element, username) => {
    let filterData = allData.filter((data) => data.userinfo.email == username)
    element.innerHTML = "";
    filterData.forEach((data, index) => {
        element.innerHTML += `
    <tr>
        <td class="text-nowrap">${index + 1}</td>
        <td class="text-nowrap"><img src ="${data.productInfo.thumb}" width="30" class="rounded-circle"></td>
        <td class="text-nowrap">${data.productInfo.title}</td>
        <td class="text-nowrap">${data.qty}</td>
        <td class="text-nowrap">${data.finalPrice}</td>
        <td class="text-nowrap">${data.userinfo.address}</td>
        <td class="text-nowrap">${data.userinfo.state}</td>
        <td class="text-nowrap">${data.userinfo.contry}</td>
        <td class="text-nowrap">${data.userinfo.pincode}</td>
        <td class="text-nowrap">${formateDate(data.purchaseDate)}</td>
        <td class="text-nowrap">${data.userinfo.fullname}</td>
        <td class="text-nowrap">${data.userinfo.email}</td>
        <td class="text-nowrap">${data.userinfo.mobile}</td>
        <td class="text-nowrap">${data.otp}</td>
        <td class="text-nowrap">
        <button class="btn btn-danger">${data.status}
        </button></td>
        <td class="text-nowrap">
        <button index="${index}" class="cancel-btn btn btn-primary ${data.isCancel ? "d-none" : ""}">Cancel
        </button></td>
        
    </tr>
    `;
    });
    let allcancelBtn = element.querySelectorAll(".cancel-btn");
    for (let btn of allcancelBtn) {
        btn.onclick = async () => {
            let allOrderData = getAllData("allOrderData")
            let index = btn.getAttribute("index")
            let currentProduct = filterData[index];
            currentProduct["status"] = "Canceled";
            currentProduct['isCancel'] = true;
            let userId = currentProduct.userinfo.email;
            let productId = currentProduct.productId;
            let otp = currentProduct.otp;
            let isConfirm = await confirm();
            if (isConfirm) {

                let currentIndex = allOrderData.findIndex((data) => {
                    return data.userinfo.email == userId && data.productId == productId && data.otp == otp;

                });
                allOrderData[currentIndex] = currentProduct;
                insertData("allOrderData", allOrderData);
                swal("Oreder is Caceled", "Successfully", "success");
            }
        }
    }
};
