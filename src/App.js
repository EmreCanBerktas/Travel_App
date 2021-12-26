import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { firebase } from "./firebase/initFirebase";
import Card from "./components/Card";
import { AuthProvider } from "./firebase/auth";
import Error from "./pages/Error";

//Components
import Navbar from "./components/Navbar";

//Pages
import Home from "./pages/Home";
import CreateAdvert from "./pages/CreateAdvert";
import { Container } from "@mui/material";
import Posts from "./pages/post/Posts";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Container maxWidth="lg" sx={{ marginTop: "150px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/createadvert" element={<CreateAdvert />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
