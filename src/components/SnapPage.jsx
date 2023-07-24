import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components"

// https://stickode.tistory.com/691
// 일정시간마다 사진 촬영해서 4장되면 다음 페이지로 넘어가는 기능 구현하기

const CONSTRAINTS = { video: true };
const WIDTH = 600
const HEIGHT = 600

export default function SnapPage() {
let pictureId = useRef(1)
const videoRef = useRef(null);
const [picture, setPicture] = useState([])
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
    console.log(picture.length)
},[])


  return (
    <>
    <div>
        <video autoPlay ref={videoRef}></video>
        <button onClick={snapShot}>촬영</button>
    </div>
    <div>
      {picture.map((pic, idx) =>  (
        <Picture src={pic} key={idx} alt={`${idx+1}번 사진`} />
      ))}
    </div>
    <Canvas id="canvas" style={{display: 'none'}}></Canvas>
    </>
  )
}

const Picture = styled.img`
  width: 100px;
  height: 100px;
`

const Canvas = styled.canvas`
  background-color: pink;
`
