import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminScreen } from "./screens/AdminScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
