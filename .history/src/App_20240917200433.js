import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ContentListing from './features/contentListing'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentListing />} />
      </Routes>
    </Router>
  )
}

export default App
