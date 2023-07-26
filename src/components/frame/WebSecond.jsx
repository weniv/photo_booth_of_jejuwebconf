import { styled } from "styled-components";
import Cover from "../../assets/webconf_cover.svg";
import Camera from "../Camera";

export default function WebSecond({ ref }) {
    return (
        <FrameBg ref={ref}>
            <FrameBox>
                <Camera />
                <Camera />
                <Camera />
                <Camera />
            </FrameBox>
            <FrameCover src={Cover} />
        </FrameBg>
    );
}

const FrameBg = styled.div`
    position: relative;
    width: 350px;
    height: 609px;
    background-color: #fff;
`;

const FrameBox = styled.div`
    padding: 120px 0 33px 23px;
    display: flex;
    flex-wrap: wrap;
`;

const FrameCover = styled.img`
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
`;
