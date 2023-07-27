import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyle";
import { StartPage, SnapPage, FramePage, PrintPage } from "./components/pages";
import { useState } from "react";

function App() {
    const [result, setResult] = useState([]);

    return (
        <div className="App">
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path={process.env.PUBLIC_URL + "/"} element={<StartPage />} />
                    <Route path={process.env.PUBLIC_URL + "/frame"} element={<FramePage />} />
                    <Route path={process.env.PUBLIC_URL + "/snap"} element={<SnapPage setResult={setResult} />} />
                    <Route path={process.env.PUBLIC_URL + "/print"} element={<PrintPage result={result} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
