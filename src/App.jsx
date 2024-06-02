import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/main/HomePage';
import BookEdit from './components/main/BookEdit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<BookEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
