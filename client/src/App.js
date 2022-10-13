import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Landing, Register, ProtectedRoute} from "./pages/index"
import {AllJobs, AddJob, Profile, Stats, SharedLayout} from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute> <SharedLayout /> </ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
