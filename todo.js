let myFormEl = document.getElementById("myForm");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let workingStatusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};



workingStatusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});


genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
    console.log(formData.gender);
});


genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
    console.log(formData.gender);
});




nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
    console.log(formData.name);
});



emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
    console.log(formData.female);
});



function validateFormData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}



function submitFormData(formData) {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 263ec5f941161589f4bd1fd15ce006398a835301872d0f1130a5de55565b3a3e"
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
            console.log(jsonData);
        });
}




myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    submitFormData(formData);
    validateFormData(formData);
});