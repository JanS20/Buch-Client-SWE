import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar'; // Beachte den korrekten Pfad
import BookEdit from './components/main/BookEdit'; // Beachte den korrekten Pfad
import AddNewBook from './components/main/AddNewBook'; 
import BookSearch from './components/main/BookSearch';// Beachte den korrekten Pfad
import BookDetails from './components/main/BookDetails'; // Stelle sicher, dass der Pfad korrekt ist
import HomePage from './components/main/HomePage'; // Beachte den korrekten Pfad
import { useAuth } from './components/provider/useAuth';

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/edit/:id" element={isLoggedIn() ? <BookEdit /> : <HomePage />} />
        <Route path="/add" element={isLoggedIn() ? <AddNewBook /> : <HomePage />} />
        <Route path="/details/:id" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
