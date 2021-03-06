import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import "./Styles/App.css";
import "./Styles/Button.css";
import "./Styles/Home.css";
import "./Styles/Orbit.css";
import "./Styles/Volunteer.css";
import "./Styles/Input.css";
import "./Styles/Admin.css";
import "./Styles/Table.css";
import { AuthContext } from "./helpers/AuthContext";
import { Hero } from "./Pages/Home/Hero";
import { Volunteer } from "./Pages/Volunteer/Volunteer";
import { AdminLogin } from "./Pages/Admin/AdminLogin";
import { AdminPanel } from "./Pages/Admin/AdminPanel";
import { useState, useEffect } from "react";
import { Messages } from "./Pages/Admin/Messages";
import { UntrainedVolunteers } from "./Pages/Admin/UntrainedVolunteers";
import { InTraining } from "./Pages/Admin/InTraining";
import { NotFound } from "./Pages/NotFound";
function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/untrained" element={<UntrainedVolunteers />} />
          <Route path="/training" element={<InTraining />} />
          <Route
            path="/admin"
            element={authState ? <AdminPanel /> : <AdminLogin />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
