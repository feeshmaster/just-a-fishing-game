import './style.css'
import Game from './classes/game'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="game-container">
  <canvas id="game"></canvas>
</div>
`

new Game()
