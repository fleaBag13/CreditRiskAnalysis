import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Predict from "./components/Predict";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-primary">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/predict" element={<Predict />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
