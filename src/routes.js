import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
function MyRoutes() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
export default MyRoutes;