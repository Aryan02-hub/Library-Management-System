let container = document.querySelector('.container');
let registerBtn = document.querySelector('.register-btn');
let loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});




// LOGIN FORM

const loginForm = document.querySelector(".login form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = loginForm.querySelector('input[type="text"]').value;
    let password = loginForm.querySelector('input[type="password"]').value;

    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    });
});

const registerForm = document.querySelector(".Registeration form");

registerForm.addEventListener("submit",(e)=>{
e.preventDefault();

let username = registerForm.querySelector('input[type="text"]').value;
let email = registerForm.querySelector('input[type="email"]').value;
let password = registerForm.querySelector('input[type="password"]').value;

fetch("http://localhost:5000/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:username,
email:email,
password:password
})
})
.then(res=>res.json())
.then(data=>{
alert(data.message);
});

});