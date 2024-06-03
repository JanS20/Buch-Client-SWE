import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Beachte den korrekten Pfad
//import HomePage from './components/main/HomePage'; // Beachte den korrekten Pfad
import BookEdit from './components/main/BookEdit'; // Beachte den korrekten Pfad
import BookSearch from './components/main/BookSearch';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route path="/edit/:id" element={<BookEdit />} />
      </Routes>
    </>
  );
}

export default App;
