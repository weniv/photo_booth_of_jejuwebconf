import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";

const FRAME_W = `${1653 / 4.5}px`
const FRAME_H = `${2908 / 4.5}px`
const IMG_WRAP_W = `${1447 / 4.5}px`
const IMG_WRAP_H = `${2138.17 / 4.5}px`
const TOP_MARGIN = `${563 / 4.5}px`
const TOP_MARGIN_2 = `${206.83 / 4.5}px`
// const LEFT_MARGIN = `${103 / 4.5}px`

export default function PrintPage({ result }) {
    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const frameType = localStorage.getItem("frameType");

    const contentRef = useRef();

    useEffect(() => {
        setIsQr(false);
        imageCaptureHandler();
        setTimeout(() => {
            setIsQr(true);
        }, 500);
    }, []);

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

    return (
        <>
            <Wrap ref={contentRef} width={FRAME_W} height={FRAME_H} top={frameType === "WenivType2" ? TOP_MARGIN_2 : TOP_MARGIN}>
                <Picture src={result} width={IMG_WRAP_W} height={IMG_WRAP_H}/>
                <Frame src={`/images/${frameType}.png`} alt="" width={FRAME_W} height={FRAME_H}/>
            </Wrap>

            <div>
                <p>카메라로 qr코드를 스캔 후 사진을 저장해주세요!</p>
                {isQr ? (
                    <>
                        <QRCode value={imgUrl} />
                    </>
                ) : (
                    <img src={Spinner} alt="로딩중" />
                )}
            </div>
        </>
    );
}

const Wrap =  styled.div`
    display: flex;
    justify-content: center;
    position: relative; 
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: pink;
    margin: 0 auto;
    padding-top: ${(props) =>  props.top};
`

const Frame = styled.img`
    position: absolute;
    width: ${(width) => width};
    height: ${(height) => height};
    left: 0;
    top: 0;
`

const Picture = styled.img`
    position: absolute;
    width: ${(width) => width};
    height: ${(height) => height};
    background-color: aquamarine;
`;