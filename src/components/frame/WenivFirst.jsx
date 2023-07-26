import React from "react";
import { styled } from "styled-components";
import Background from "../../assets/weniv_type1_print.svg";
import Camera from "../Camera";

export default function WenivFirst({ ref }) {
    return (
        <FrameBg ref={ref}>
            <FrameBox>
                <Camera />
                <Camera />
                <Camera />
                <Camera />
            </FrameBox>
        </FrameBg>
    );
}

const FrameBg = styled.div`
    width: 350px;
    height: 609px;
    background: url(${Background}) no-repeat;
    background-size: cover;
`;

const FrameBox = styled.div`
    padding: 120px 0 33px 23px;
    display: flex;
    flex-wrap: wrap;
`;
