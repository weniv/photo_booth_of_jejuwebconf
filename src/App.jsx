import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyle";
import { FrameProvider } from "./context/FrameContext";
import { StartPage, FramePage, SnapPage, PrintPage } from "./components/pages/index";

function App() {
    const [picture, setPicture] = useState([]);

    return (
        <div className="App">
            <GlobalStyles />
            <FrameProvider>
                <picContext value={{ picture, setPicture }}>
                    <Routes>
                        <Route path="/" exact={true} element={<StartPage />} />
                        <Route path="/frame" element={<FramePage />} />
                        <Route path="/snap" element={<SnapPage picture={picture} setPicture={setPicture} />} />
                        <Route path="/print" element={<PrintPage picture={picture} />} />
                    </Routes>
                </picContext>
            </FrameProvider>
        </div>
    );
}

export default App;
