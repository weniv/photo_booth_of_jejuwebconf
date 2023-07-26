import { styled } from "styled-components";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";

import { WenivFirst, WenivSecond, WebFirst, WebSecond } from "../../components/frame/index.js";
import FrameContext from "../../context/FrameContext";

const components = {
    first: WenivFirst,
    second: WenivSecond,
    third: WebFirst,
    fourth: WebSecond,
};

export default function Filming() {
    const { selectedFrame, updateFrame } = useContext(FrameContext);
    const SpecificStory = components[selectedFrame];

    const navigate = useNavigate();
    const navigateToSnap = () => navigate("/snap");
    const navigateToPrint = () => {
        navigate("/print");
    };

    // ----------------------------------
    // 화면 캡쳐
    const contentRef = useRef();

    const imageCaptureHandler = async () => {
        if (!contentRef.current) return;

        try {
            const div = contentRef.current;
            const canvas = await html2canvas(div, { scale: 2 });
            canvas.toBlob((blob) => {
                if (blob !== null) {
                    console.log(blob);
                }
            });
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    };

    // 이미지 url 생성
    const createUrl = async (imgData) => {
        const formData = new FormData();
        formData.append("image", imgData);

        try {
            const response = await axios.post("https://api.mandarin.weniv.co.kr/image/uploadfile", formData);
            await console.log(response);

            const imageUrl = "https://api.mandarin.weniv.co.kr/" + response.data.filename;
            return imageUrl;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            촬영페이지 입니다
            {/* <SpecificStory ref={contentRef} /> */}
            <SpecificStory />
            <div>
                <button onClick={navigateToSnap}>이전</button>
                {/* <button onClick={imageCaptureHandler}>다음</button> */}
                <button onClick={navigateToPrint}>다음</button>
            </div>
            {/* <TestDiv ref={contentRef} /> */}
        </Layout>
    );
}

const TestDiv = styled.div`
    width: 100px;
    height: 100px;
    background: black;
`;
const Layout = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 0 90px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(249, 197, 131, 0.3);
`;
