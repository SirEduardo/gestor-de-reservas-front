import { Route, Routes } from "react-router-dom";
import { RequestProvider } from "./utils/Hooks/useRequest";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  const apiUrl = "https://localhost:3000/api/v1";

  return (
    <RequestProvider url={apiUrl}>
      <div className="h-svh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </RequestProvider>
  );
}

export default App;
