import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import downloadBg from "../../assets/downloadBg.svg"

export default function DownloadPage() {
    const location = useLocation();
    const url = "https://conf.weniv.co.kr/media/images/" + location.pathname.split("download/")[1];

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
            <img src={url} alt="" />
            <button type="button" onClick={downloadFile}>Download</button>
        </Cont>
    );
}

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-image: url(${downloadBg});
    background-repeat: no-repeat;
    background-size: cover;
    gap: 30.97px;

    img {
        width: 220px;
        height: 387.03px;
        background-color: var(--gray-color);
    }

    button {
        width: 130px;
        height: 36px;
        background-color: var(--main-color);
        color: var(--white-color);
        font-weight: 500;
        font-size: 16px;
        border-radius: 39px;
        border: none;
    }
`
