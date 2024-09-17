import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'




const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ContentListing />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
