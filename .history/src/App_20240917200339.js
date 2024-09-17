import './App.css'
i
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Conten />} />
      </Routes>
    </Router>
  )
}

export default App
