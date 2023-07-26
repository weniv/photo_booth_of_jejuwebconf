import { styled } from "styled-components";
import Background from "../../assets/weniv_type2_print.svg";
import Cover from "../../assets/weniv_type2_cover.svg";
import Camera from "../Camera";
import { useState } from "react";

export default function WenivSecond({ ref }) {
    const [isDone, setIsDone] = useState(false);
    return (
        <FrameBg ref={ref}>
            <FrameBox>
                <Camera />
                <Camera />
                <Camera />
                <Camera />
            </FrameBox>
            {isDone && <FrameCover />}
        </FrameBg>
    );
}

const FrameBg = styled.div`
    position: relative;
    width: 350px;
    height: 609px;
    background: url(${Background}) no-repeat;
    background-size: cover;
`;

const FrameBox = styled.div`
    padding: 43px 0 33px 23px;
    display: flex;
    flex-wrap: wrap;
`;

const FrameCover = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(${Cover}) no-repeat;
    background-size: cover;
`;
