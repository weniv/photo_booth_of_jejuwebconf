import {BrowserRouter, Routes, Route} from "react-router-dom"
import GlobalStyles from "./styles/GlobalStyle";
import { StartPage, SnapPage, FramePage, PrintPage  } from "./components/index"
import { useState } from "react";


function App() {
  const [picture, setPicture] = useState([])

  return (
    <div className="App">
      <GlobalStyles/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/frame" element={<FramePage/>}/>
            <Route path="/snap" element={<SnapPage picture={picture} setPicture={setPicture}/>}/>
            <Route path="/print" element={<PrintPage picture={picture} />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
