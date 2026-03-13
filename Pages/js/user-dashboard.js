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
}

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
        
    </tr>
    `;
    });
}
