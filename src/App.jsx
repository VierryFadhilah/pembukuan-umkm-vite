import React, { useState, useEffect } from "react";
import LoginPage from "./Component/LoginPage";

import MainApp from "./Component/MainApp";

function App() {
  const [logStatus, setLogStatus] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setLogStatus(JSON.parse(userData));
      } else {
        setLogStatus();
      }
    } catch (error) {
      // Tangani kesalahan pengambilan data lokal di sini
    }
  }, [loading]);

  let items;
  if (logStatus) {
    items = <MainApp />;
  } else {
    items = <LoginPage setLoading={setLoading} />;
  }

  if (loading) {
    return (
      <>
        <div className="">Loading ....</div>
      </>
    );
  }

  return (
    <>
      <div className="App">{items}</div>
    </>
  );
}

export default App;
