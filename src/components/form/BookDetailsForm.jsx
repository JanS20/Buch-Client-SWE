import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Rating, Button, Box, Divider, Link, IconButton, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';

import ConfirmDelete from '../dialog/ConfirmDelete.jsx';

const BookDetailsForm = ({ book, deleteBook }) => {
  const {
    isbn,
    rating,
    art,
    preis,
    rabatt,
    lieferbar,
    datum,
    homepage,
    schlagwoerter,
    titel: { titel },
  } = book;
  const formatPreis = (preis) => (preis ? preis.toFixed(2) : 'N/A');
  const renderNullableValue = (value) => (value ? value : 'N/A');
  const exists = (value) => value !== null && value !== undefined;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { id = 'default' } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:400px)');

  const handleBtenClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    deleteBook(id);
    setDeleteConfirmation(false);
    navigate('/search');
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box p={2} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }} textAlign="center">
            {titel}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Rating name="read-only" value={rating} readOnly />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" textAlign="center" sx={{ fontSize: '2rem', color: 'hsl(30deg 83% 59%)' }}>
            <strong></strong> {formatPreis(preis)}€
          </Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Typography variant="body1" textAlign="left" >
            <strong>Rabatt:</strong> {exists(rabatt) ? `${rabatt}%` : 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography variant="body1" textAlign="left">
            <strong>Datum:</strong> {renderNullableValue(new Date(datum).toLocaleDateString())}
          </Typography>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography variant="body1" textAlign="left">
            <strong>ISBN:</strong> {isbn}
          </Typography>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography variant="body1" textAlign="left">
            <strong>Schlagwörter:</strong> {exists(schlagwoerter[0]) ? schlagwoerter.join(', ') : 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={1} />
        <Grid item xs={7}>
          <Typography variant="body1" textAlign="left">
            <strong>Art:</strong> {renderNullableValue(art)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Box
              width={16}
              height={16}
              bgcolor={lieferbar ? 'green' : 'red'}
              borderRadius={1}
              mr={1}
            />
            <Typography variant="body1" textAlign="left">
              {exists(lieferbar)
                ? `Buch kann ${lieferbar ? '' : 'leider nicht'} geliefert werden`
                : 'Lieferstatus unbekannt'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontSize: '1.5rem'}} textAlign="center">
            <strong>Homepage: </strong>
            {exists(homepage) ? (
              <Link href={homepage} target="_blank" rel="noopener noreferrer">
                {homepage}
              </Link>
            ) : (
              'N/A'
            )}
          </Typography>
        </Grid>
        {!isMobile && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <IconButton
              color="primary"
              onClick={handleBackClick}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handleBtenClick}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
        {isMobile && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackClick}
              startIcon={<ArrowBackIcon />}
              style={{ marginRight: 8 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBtenClick}
              startIcon={<EditIcon />}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteClick}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
      <ConfirmDelete
        open={deleteConfirmation}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

BookDetailsForm.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    art: PropTypes.string.isRequired,
    preis: PropTypes.number.isRequired,
    rabatt: PropTypes.number.isRequired,
    lieferbar: PropTypes.bool.isRequired,
    datum: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    schlagwoerter: PropTypes.arrayOf(PropTypes.string).isRequired,
    titel: PropTypes.shape({
      titel: PropTypes.string.isRequired,
      untertitel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default BookDetailsForm;
