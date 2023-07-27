import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toPng } from 'html-to-image';
import styled from "styled-components"

const CONSTRAINTS = { video: true };
const WIDTH = 146
const HEIGHT = 220
const IMG_WRAP_W = `${1447 / 4.5}px`
const IMG_WRAP_H = `${2138.17 / 4.5}px`
const IMG_W = `${689.69 / 4.5}px`
const IMG_H = `${1043.82 / 4.5}px`

export default function SnapPage({ setResult }) {
  const [picture, setPicture] = useState([])
  const [time, setTime] = useState(40); 
  let pictureId = useRef(1)
  const picWrapRef = useRef(null)
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

// 촬영된 사진 묶어주기
  const getPicture = async () => {
    if(!picWrapRef) return
    const picWrap = picWrapRef.current;

    // DOM to png
      try {
        const dataUrl = await toPng(picWrap, { cacheBust: true})
        setResult(dataUrl)
      } catch (err) {
        console.log(err)
      }
  }

useEffect(() => {
    startVideo()
},[])

// 사진 4장 촬영 후 다음 페이지로 이동, 일단 1초 delay 넣어둠
// 이동하기전에 다음 페이지로 이동합니다 문구 넣어주면 좋을듯
useEffect(() => {
  if(picture.length >= 4) {
    getPicture()
    setTimeout(() => {
      navigate("/print")
    }, 1000)
  }
}, [picture])

// 타이머
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
        <div>
      <PicWrap ref={picWrapRef} width={IMG_WRAP_W} height={IMG_WRAP_H}>
        {picture && picture.map((pic, idx) =>  (
            <Picture width={IMG_W} height={IMG_H} src={pic} key={idx} alt={`${idx+1}번 사진`} />
        ))}
      </PicWrap>
        </div>
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

const PicWrap = styled.div`
  width: ${({width}) => width};
  height: ${({height}) => height};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`

const Picture = styled.img`
    width: ${({width}) => width};
    height: ${({height}) => height};
`
