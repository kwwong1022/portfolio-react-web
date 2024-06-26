import { useEffect, useRef } from 'react'

const PageTitleSketch = ({ title }) => {
  const renderRef = useRef()

  useEffect(() => {
    const p5 = require('p5')

    let sRef
    let requireInit = true

    let circles
    let rows, cols
    let size = 10
    let font
    let targetHeight,
      currHeight = -50

    new p5(s => {
      sRef = s

      class Circle {
        constructor(x, y, r, c) {
          this.x = x
          this.y = y
          this.r = r
          this.or = r
          this.tr = r
          this.c = c
        }
        render() {
          s.fill(this.c)
          s.circle(s.width / 2 + this.x, s.height / 2 + this.y, this.r)
        }
        update() {
          let dist = s.dist(
            s.mouseX,
            s.mouseY,
            s.width / 2 + this.x,
            s.height / 2 + this.y
          )
          if (dist < 80) {
            this.tr = s.map(dist, 0, 80, this.or * 3, this.or)
            this.r = s.lerp(this.r, this.tr, 0.1)
          } else {
            this.r = s.lerp(this.r, this.or, 0.02)
          }
        }
      }

      s.preload = () => {
        font = s.loadFont('/assets/fonts/quicksand/Quicksand-Light.ttf')
      }

      s.setup = () => {
        s.createCanvas(0, 0).parent(renderRef.current)
      }

      s.draw = () => {
        init()

        s.background(249, 250, 252)

        circles.forEach(c => {
          c.render()
          c.update()
        })
        s.fill(50)
        s.textAlign(s.CENTER)
        s.textSize(36)
        s.textFont(font)
        s.text(title, s.width / 2, currHeight - 50)
        currHeight = s.lerp(currHeight, targetHeight, 0.1)
      }

      s.windowResized = () => {
        s.resizeCanvas(
          renderRef.current.offsetWidth,
          renderRef.current.offsetHeight
        )
        initCircles()
      }

      const init = () => {
        if (requireInit) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )
          requireInit = false

          targetHeight = s.height / 1.75 + 35
          s.noStroke()

          initCircles()
        }
      }

      const initCircles = () => {
        let sizeOffset = 0.2
        rows = (s.height / size) * sizeOffset
        cols = (s.width / size) * sizeOffset

        circles = []
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            let xPos = s.map(x, 0, cols, (s.width / 2) * -1, s.width / 2)
            let yPos = s.map(y, 0, rows, (s.height / 2) * -1, s.height / 2)
            circles.push(
              new Circle(xPos + size, yPos + size, size, s.random(220, 255))
            )
          }
        }
      }
    })

    return () => {
      sRef.remove()
    }
  }, [title])

  return <div className="w-full h-60" ref={renderRef} />
}

export default PageTitleSketch
