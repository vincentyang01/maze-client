const createVirusBubble = () => {
  const btnCont = document.querySelector('.btn-container')
  const virusBubble = document.createElement('span')

  let size = Math.random() * 50
  const virusIcon = `<i class="fas fa-biohazard" style="font-size: ${size + 20}px"></i>`

  virusBubble.classList.add('virusBubble')
  virusBubble.style.left = Math.random() * innerWidth + 'px';
  virusBubble.innerHTML = virusIcon

  btnCont.appendChild(virusBubble);

  setTimeout(() => {
    virusBubble.remove()
  }, 4000)
}