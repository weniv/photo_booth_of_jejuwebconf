import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";
import html2canvas from "html2canvas";
import downArrow from "../../assets/downArrow.svg"

const baseURL = `http://3.35.8.66/download/`
// const baseURL = `http://localhost:3000/download/` // 개발 테스트용


export default function PrintPage({ result }) {
    let idRef = useRef(1)
    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const [qrValue, setQrValue] = useState("");
    const frameType = localStorage.getItem("frameType");
    const date = new Date()
    const createdDate = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`

    const contentRef = useRef();

    useEffect(() => {
        setIsQr(false);
        imageCaptureHandler();
    },[])

    // console.log("imgUrl", imgUrl)

    useEffect(() => {
        if(imgUrl.length > 1) {
            const specificUrl = imgUrl.split("images/")[1];
            setQrValue(baseURL + specificUrl);
        }
    }, [imgUrl]);


    // 이미지 url 생성
    const createUrl = async (imgData) => {
        idRef.current++
        const postData = {
            "fileName": imgData.name,
            "files": imgData
        }
        
        try {
            const res = await axios({
              method: "POST",
              url: `http://54.180.195.162:8000/photo/`,
              mode: "cors",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: postData, 
            })
            setImgUrl(res.data.files)
            setIsQr(true);
            return res
        } catch (err) {
            console.error(err);
        }
    };
    
    // 화면 캡쳐
    const imageCaptureHandler = async () => {
        if (!contentRef.current) return;
        const result = contentRef.current

        try {
            const canvas = await html2canvas(result, { scale: 2 });
            canvas.toBlob((myBlob) => {
                const myFile = new File([myBlob], `${createdDate}-${idRef.current}.jpeg`, {
                    type: myBlob && myBlob.type,
                });
                createUrl(myFile);
            }, "image/jpeg");
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    };

    console.log("qrValue", qrValue)
    console.log("isQr", isQr)


    return (
        <Cont>
            <Wrap ref={contentRef} top={frameType === "WenivType2" ? `206.83`: "563"}>
                <Picture src={result}/>
                <Frame src={process.env.PUBLIC_URL + `/images/${frameType}.svg`} alt=""/>
            </Wrap>

            <QRWrap>
                <p>QR코드를 통해 <br/>사진을 다운로드 하세요</p>
                <img src={downArrow} alt="" />
                {isQr ? (
                    <div>
                        <StyledQRCode value={qrValue} />
                    </div>
                ) : (
                    <img src={Spinner} alt="로딩중" />
                )}
            </QRWrap>
        </Cont>
    );
}

const Cont = styled.div`
    display: flex;
    width: 100svw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    gap: calc(${window.innerWidth}/2732 * 300 * 0.35px);
`

const Wrap =  styled.div`
    display: flex;
    justify-content: center;
    position: relative; 
    width: calc(${window.innerWidth}/2732 * 1653 * 0.35px);
    height: calc(${window.innerWidth}/2732 * 2908 * 0.35px);
    padding-top: ${(props) => `calc(${window.innerWidth}/2732 * ${props.top} * 0.35px)`};
    background-color: var(--gray-color);
`

const Frame = styled.img`
    position: absolute;
    height: calc(${window.innerWidth}/2732 * 2908 * 0.35px);
    left: 0;
    top: 0;
`

const Picture = styled.img`
    position: absolute;
    width: calc(${window.innerWidth}/2732 * 1447 * 0.35px);
    height: calc(${window.innerWidth}/2732 * 2138.17 * 0.35px);
    object-fit: cover;
`;

const QRWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: calc((${window.innerHeight}/2048) * 64px);
        color: var(--main-color);
        text-align: center;
        font-weight: 300;
        line-height: calc((${window.innerHeight}/2048) * 74.56px);
    }

    img {
        width: calc(${window.innerWidth}/2732 * 80 * 0.35px);
        margin: calc(${window.innerWidth}/2732 * 11 * 0.35px) 0 calc(${window.innerWidth}/2732 * 46 * 0.35px);
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        /* width: calc(440 / 2732 * 100vw);
        height: calc(440 / 2732 * 100vw); */
        width: calc(${window.innerWidth}/2732 * 440 * 0.35px);
        margin: calc(${window.innerWidth}/2732 * 400 * 0.35px);
        background-color: var(--main-color);
        border-radius: 28px;
    }
`

const StyledQRCode = styled(QRCode)`
    /* width: calc(362 / 2732 * 100vw);
    height: calc(362 / 2732 * 100vw); */
    width: calc(${window.innerWidth}/2732 * 362 * 0.35px);
    margin: calc(${window.innerWidth}/2732 * 362 * 0.35px);
    border-radius: 18px;
`
