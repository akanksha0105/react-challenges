import './App.css'
import GridComponent from './components/GridComponent'
import NavBar from './components/NavBar'
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
