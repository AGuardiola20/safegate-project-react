import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthProvider";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AdminScreen } from "./screens/AdminScreen/AdminScreen";
import { UserScreen } from "./screens/UserScreen/UserScreen";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
