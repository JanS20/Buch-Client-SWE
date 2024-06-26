import { Link } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Box mt={5} mb={3}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" gutterBottom>
            Willkommen zu BuchWeb!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Nutzen Sie die folgenden Quicklinks, um schnell und einfach die Funktionalität der Weboberfläche zu testen:
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component={Link}
            to="/add"
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, width: '200px', height: '60px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Add Book
          </Button>
          <Button
            component={Link}
            to="/edit/1"
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, width: '200px', height: '60px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Edit Book 1
          </Button>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, width: '200px', height: '60px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Search Books
          </Button>
          <Button
            component={Link}
            to="/details/1"
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, width: '200px', height: '60px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Book Details 1
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
