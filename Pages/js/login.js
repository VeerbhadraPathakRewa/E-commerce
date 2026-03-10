let loginForm = document.querySelector(".login-form");
let allInput = loginForm.querySelectorAll("input");
const allRegData = getAllData("allRegistrationData");
console.log(allRegData)
loginForm.onsubmit = (e) => {
    e.preventDefault();
    let email = allRegData.filter((data) => data.email == allInput[0].value);
    if (email != 0) {
        if (email[0].password == allInput[1].value) {
            if (email[0].type == "customer") {
                localStorage.setItem("__au__", allInput[0].value);
                setTimeout(() => {
                    window.location = "http://localhost/e-commerce/";
                }, 400);
                swal("LogIn", "", "success");
            }
            else {
                localStorage.setItem("__au__", allInput[0].value);
                setTimeout(() => {
                    window.location = "http://localhost/e-commerce/Pages/postman.html";
                }, 400);
                swal("LogIn", "", "success");
            }

        } else {
            swal("Please Enter corrent Password", "", "warning")
        }
    }
    else {
        swal("Please Enter Corrent UserName", "Please Register First", "warning")
    }

}