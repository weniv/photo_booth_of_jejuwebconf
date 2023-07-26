import React, { useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import styled from "styled-components";
import QRCode from "react-qr-code";

export default function PrintPage({ picture }) {
    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);

    const contentRef = useRef();

    // 이미지 url 생성
    const createUrl = async (imgData) => {
        const formData = new FormData();
        formData.append("image", imgData);

        try {
            const response = await axios.post("https://api.mandarin.weniv.co.kr/image/uploadfile", formData);
            const imageUrl = "https://api.mandarin.weniv.co.kr/" + response.data.filename;
            setImgUrl(imageUrl);

            return imageUrl;
        } catch (error) {
            console.error(error);
        }
    };

    // 화면 캡쳐
    const imageCaptureHandler = async () => {
        if (!contentRef.current) return;

        try {
            const div = contentRef.current;
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

    // qr 생성 버튼
    const downloadImg = () => {
        imageCaptureHandler();
        setTimeout(() => {
            setIsQr(true);
        }, 500);
    };

    return (
        <>
            <Frame ref={contentRef}>
                <Wrap>{picture && picture.map((pic, idx) => <Picture src={pic} key={idx} alt={`${idx + 1}번 사진`} />)}</Wrap>
            </Frame>

            {isQr ? (
                <>
                    <p>카메라로 qr코드를 스캔 후 사진을 저장해주세요!</p>
                    <QRCode value={imgUrl} />
                </>
            ) : (
                <button onClick={downloadImg}>프린트 테스트 버튼</button>
            )}
        </>
    );
}

const Frame = styled.div`
    position: relative;
    width: 350px;
    height: 613px;
    background-color: pink;
    margin: 0 auto;
`;

const Wrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    padding: 0 23px;
    background-color: aqua;
    bottom: 43px;
    gap: 10px;
`;

const Picture = styled.img`
    width: 146px;
    height: 220px;
`;

