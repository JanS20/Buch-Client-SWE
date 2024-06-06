import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Beachte den korrekten Pfad
import BookEdit from './components/main/BookEdit'; // Beachte den korrekten Pfad
import BookSearch from './components/main/BookSearch';
import AddNewBook from './components/main/AddNewBook'; // Beachte den korrekten Pfad
import BookDetails from './components/main/BookDetails'; // Stelle sicher, dass der Pfad korrekt ist
import HomePage from './components/main/HomePage'; // Beachte den korrekten Pfad
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/edit/:id" element={<BookEdit />} />
        <Route path="/add" element={<AddNewBook />} />
        <Route path="/details/:id" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
