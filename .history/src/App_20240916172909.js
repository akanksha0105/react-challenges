import './App.css'
import GridComponent from './components/GridComponent'
import NavBar from './components/NavBar'

function App() {
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
