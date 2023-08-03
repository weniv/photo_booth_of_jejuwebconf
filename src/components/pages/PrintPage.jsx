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

    console.log("imgUrl", imgUrl)

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
              maxRedirects: 0
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
                    type: myBlob.type,
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
            <Wrap ref={contentRef} top={frameType === "WenivType2" ? `126.26`: "342.26"}>
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
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    padding: 0 calc(448 / 2048 * 100vh);
`

const Wrap =  styled.div`
    display: flex;
    justify-content: center;
    position: relative; 
    width: calc(1004.9 / 2732 * 100vw);
    height: calc(1767.85 / 2048 * 100vh);
    margin: 0 auto;
    padding-top: ${(props) => `calc(${props.top} / 2048 * 100vh)`};
    background-color: var(--gray-color);
`

const Frame = styled.img`
    position: absolute;
    width: calc(1004.9 / 2732 * 100vw);
    height: calc(1767.85 / 2048 * 100vh);
    left: 0;
    top: 0;
`

const Picture = styled.img`
    position: absolute;
    width: calc(879.48 / 2732 * 100vw);
    height: calc(1299.64 / 2048 * 100vh);
    object-fit: cover;
    background-color: pink;
`;

const QRWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 4rem;
        color: var(--main-color);
        text-align: center;
        font-weight: 300;
        line-height: calc(74.56 / 2732 * 100vw);
    }

    img {
        width: calc(80 / 2732 * 100vw);
        margin: calc(22 / 2732 * 100vw) 0 calc(46 / 2732 * 100vw) 0;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(440 / 2732 * 100vw);
        height: calc(440 / 2732 * 100vw);
        background-color: var(--main-color);
        border-radius: 28px;
    }
`

const StyledQRCode = styled(QRCode)`
    width: calc(362 / 2732 * 100vw);
    height: calc(362 / 2732 * 100vw);
    border-radius: 18px;
`
