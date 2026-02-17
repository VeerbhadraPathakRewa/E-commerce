const signupForm = document.querySelector(".signup-form");
const allInput = signupForm.querySelectorAll("input");
const textarea = signupForm.querySelector("textarea");
let allRegistrationData = [];
allRegistrationData = getAllData('allRegistrationData');
signupForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = allRegistrationData.filter((data) =>
        data.email == allInput[1].value);
    console.log(checkEmail);
    return false
    if (checkEmail.length == 0) {
        allRegistrationData.push({
            fullname: allInput[0].value,
            email: allInput[1].value,
            password: allInput[2].value,
            mobile: allInput[3].value,
            state: allInput[4].value,
            contry: allInput[5].value,
            pincode: allInput[6].value,
            address: textarea.valu
        });
        insertData("allRegistrationData", allRegistrationData);
        swal("Data Inserted", "Please Login", "success")
    }
    else {
        swal("User Already exists!", "Please Login", "warning")
    }

}