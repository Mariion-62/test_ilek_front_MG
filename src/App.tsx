import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Quiz from "./Quiz/quiz";
import QuizAction from "./Quiz/quizAction";

function App() {
  return <> <div>
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/autres-quiz" element={<QuizAction />} />
      </Routes>
    </Router>
  </div>

  </>
}

export default App;
