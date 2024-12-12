import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { AdminScreen } from "./screens/AdminScreen/AdminScreen";
import { UserScreen } from "./screens/UserScreen/UserScreen";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";

function App() {
  const currentRole = useSelector((state: RootState) => state.role.currentRole);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (currentRole === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentRole]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/room"
          element={isAdmin ? <AdminScreen /> : <UserScreen />}
        />
      </Routes>
    </Router>
  );
}

export default App;
