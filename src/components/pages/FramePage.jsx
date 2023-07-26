import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WenivType1 from "../../assets/weniv_type1.svg";
import WenivType2 from "../../assets/weniv_type2.svg";
import WebconfType1 from "../../assets/webconf_type1.svg";
import WebconfType2 from "../../assets/webconf_type2.svg";
import { styled } from "styled-components";
import FrameContext from "../../context/FrameContext";

function FrameButton({ frame, id }) {
    const { selectedFrame, updateFrame } = useContext(FrameContext);
    const [frameNumber, setFrameNumber] = useState("first");

    useEffect(() => {
        setFrameNumber(() => {
            switch (frame) {
                case "/static/media/weniv_type1.9ee404f285d1c085f44c92cb469610b0.svg":
                    return "first";
                case "/static/media/weniv_type2.747a0c13251dde41bfc5dfba50c06022.svg":
                    return "second";
                case "/static/media/webconf_type1.493a67583ad46e5b1595f7014eb827ce.svg":
                    return "third";
                case "/static/media/webconf_type2.3e6ccb80042428dc5cc0c69cdf2075d3.svg":
                    return "fourth";
            }
        });
    }, []);

    const clickFrame = () => {
        updateFrame(frameNumber);
    };

    return (
        <div className="frameBtn" onClick={clickFrame}>
            <label htmlFor={id}>
                <img src={frame} />
            </label>
            <input type="radio" id={id} name="frame" />
        </div>
    );
}

export default function Frame() {
    const navigate = useNavigate();
    const navigateToWelcome = () => navigate("/");
    const navigateToFilming = () => navigate("/snap");

    return (
        <Layout>
            <h2>1. 프레임 선택</h2>
            <section>
                <FrameButton frame={WenivType1} id="WenivType1" />
                <FrameButton frame={WenivType2} id="WenivType2" />
                <FrameButton frame={WebconfType1} id="WebconfType1" />
                <FrameButton frame={WebconfType2} id="WebconfType2" />
            </section>
            <div>
                <button onClick={navigateToWelcome}>이전</button>
                <button onClick={navigateToFilming}>다음</button>
            </div>
        </Layout>
    );
}

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

    h2 {
        color: #ed7a3a;
        // font-family: Pretendard;
        font-size: 64px;
        font-weight: 800;
        margin-bottom: 30px;
    }

    section {
        display: flex;
        gap: 15px;

        div.frameBtn {
            position: relative;
            padding: 0;
            border: none;
            background: none;
            margin: 0;
            cursor: pointer;

            label {
                height: 100%;
                display: inline-block;
            }

            img {
                width: 300px;
                box-shadow: 0px 4px 44px 0px rgba(0, 0, 0, 0.1);
            }

            input {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: 0;
            }
        }
    }
`;
