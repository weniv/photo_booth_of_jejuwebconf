import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

const CONSTRAINTS = { video: true };
const WIDTH = 146
const HEIGHT = 220

export default function SnapPage({ picture, setPicture }) {
  const [time, setTime] = useState(40); 
  let pictureId = useRef(1)
  const videoRef = useRef(null);
  const navigate = useNavigate()

// 비디오 재생
const startVideo = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({video: CONSTRAINTS})
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
}

// 사진 촬영
const snapShot = () => {
  console.log("촬영!")
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  ctx.scale(-1,1)
  ctx.translate(-WIDTH, 0)
  ctx.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT)
  canvas.toBlob((blob) => {
    new File([blob], `picture-${pictureId.current}.jpg`, {type: "image/jpeg"})
  }, "image/jpeg")
  pictureId.current++
  const imageLink = canvas.toDataURL()
  setPicture([...picture, imageLink])
}

useEffect(() => {
    startVideo()
},[])

// 사진 4장 촬영 후 다음 페이지로 이동, 일단 1초 delay 넣어둠
// 이동하기전에 다음 페이지로 이동합니다 문구 넣어주면 좋을듯
useEffect(() => {
  if(picture.length >= 4) {
    setTimeout(() => {
      navigate("/print")
    }, 1000)
  }
}, [picture])

const timer = () => {
  const sec = setTimeout(() => {
    setTime((time - 1))
  }, 1000)
  if(time === 0) {
    navigate("/print")
    clearInterval(sec)
  } else if(time % 10 === 9) {
    snapShot()
  }
}

useEffect(() => {
  timer()
},[time])


  return (
    <>
      <Wrap>
          <Video autoPlay ref={videoRef} />
          <button onClick={snapShot}>촬영</button>
          <h1>{time}</h1>
      </Wrap>
      <canvas id="canvas" style={{display: 'none'}}></canvas>
    </>
  )
}

const Wrap = styled.div`
  background-color: pink;
`

const Video = styled.video`
  transform: rotateY(180deg);
  -webkit-transform:rotateY(180deg); /* Safari and Chrome */
  -moz-transform:rotateY(180deg);
`
