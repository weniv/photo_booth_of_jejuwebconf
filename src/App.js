import {BrowserRouter, Routes, Route} from "react-router-dom"
import { StartPage, SnapPage } from "./components/index"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/snap" element={<SnapPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
