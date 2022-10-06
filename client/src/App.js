import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Dashboard, Error, Landing, Register} from "./pages/index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
