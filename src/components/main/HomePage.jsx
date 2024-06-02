import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/edit/1">Edit Book 1</Link>
    </div>
  );
}

export default HomePage;