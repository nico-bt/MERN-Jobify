import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/register" element={<h1>Register</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
