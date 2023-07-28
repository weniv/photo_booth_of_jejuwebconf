import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Confetti from "../../assets/confetti.svg";

export default function DownloadPage() {
    const location = useLocation();
    const url = "https://" + location.pathname.split("download/:")[1];

    const downloadFile = () => {
        fetch(url, { method: "GET" })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "weniv4cut";
                document.body.appendChild(a);
                a.click();
                setTimeout((_) => {
                    window.URL.revokeObjectURL(url);
                }, 60000);
                a.remove();
            })
            .catch((err) => {
                console.error("err: ", err);
            });
    };

    return (
        <Cont>
            <Frame>
                <img src={url} />
            </Frame>
            <button onClick={() => downloadFile()}>download</button>
        </Cont>
    );
}

const Cont = styled.div`
    with: 100vw;
    height: 100vh;
    padding: 0 15vw;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: url(${Confetti}) no-repeat;
    background-size: cover;

    button {
        background: #ed7a3a;
        color: #fff;
        font-weight: bold;
        border: none;
        width: 120px;
        height: 35px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

const Frame = styled.div`
    width: 100%;

    img {
        width: 100%;
        box-shadow: 0px 4px 44px 0px rgba(0, 0, 0, 0.1);
    }
`;
