import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WenivType1 from "../../assets/frame_1.svg";
import WenivType2 from "../../assets/frame_2.svg";
import WebconfType1 from "../../assets/frame_3.svg";
import WebconfType2 from "../../assets/frame_4.svg";
import WebconfType3 from "../../assets/frame_5.svg";
import checkIcon from "../../assets/check.svg"

function FrameButton({ frame, id, saveFrame }) {
    return (
        <Frame className="frameBtn" onClick={(e) => saveFrame(e)}>
            <label htmlFor={id}>
                <img src={frame} />
                <input type="radio" id={id} name="frame" />
            </label>
        </Frame>
    );
}

export default function FramePage() {
    const navigate = useNavigate();
    const [frameType, setFrameType] = useState("");

    const saveFrame = (e) => {
        setFrameType(e.target.id);
    };

    useEffect(() => {
        localStorage.setItem("frameType", frameType);
    }, [frameType]);

    const moveNextPage = () => {
        if(frameType) {
            navigate("/snap")
        }
    }

    return (
        <Wrap>
            <Cont>
                <FrameWrap>
                    <FrameButton frame={WenivType1} id="WenivType1" saveFrame={saveFrame}></FrameButton>
                    <FrameButton frame={WenivType2} id="WenivType2" saveFrame={saveFrame}></FrameButton>
                    <FrameButton frame={WebconfType1} id="WebconfType1" saveFrame={saveFrame}></FrameButton>
                    <FrameButton frame={WebconfType2} id="WebconfType2" saveFrame={saveFrame}></FrameButton>
                    <FrameButton frame={WebconfType3} id="WebconfType3" saveFrame={saveFrame}></FrameButton>
                </FrameWrap>
            </Cont>
            <Btn onClick={moveNextPage}>{!frameType ? "프레임을 선택해주세요" : "프레임 선택 완료"}</Btn>
        </Wrap>
    );
}

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
`

const Cont = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    padding-bottom: 14.0625vh;
`;

const FrameWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40.234375vh;
    gap: 1.68931325744vw;
`
const Frame = styled.div`
    img {
        height: 40.234375vh;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        display: flex;
        align-items: center;
        justify-content: center;
        appearance: none;
        width: 3.90625vh;
        height: 3.90625vh;
        background-color: var(--gray-color);
        border-radius: 50%;
        margin-top: 4.19921875vh;
        cursor: pointer;

        &:checked {
            position: relative;
            width: 6.15234375vh;
            height: 6.15234375vh;
            /* margin-top: 3.564453125vh; */
            background-color: var(--main-color);

            &::after {
                content: "";
                display: block;
                width: 2.28770131772vw;
                height: 2.2216796875vh;
                background-image: url(${checkIcon});
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }
`

const Btn = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(${window.innerHeight}/2048 * 288px);
    background-color: var(--main-color);
    bottom: 0;
    font-size: calc((${window.innerHeight}/2048) * 120px);
    font-weight: 500;
    color: var(--white-color);
`;