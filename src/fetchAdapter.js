const userUrl = "http://localhost:3000/users/"
const scoreUrl = "http://localhost:3000/scores/"

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
    fetch(userUrl + "findby", options)
        .then(res => res.json())
        .then(success => {
            overlay.style.display = "none"
            renderUser(success)
            let id = success.user_id
            searchMaxScore(id)
            searchGamesPlayed(id)

            searchTotalScore(id)
        })
}

////////////////////////////////////////////////////////////////

function sendScore(score, id) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            user_id: id,
            value: score
        })
    }
    fetch(scoreUrl, options)
}

////////////////////////////////////////////////////////////////

function patchTotalPoints(score, id, totalScore) {
    let currString = totalScore.innerText.split(" ")
    currPoints = parseInt(currString[3])
    currPoints += score
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

    fetch(userUrl + `${id}`, options)
}

////////////////////////////////////////////////////////////////

function searchMaxScore(id) {
    fetch(scoreUrl + "maxscore/" + `${id}`)
        .then(res => res.json())
        .then(Success => {
            renderMaxScore(Success.value)
        })
}

////////////////////////////////////////////////////////////////

function searchGamesPlayed(id) {
    fetch(scoreUrl + "totalgames/" + `${id}`)
        .then(res => res.json())
        .then(Success => {
            renderGamesPlayed(Success.value)
        })
}

////////////////////////////////////////////////////////////////

function searchTotalScore(id) {
    fetch(userUrl + `${id}`)
        .then(res => res.json())
        .then(Success => {
            renderTotalScore(Success.value)
        })
}

////////////////////////////////////////////////////////////////

const getHighScores = () => {
    fetch(userUrl)
        .then(res => res.json())
        .then(renderHighScores)
}

getHighScores()