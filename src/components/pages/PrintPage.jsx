import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";
import { toBlob } from "html-to-image";
import html2canvas from "html2canvas";
import {FRAME_W, FRAME_H, IMG_WRAP_W, IMG_WRAP_H, TOP_MARGIN, TOP_MARGIN_2} from "../../data/size"

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
        const result = contentRef.current

        // DOM to blob => 라이브러리 하나만 쓰고 싶은데 살짝 잘려서 나옴, 화질별로
        // try {
        //     const dataUrl = await toBlob(result);
        //     // console.log("dataUrl", dataUrl) // {size: 588072, type: 'image/png'}
        //     const myFile = new File([dataUrl], "image.jpeg", {
        //             type: dataUrl.type,
        //         });
        //     createUrl(myFile);
        // } catch (err) {
        //     console.log(err);
        // }

        try {
            const canvas = await html2canvas(result, { scale: 2 });
            canvas.toBlob((myBlob) => {
                // console.log("myBlob",myBlob) // Blob {size: 191307, type: 'image/jpeg'}
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
                <Frame src={process.env.PUBLIC_URL + `/images/${frameType}.png`} alt="" width={FRAME_W} height={FRAME_H}/>
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
    margin: 0 auto;
    padding-top: ${(props) =>  props.top};
    background-color: pink;
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
`;