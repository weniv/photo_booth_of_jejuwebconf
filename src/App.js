import GlobalStyles from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import { StartPage, SnapPage, FramePage, PrintPage, DownloadPage } from "./components/pages";
import { useState } from "react";

function App() {
    const [result, setResult] = useState([]);

    return (
        <div className="App">
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/frame" element={<FramePage />} />
                <Route path="/snap" element={<SnapPage setResult={setResult} />} />
                <Route path="/print" element={<PrintPage result={result} />} />
                <Route path="/download/:imgUrl/*" element={<DownloadPage />} />
                <Route path="/*" element={<StartPage />} />
            </Routes>
        </div>
    );
}

export default App;
