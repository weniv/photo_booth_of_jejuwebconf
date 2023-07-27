import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";
import html2canvas from "html2canvas";

const WIDTH = 1653 / 4.5;
const HEIGHT = 2915 / 4.5;
const IMG_WRAP_W = 1447 / 4.5;
const IMG_WRAP_H = 2138.17 / 4.5;

export default function PrintPage({ result }) {
    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const frameType = localStorage.getItem("frameType");

    useEffect(() => {
        setIsQr(false);
        drawImg();
        imageCapture();
        setTimeout(() => {
            setIsQr(true);
        }, 500);
    }, []);

    const drawImg = () => {
        if (!canvasRef) return;
        const canvas = canvasRef.current;
        const ctx = canvasRef.current.getContext("2d");
        const image = new Image();
        image.src = `/images/${frameType}.png`;
        const pic = new Image();
        pic.src = result;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        image.onload = function () {
            ctx.drawImage(pic, 24, 125, IMG_WRAP_W, IMG_WRAP_H);
            if (frameType === "WenivType2") {
                ctx.drawImage(pic, 24, 46, IMG_WRAP_W, IMG_WRAP_H);
            }
            ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
        };
    };

    // 이미지 url 생성
    const createUrl = async (imgData) => {
        const formData = new FormData();
        formData.append("image", imgData);

        try {
            const response = await axios.post("https://api.mandarin.weniv.co.kr/image/uploadfile", formData);
            const imageUrl = "https://api.mandarin.weniv.co.kr/" + response.data.filename;
            setImgUrl(imageUrl);
            console.log(imageUrl);

            return imageUrl;
        } catch (error) {
            console.error(error);
        }
    };

    // 화면 캡쳐
    const imageCapture = async () => {
        if (!canvasRef.current) return;

        try {
            const div = canvasRef.current;
            const canvas = await html2canvas(div, { scale: 2 });
            canvas.toBlob((myBlob) => {
                const myFile = new File([myBlob], "image.jpeg", {
                    type: myBlob.type,
                });
                createUrl(myFile);
            }, "image/jpeg");
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    };

    return (
        <Cont>
            <canvas ref={canvasRef}></canvas>
            <div>
                <p>카메라로 qr코드를 스캔 후 사진을 저장해주세요!</p>
                {isQr ? (
                    <>
                        <QRCode value={imgUrl} />
                    </>
                ) : (
                    <img src={Spinner} alt="로딩중" />
                )}
                <button onClick={navigate(process.env.PUBLIC_URL + "/")}>처음으로 돌아가기</button>
            </div>
        </Cont>
    );
}

const Cont = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: pink;
    gap: 50px;
`;
