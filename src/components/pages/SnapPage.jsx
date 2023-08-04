import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styled from "styled-components";
import sound from '../../assets/camera.wav'

const CONSTRAINTS = { video: true };
const WIDTH = 1210;
const HEIGHT = 1043.82;

const audio = new Audio(sound)

export default function SnapPage({ setResult }) {
    const [picture, setPicture] = useState([]);
    const [time, setTime] = useState(10);
    let pictureId = useRef(1);
    const picWrapRef = useRef(null);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    // 비디오 재생
    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: CONSTRAINTS });
        if (videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
        }
    };

    // 사진 촬영
    const snapShot = () => {
        audio.play()
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.scale(-1, 1);
        ctx.translate(-WIDTH, 0);
        ctx.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT);
        canvas.toBlob((blob) => {
            new File([blob], `picture-${pictureId.current}.jpg`, { type: "image/jpeg" });
        }, "image/jpeg");
        pictureId.current++;
        const imageLink = canvas.toDataURL();
        setPicture([...picture, imageLink]);
    };

    // 촬영된 사진 묶어주기
    const getPicture = async () => {
        if (!picWrapRef) return;
        const picWrap = picWrapRef.current;

        try {
            const canvas = await html2canvas(picWrap, { scale: 2 });
            const result = canvas.toDataURL("image/jpeg")
            setResult(result)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        startVideo();
    }, []);

    // 타이머
    const timer = () => {
        const sec = setTimeout(() => {
            setTime(time - 1);
        }, 1000);
        if (time === 0) {
            snapShot();
            clearInterval(sec);
            setTime(10)
            setInterval(sec);
        } else if(picture.length === 4) {
            clearInterval(sec);
            getPicture();
            setTimeout(() => {
                navigate("/print");
            }, 1000)
        }
    };

    useEffect(() => {
        timer();
    }, [time]);

    return (
        <Cont>
            <Wrap>
                <h1>{time}</h1>
                <Video autoPlay ref={videoRef} />
                <Btn>
                    <p>촬영중 입니다</p>
                </Btn>
                <h2>({picture.length}/4)</h2>
            </Wrap>
            <div>
                <PicWrap ref={picWrapRef}>
                    {picture && picture.map((pic, idx) => <Picture src={pic} key={idx} alt={`${idx + 1}번 사진`}></Picture>)}
                </PicWrap>
            </div>
            <canvas id="canvas" style={{ display: "none", objectFit: "cover" }}></canvas>
        </Cont>
    );
}

const Cont = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    /* overflow: hidden; */
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 14.0625vh;
    align-items: center;
    justify-content: center;
    gap: 1.317715959vw;
    object-fit: cover;

    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc((${window.innerHeight}/2048) * 154px);
        height: calc((${window.innerHeight}/2048) * 154px);
        font-size: calc((${window.innerHeight}/2048) * 80px);
        background-color: var(--white-color);
        color: var(--main-color);
        border-radius: 16px;
    }

    h2 {
        font-size: calc((${window.innerHeight}/2048) * 64px);
        color: var(--main-color);
    }
`;

const Video = styled.video`
    width: calc((${window.innerWidth}/2732 * 419)*1.2px);
    height: calc((${window.innerWidth}/2732 * 634)*1.2px);
    object-fit: cover;
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg); /* Safari and Chrome */
    -moz-transform: rotateY(180deg);
    background-color: var(--gray-color);
`;

const PicWrap = styled.div`
    width: calc(879.48px);
    height: calc(1299.64px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    /* background-color: pink; */
`;

const Picture = styled.img`
    width: 419.28px;
    height: 637.57px;
    width: calc((${window.innerWidth}/2732 * 419)/2px);
    height: calc((${window.innerWidth}/2732 * 634)/2px);
    object-fit: cover;
`;

const Btn = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(${window.innerHeight}/2048 * 288px);
    background-color: var(--main-color);
    bottom: 0;

    p {
        font-size: calc((${window.innerHeight}/2048) * 120px);
        font-weight: 500;
        color: var(--white-color);
    }
`;