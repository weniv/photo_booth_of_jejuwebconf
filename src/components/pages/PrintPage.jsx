import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";
import html2canvas from "html2canvas";
import {FRAME_W, FRAME_H, IMG_WRAP_W, IMG_WRAP_H, TOP_MARGIN, TOP_MARGIN_2} from "../../data/size"

export default function PrintPage({ result }) {
    let idRef = useRef(1)
    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const frameType = localStorage.getItem("frameType");

    const contentRef = useRef();

    useEffect(() => {
        idRef.current++
        setIsQr(false);
        imageCaptureHandler();
        setTimeout(() => {
            setIsQr(true);
        }, 500);
    }, []);

    // 이미지 url 생성
    const createUrl = async (imgData) => {
        const postData = {
            "fileName": imgData.name,
            "files": imgData
        }

        try {
            const res = await axios({
              method: "POST",
              url: `http://127.0.0.1:8000/photo/`,
              mode: "cors",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: postData, 
            })
            setImgUrl(res.data.files)
            return res
        } catch (error) {
            console.error(error);
        }
    };

    
    // 화면 캡쳐
    const imageCaptureHandler = async () => {
        if (!contentRef.current) return;
        const result = contentRef.current
        const date = new Date()
        const createdDate = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`

        try {
            const canvas = await html2canvas(result, { scale: 2 });
            canvas.toBlob((myBlob) => {
                const myFile = new File([myBlob], `${createdDate}-${idRef.current}.jpeg`, {
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

const Test = styled.img`
    position: absolute;
    width: ${(width) => width};
    height: ${(height) => height};
    background-color: red;
`;

