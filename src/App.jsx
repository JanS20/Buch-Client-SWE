import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './components/Main/BookDetails.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/details/:id" element={<Details />} />    
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

