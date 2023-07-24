import {BrowserRouter, Routes, Route} from "react-router-dom"
import PrintPage from "./components/PrintPage";
import { StartPage, SnapPage,  } from "./components/index"
import { useState } from "react";


function App() {
  const [picture, setPicture] = useState([])

  return (
    <div className="App">
      <picContext value={{picture, setPicture}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/snap" element={<SnapPage picture={picture} setPicture={setPicture}/>}/>
            <Route path="/print" element={<PrintPage picture={picture} />}/>
          </Routes>
        </BrowserRouter>
      </picContext>
    </div>
  );
}

export default App;
