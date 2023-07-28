import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";
import html2canvas from "html2canvas";
import { FRAME_W, FRAME_H, IMG_WRAP_W, IMG_WRAP_H, TOP_MARGIN, TOP_MARGIN_2 } from "../../data/size";

export default function PrintPage({ result }) {
    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const [qrValue, setQrValue] = useState("");
    const frameType = localStorage.getItem("frameType");

    const contentRef = useRef();

    const location = useLocation();
    // const defaultUrl = location.pathname.split("/print")[0];

    useEffect(() => {
        setIsQr(false);
        imageCaptureHandler();
        setTimeout(() => {
            setIsQr(true);
        }, 500);
    }, []);

    useEffect(() => {
        const specificUrl = imgUrl.split("https://")[1];
        setQrValue("https://whimsical-cheesecake-584645.netlify.app/download/:" + specificUrl);
        // console.log("qrValue", qrValue);
    }, [imgUrl]);

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
        const result = contentRef.current;

        try {
            const canvas = await html2canvas(result, { scale: 2 });
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
        <>
            <Wrap ref={contentRef} width={FRAME_W} height={FRAME_H} top={frameType === "WenivType2" ? TOP_MARGIN_2 : TOP_MARGIN}>
                <Picture src={result} width={IMG_WRAP_W} height={IMG_WRAP_H} />
                <Frame src={process.env.PUBLIC_URL + `/images/${frameType}.png`} alt="" width={FRAME_W} height={FRAME_H} />
            </Wrap>

            <div>
                <p>카메라로 qr코드를 스캔 후 사진을 저장해주세요!</p>
                {isQr ? (
                    <>
                        <QRCode value={qrValue} />
                    </>
                ) : (
                    <img src={Spinner} alt="로딩중" />
                )}
            </div>
        </>
    );
}

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: 0 auto;
    padding-top: ${(props) => props.top};
    background-color: pink;
`;

const Frame = styled.img`
    position: absolute;
    width: ${(width) => width};
    height: ${(height) => height};
    left: 0;
    top: 0;
`;

const Picture = styled.img`
    position: absolute;
    width: ${(width) => width};
    height: ${(height) => height};
`;
