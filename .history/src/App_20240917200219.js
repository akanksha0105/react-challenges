import './App.css'
i
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
