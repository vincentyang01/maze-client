const createOverlayForm = () => {
    const overlayDiv = document.querySelector('#overlay');
    const form = document.createElement("form");

    overlayDiv.innerHTML = `
    <div id="box-div">
        <h2>Maze Game</h2>
        <br>
        <hr>
        <br>
        <h3>Welcome to a Maze Generating Game</h3>
        <br>
        <p>Please enter your username below and enjoy!</p>
        <br>
        <div id="form-div"></div>
        <br>
        <p>Created by:</p>
        <p>Vincent Yang & Jake Mills</p>
    </div>
    `

    form.setAttribute("id", "login");
    form.innerHTML = `
        <input type="text" id="username" placeholder="Enter Username">
        <button id="login-btn"> Continue </button>
    `

    const formDiv = document.querySelector('#form-div')
    formDiv.appendChild(form);
}

function login() {
    const loginButton = document.getElementById("login-btn")
    loginButton.addEventListener("click", (e) => {
        e.preventDefault()
        let input = document.querySelector('#username').value
        let obj = findOrCreateBy(input)
    })
}


createOverlayForm();
login();