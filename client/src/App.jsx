import React from "react";
import AppRouter from "./components/AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
      <BrowserRouter>
          <NavBar/>
          <div className="pt-10">
              <AppRouter/>
          </div>
      </BrowserRouter>
  );
}

export default App;
