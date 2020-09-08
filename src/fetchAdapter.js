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
.then(Success => console.log(Success))
.then(Success => {
    overlay.style.display = "none"
    // debugger
})
}








function sendScore(time){
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
    body: JSON.stringify({ user_id: this.id, value: time })
    }
fetch("http://localhost:3000/scores", options)
.then(res => res.json())
}