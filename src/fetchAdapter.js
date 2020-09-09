const h1 = document.getElementById("current-user")

class FetchAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(relativeUrl, callback) {
        fetch(`$(this.baseUrl).${relativeUrl}`)
            .then(res => res.json())
            .then(callback)
    }
}

////////////////////////////////////////////////////////////////

function findOrCreateBy(input) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            name: input
        })
    }
    fetch("http://localhost:3000/users/findby", options)
        .then(res => res.json())
        .then(success => {
            console.log(success)
            overlay.style.display = "none"
            renderUser(success)
            let id = success.user_id
            searchMaxScore(id)
            searchGamesPlayed(id)

            searchTotalScore(id)
        })
}

////////////////////////////////////////////////////////////////

function renderUser(success) {
    h1.innerText = success.name
    h1.dataset.id = success.user_id
}

////////////////////////////////////////////////////////////////

function sendScore(time, id) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            user_id: id,
            value: time
        })
    }
    console.log(`sending score ${time}`)
    fetch("http://localhost:3000/scores", options)
}

////////////////////////////////////////////////////////////////

function patchTotalPoints(time, id, totalScore) {
    let currString = totalScore.innerText.split(" ")
    currPoints = parseInt(currString[3])
    currPoints += time
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            user_id: id,
            totalscore: currPoints
        })
    }

    fetch("http://localhost:3000/users/" + `${id}`, options)
}

////////////////////////////////////////////////////////////////

function getNewMaxScore(id) {

    fetch("http://localhost:3000/scores/maxscore/" + `${id}`)
        .then(res => res.json())
        .then(hello => {
            console.log("in patch newmax")
            renderNewMaxScore(hello.value)
        })
}

////////////////////////////////////////////////////////////////

function searchMaxScore(id) {
    fetch("http://localhost:3000/scores/maxscore/" + `${id}`)
        .then(res => res.json())
        .then(Success => {
            console.log("response in searchMaxScore")
            debugger
            console.log(Success.value)
            renderMaxScore(Success.value)
        })
}

////////////////////////////////////////////////////////////////

function searchGamesPlayed(id) {
    fetch("http://localhost:3000/scores/totalgames/" + `${id}`)
        .then(res => res.json())
        .then(Success => {
            console.log("response in searchTotalScore")
            console.log(Success.value)
            renderGamesPlayed(Success.value)
        })
}

////////////////////////////////////////////////////////////////

function searchTotalScore(id) {
    fetch("http://localhost:3000/users/" + `${id}`)
        .then(res => res.json())
        .then(Success => {
            console.log("Inside searchTotalScore")
            console.log(Success.value)
            renderTotalScore(Success.value)
        })
}