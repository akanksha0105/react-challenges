import './App.css'
i
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div className="app">
      <NavBar />

      <div className="content">
        <GridComponent />
      </div>
    </div>
  )
}

export default App
