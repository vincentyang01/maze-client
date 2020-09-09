const overlay = document.getElementById("overlay")
const form = document.createElement("form")
form.setAttribute("id","login")
form.innerHTML = `
    <label> Enter a username </label><br><br>
    <input type="text" id="username" placeholder="Create a user or login"><br><br>
    <button id="login-btn"> Continue </button>
`
overlay.appendChild(form)

function login() {
    const loginButton = document.getElementById("login-btn")
    loginButton.addEventListener("click", (e) => {
        e.preventDefault()
        const button = e.target
        let input = button.previousElementSibling.previousElementSibling.previousElementSibling.value
        let obj = findOrCreateBy(input)
    })
}



login();