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

const showallOrder = () => {
    let allDeliverData =[];
    allDeliverData = getAllData("allDeliverData")
    let currentProdcut;
    let allOrderData = getAllData("allOrderData")
    let allOrderList = document.querySelector(".all-order-list");
    let deliverBtn = document.querySelector(".deliver-btn");
    let otpEl = document.querySelector(".otp");
    let filterData =allOrderData.filter((data)=>data.status=="Processing")
    allOrderList.innerHTML = "";
    filterData.forEach((data, index) => {
        allOrderList.innerHTML += `
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
        <td class="text-nowrap">
        <button class="btn btn-danger">${data.status}
        </button></td>
        <td class="text-nowrap">
        <button index="${index}" class="btn out-btn btn-primary" data-bs-toggle="modal" data-bs-target="#otp-modal">Out 
        </button></td>
    </tr>
    
    `;
    })
    let allOutBtn = allOrderList.querySelectorAll(".out-btn");
    for (btn of allOutBtn) {
        btn.onclick =function () {
            let index = this.getAttribute("index")
            currentProdcut = filterData[index];
            
           
        }
    }
    //delever Product to customer
    deliverBtn.onclick =()=>{
        let otp =otpEl.value;
        if(currentProdcut.otp==otp){
             currentProdcut["status"]="Deliverd";
          let productId= currentProdcut.prodctId;
         let email = currentProdcut.userinfo.email;
        let id =allOrderData.findIndex((data)=>{
            return data.prodctId==productId && data.otp==otp && data.userinfo.email==email
        });
        allDeliverData.push(currentProdcut)
        insertData("allDeliverData",allDeliverData);
        allOrderData.splice(id,1)
        insertData("allOrderData",allOrderData);
        swal("Prodcut Deliverd","Successfully","success")
        showallOrder();
        }
        else{
            swal ("Please Enter corrent OTP","Wrong OTP","warning")
        }
    }
    
}
showallOrder();