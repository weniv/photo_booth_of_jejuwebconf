import { styled } from "styled-components";
import BackgroundImg from "../../assets/background.svg";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();
    const navigateToFrame = () => navigate("/frame");
    return (
        <Background onClick={navigateToFrame}>
            <MainBox>
                <h1>
                    <img src={Logo} alt="웹생네컷" />
                </h1>
            </MainBox>
            <Start>
                <strong>화면을 터치해주세요</strong>
            </Start>
        </Background>
    );
}

const Background = styled.main`
    background: url(${BackgroundImg}) 0 0 no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
`;

const MainBox = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Start = styled.div`
    background-color: #f6b25a;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #f3ce7d;
    }

    strong {
        color: #fff;
        font-family: Pretendard;
        font-size: 64px;
        font-weight: 800;
    }
`;
