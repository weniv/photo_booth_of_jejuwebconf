import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import mainImg from "../../assets/main_img.svg"

export default function StartPage() {
    const navigate = useNavigate();

    return (
        <Wrap onClick={() => navigate("/frame")}>
            <Cont>
                <Img src={mainImg} alt="" />
            </Cont>
            <Btn>
                <p>화면을 터치해주세요</p>
            </Btn>
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

const Img = styled.img`
    width:45.02387073081vw;
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
    font-size: 20%;

    p {
        font-size: calc((${window.innerHeight}/2048) * 120px);
        font-weight: 500;
        color: var(--white-color);
    }
`;
