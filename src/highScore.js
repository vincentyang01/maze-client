const renderHighScores = highScores => {
  for (let highScore of highScores) {
    renderHighScore(highScore)
  }
}

const renderHighScore = highScore => {
  const highScoreOl = document.querySelector('#high-score')
  const createLi = document.createElement('li')

  createLi.innerHTML = `
    ${highScore.name} - ${highScore.totalscore}
  `

  highScoreOl.appendChild(createLi)
}