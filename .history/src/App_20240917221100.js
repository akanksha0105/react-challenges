import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ContentListing from './features/ContentListing'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentListing />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}

export default App
