import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebaseConfig";
import LoginPage from "./Component/LoginPage";
import Sidebar from "./Component/Sidebar";
import Home from "./Component/Home";
import Dashboard from "./Component/pages/Dashboard";
import Roles from "./Component/pages/Roles/Index";
import AddRoles from "./Component/pages/Roles/AddRoles";
import { UpdateRoles } from "./Component/pages/Roles/UpdateRoles";

function App() {
  const [logStatus, setLogStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setLogStatus(true);
      } else {
        setLogStatus(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="App">
        {logStatus ? (
          <>
            <div className="container-fluid">
              <div className="row">
                <Sidebar />

                <div className="container">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/roles/tambah" element={<AddRoles />} />
                    <Route
                      path="/roles/edit/:id"
                      loader={({ params }) => {
                        params.id;
                      }}
                      element={<UpdateRoles />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </>
  );
}

export default App;
