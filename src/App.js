import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from './components/Search.jsx'
import SearchPage from "./SearchPage";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search"  element={<SearchPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
