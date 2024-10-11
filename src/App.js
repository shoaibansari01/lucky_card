
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdmin from './components/SuperAdmin';
import CreateAdmin from './components/CreateAdmin';
import Successfull from './components/Successfull';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<SuperAdmin />}></Route>
          <Route path="/create" element={<CreateAdmin />}></Route>
          <Route path="/success" element={<Successfull />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;



 
    