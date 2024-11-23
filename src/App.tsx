import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { AdminScreen } from "./screens/AdminScreen/AdminScreen";
import { UserScreen } from "./screens/UserScreen/UserScreen";

function App() {
  const [user, setUser] = useState<User | null>(null);

  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/admin"
          element={user ? <AdminScreen /> : <LoginScreen />}
        />
        <Route path="/user" element={user ? <UserScreen /> : <LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
