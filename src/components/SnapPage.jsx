import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

const CONSTRAINTS = { video: true };
const WIDTH = 146
const HEIGHT = 220

export default function SnapPage({ picture, setPicture }) {
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
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d')
  console.log("촬영!")
  canvas.width = WIDTH
  canvas.height = HEIGHT
  // ctx.scale(-1,1)
  // ctx.translate(-WIDTH, 0)
  ctx.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT)
  canvas.toBlob((blob) => {
    new File([blob], `picture-${pictureId.current}.jpg`, {type: "image/jpeg"})
  }, "image/jpeg")
  pictureId.current++
  const imageLink = canvas.toDataURL()
  setPicture([...picture, imageLink])
}

const autoShot = () => {
  let take;
  // if(picture.length <= 4) {
  //   console.log("사진촬영")
  //   take = setInterval(() => {
  //     snapShot()
  //   }, 1000)
  // } else {
  //   console.log("촬영종료")
  //   clearInterval(take)
  //   return "end"
  // }
}

useEffect(() => {
    startVideo()
    autoShot()
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


  return (
    <>
    <div>
        <video autoPlay ref={videoRef}></video>
        <button onClick={snapShot}>촬영</button>
    </div>
    {/* <div>
      {picture.map((pic, idx) =>  (
        <Picture src={pic} key={idx} alt={`${idx+1}번 사진`} />
      ))}
    </div> */}
    <canvas id="canvas" style={{display: 'none'}}></canvas>
    </>
  )
}

// const Picture = styled.img`
//   width: 100px;
//   height: 100px;
// `
