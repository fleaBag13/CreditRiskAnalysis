import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Predict from "./components/Predict";
import Navbar from "./components/Navbar";
import QandA from "./components/QandA";

function App() {
  return (
    <div className="bg-secondary">
      <Navbar />
      <Router>
        <Routes>    
          <Route exact path="/" element={<Home />} />
          <Route exact path="/predict" element={<Predict />} />
          <Route exact path="/chatbot" element={<QandA />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
