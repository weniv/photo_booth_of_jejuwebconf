import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import QRCode from "react-qr-code";
import Spinner from "../../assets/Spinner.gif";
import html2canvas from "html2canvas";
import downArrow from "../../assets/downArrow.svg"

// const baseURL = `https://whimsical-cheesecake-584645.netlify.app/download/`
const baseURL = `http://localhost:3000/download/` // 개발 테스트용
// const baseURL = `http://54.180.195.162:8000/download/` // 개발 테스트용 - 서버


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

    useEffect(() => {
        const specificUrl = imgUrl.split("images/")[1];
        setQrValue(baseURL + specificUrl);
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
              url: `/photo/`,
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
                    type: myBlob.type,
                });
                createUrl(myFile);
            }, "image/jpeg");
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    };

    console.log(qrValue)

    return (
        <Cont>
            <Wrap ref={contentRef} top={frameType === "WenivType2" ? "126.26px": "342.26px"}>
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
    padding: 0 448px;
`

const Wrap =  styled.div`
    display: flex;
    justify-content: center;
    position: relative; 
    width: 1004.9px;
    height: 1767.85px;
    margin: 0 auto;
    padding-top: ${(props) =>  props.top};
    background-color: var(--gray-color);
`

const Frame = styled.img`
    position: absolute;
    width: 1004.9px;
    height: 1767.85px;
    left: 0;
    top: 0;
`

const Picture = styled.img`
    position: absolute;
    width: 879.48px;
    height: 1299.64px;
`;

const QRWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 64px;
        color: var(--main-color);
        text-align: center;
        font-weight: 300;
        line-height: 74.56px;
    }

    img {
        width: 80px;
        margin: 22px 0 46px 0;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 440px;
        height: 440px;
        background-color: var(--main-color);
        border-radius: 28px;
    }
`

const StyledQRCode = styled(QRCode)`
    width: 362px;
    height: 362px;
    border-radius: 18px;
`
