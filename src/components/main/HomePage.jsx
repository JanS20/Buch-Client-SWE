import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: 'darkorange' }}>Buch</span>
          <span style={{ color: 'black' }}>Web</span>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
  <Box display="flex" flexDirection="column" alignItems="center" style={{ marginRight: '20px' }}>
    <Button
      component={Link}
      to="/add"
      variant="contained"
      color="primary"
      style={{ marginBottom: '10px', width: '300px', height: '120px', fontSize: '1.3rem', fontWeight: 'bold'}}
    >
      Add Book
    </Button>
    <Button
      component={Link}
      to="/edit/1"
      variant="contained"
      color="primary"
      style={{ marginBottom: '10px', width: '300px', height: '120px', fontSize: '1.3rem', fontWeight: 'bold'}}
    >
      Edit Book 1
    </Button>
  </Box>
  <Box display="flex" flexDirection="column" alignItems="center">
  <Button
      component={Link}
      to="/search"
      variant="contained"
      color="primary"
      style={{ marginBottom: '10px', width: '300px', height: '120px', fontSize: '1.3rem', fontWeight: 'bold'}}
    >
      Search Books
    </Button>
    <Button
      component={Link}
      to="/details/1"
      variant="contained"
      color="primary"
      style={{ marginBottom: '10px', width: '300px', height: '120px', fontSize: '1.3rem', fontWeight: 'bold'}}
    >
      Book Details1
    </Button>
  </Box>
</Box>
    </Container>
  );
}

export default HomePage;
