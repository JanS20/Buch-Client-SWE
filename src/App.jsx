import './App.css'
import Navbar from './components/navbar'

function App() {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/rest'); // Angenommen, dein Endpunkt ist /api/data
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Daten in der Konsole anzeigen
    } catch (error) {
      console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    }
  };

  return (
    <>
      <Navbar />
        <button onClick={fetchData}>
          Daten laden
        </button>
    </>
  )
}

export default App

