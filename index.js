const createLoop = require('raf-loop')
const loop = createLoop()

initScene();

function initScene () {

  let renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias:true, transparent:true })
  renderer.backgroundColor = 0xffffff

  document.body.appendChild(renderer.view)

  let stage = new PIXI.Container()

  let halfWidth = window.innerWidth/2
  let halfHeight = window.innerHeight/2

  let prevX = 0
  let prevY = 0
  let angle = 0
  let rotation = 0
  let length = 200
  let lines = []

  const colors = [0x000000, 0x111111, 0x222222, 0x333333, 0x444444, 0x555555, 0x666666, 0x777777, 0x888888, 0x999999, 0xAAAAAA, 0xBBBBBB, 0xCCCCCC, 0xDDDDDD, 0xEEEEEE, 0xFFFFFF]

  loop.on('tick', render).start()

  let time = 0
  let frame = 0

  function render (dt) {

    time += dt / 1000
    frame += 1
    
    let i=0

    // clear
    for (i=stage.children.length-1; i>=0; --i) {
      stage.removeChild(stage.children[i])
    }

    let color = colors[Math.floor(Math.random()*14)]
    let angle = 0.1 * frame
    let x = (1 + angle) * Math.cos(angle) * 1.2
    let y = (1 + angle) * Math.sin(angle) * 1.2

    if (lines.length < 1500) {
      lines.push({
        x0: halfWidth + prevX,
        y0: halfHeight + prevY,
        x1: halfWidth + x,
        y1: halfHeight + y,
        color: color,
        weight: Math.random()*4,
        speed: Math.random()*0.2,
        height: Math.random()*10
      })
    }

    prevX = x
    prevY = y
    
    let line, weight
    let graphics = new PIXI.Graphics()
    graphics.beginFill()

    for (i=0; i<lines.length; ++i) {
      line = lines[i]
      weight = (Math.sin(frame*line.speed)+1)*line.height
      graphics.lineStyle(line.weight+weight, line.color, 1)
      if (i>0) graphics.lineTo(line.x1, line.y1)
      else graphics.moveTo(line.x0, line.y0)
    }

    stage.addChild(graphics)

    renderer.render(stage)

  }
}
