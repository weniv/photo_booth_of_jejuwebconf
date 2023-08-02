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
    padding-bottom: 288px;
`;

const FrameWrap = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 824px;
    margin: 0 104px;
    gap: 46px;
`
const Frame = styled.div`
    img {
        width: 469px;
        height: 824px;
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
        width: 80px;
        height: 80px;
        background-color: var(--gray-color);
        border-radius: 50%;
        margin-top: 86px;
        cursor: pointer;

        &:checked {
            width: 126px;
            height: 126px;
            margin-top: 73px;
            background-color: var(--main-color);

            &::after {
                content: url(${checkIcon});
                width: 62.5px;
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
    height: 288px;
    background-color: var(--main-color);
    bottom: 0;
    font-size: 120px;
    font-weight: 500;
    color: var(--white-color);
`;