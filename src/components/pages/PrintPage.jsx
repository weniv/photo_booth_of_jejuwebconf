import React, { useEffect, useRef } from 'react'
import styled from "styled-components"

const WIDTH = 1653 / 4.5
const HEIGHT = 2915 / 4.5
const IMG_WRAP_W = 1447 / 4.5
const IMG_WRAP_H = 2138.17 / 4.5

export default function PrintPage({ result }) {
  const canvasRef = useRef(null)
  const frameType = localStorage.getItem("frameType")
  console.log("frameType", frameType)

  useEffect(() => {
    drawImg()
  },[])


  const drawImg = () => {
    if(!canvasRef) return
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image()
    image.src = `/images/${frameType}.png`
    const pic = new Image()
    pic.src = result;
    canvas.width = WIDTH
    canvas.height = HEIGHT
    image.onload = function() {
      ctx.drawImage(pic, 24, 125, IMG_WRAP_W , IMG_WRAP_H)
      if(frameType === "WenivType2") {
        ctx.drawImage(pic, 24, 46, IMG_WRAP_W , IMG_WRAP_H)
      }
      ctx.drawImage(image, 0, 0, WIDTH, HEIGHT)
    }
  }


  return (
    <Cont>
      <canvas ref={canvasRef}></canvas>
    </Cont>
  )
}

const Cont = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: pink;
`