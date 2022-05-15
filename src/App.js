import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar.js";
import { ThemeContext } from "./ThemeContext.js";
import PostPage from "./components/pages/PostPage.js";
import HomePage from "./components/pages/HomePage.js";
import LoginPage from "./components/pages/LoginPage.js";
import ProfilePage from "./components/pages/ProfilePage.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CreatePostPage from "./components/pages/CreatePostPage.js";
import RegisterPage from "./components/pages/RegisterPage.js";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><CreatePostPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/search/:query" element={<HomePage />} />
            <Route path="/user/:userId" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <div className="footer">My Blog. All rights reserved</div>
      </div>
    </Router>
  );
}

export default App;

//https://github.com/basir/react-awesome-blog