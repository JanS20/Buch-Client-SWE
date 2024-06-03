import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h3" component="h1" gutterBottom>
          BUCHWEB
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          component={Link}
          to="/add"
          variant="contained"
          color="primary"
          style={{ marginBottom: '10px' }}
        >
          Add Book
        </Button>
        <Button
          component={Link}
          to="/search"
          variant="contained"
          color="primary"
          style={{ marginBottom: '10px' }}
        >
          Search Books
        </Button>
        <Button
          component={Link}
          to="/edit/1"
          variant="contained"
          color="primary"
          style={{ marginBottom: '10px' }}
        >
          Edit Book 1
        </Button>
        <Button
          component={Link}
          to="/details/1"
          variant="contained"
          color="primary"
          style={{ marginBottom: '10px' }}
        >
          Book Details 1
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
