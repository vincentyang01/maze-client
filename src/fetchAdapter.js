const h1 = document.getElementById("current-user")

class FetchAdapter {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    get(relativeUrl, callback){
        fetch(`$(this.baseUrl).${relativeUrl}`)
        .then(res => res.json())
        .then(callback)
    }
}





function findOrCreateBy(input) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
    body: JSON.stringify({ name: input })
    }
fetch("http://localhost:3000/users/findby", options)
.then(res => res.json())
.then(success => {
    console.log(success)
    overlay.style.display = "none"
    renderUser(success)
})

}


function renderUser(success) {
    h1.innerText = success.name
    h1.dataset.id = success.user_id
}







function sendScore(time, id){
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
    body: JSON.stringify({ user_id: id, value: time })
    }
fetch("http://localhost:3000/scores", options)
// .then(res => res.json())
}