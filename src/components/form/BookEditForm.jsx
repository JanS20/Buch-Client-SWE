import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { AuthContext } from '../provider/AuthProvider.jsx';
import {
  validateISBN,
  validatePreis,
  validateRabatt,
  validateHomepage,
  validateDatum,
} from './inputValidator.js';

const BookChangeForm = ({ book, etag }) => {
  const { cToken } = useContext(AuthContext);
  const [editedBook, setEditedBook] = useState(book);
  const [formValid, setFormValid] = useState(true);
  const [isbnValidation, setIsbnValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [preisValidation, setPreisValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [rabattValidation, setRabattValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [datumValidation, setDatumValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [homepageValidation, setHomepageValidation] = useState({
    isValid: true,
    errorMessage: '',
  });

  const { id = 'default' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setFormValid(
      isbnValidation.isValid &&
        preisValidation.isValid &&
        rabattValidation.isValid &&
        datumValidation.isValid &&
        homepageValidation.isValid
    );
  }, [
    isbnValidation.isValid,
    preisValidation.isValid,
    rabattValidation.isValid,
    datumValidation.isValid,
    homepageValidation.isValid,
  ]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    let newValue;

    if (name === 'lieferbar') {
      newValue = checked;
    } else if (name === 'rating') {
      newValue = value ? parseInt(value, 10) : 0;
    } else if (name === 'schlagwoerter') {
      let schlagwoerter = editedBook.schlagwoerter || [];
      if (checked) {
        schlagwoerter.push(value);
      } else {
        schlagwoerter = schlagwoerter.filter((item) => item !== value);
      }
      newValue = schlagwoerter;
    } else {
      newValue = value;
    }

    setEditedBook({
      ...editedBook,
      [name]: newValue,
    });

    // Validation checks
    if (name === 'isbn') {
      const isValidISBN = validateISBN(value);
      setIsbnValidation({
        isValid: isValidISBN,
        errorMessage: isValidISBN ? '' : 'Muss eine gültige ISBN sein',
      });
    }

    if (name === 'preis') {
      const isValidPreis = validatePreis(value);
      setPreisValidation({
        isValid: isValidPreis,
        errorMessage: isValidPreis ? '' : 'Ungültiges Betragsformat',
      });
    }

    if (name === 'rabatt') {
      const isValidRabatt = validateRabatt(value);
      setRabattValidation({
        isValid: isValidRabatt,
        errorMessage: isValidRabatt
          ? ''
          : 'Muss ein gültiger Rabatt sein (z.B. 0.10)',
      });
    }

    if (name === 'datum') {
      const isValidDatum = validateDatum(value);
      setDatumValidation({
        isValid: isValidDatum,
        errorMessage: isValidDatum
          ? ''
          : 'Muss ein gültiges Datum sein (YYYY-MM-DD)',
      });
    }

    if (name === 'homepage') {
      const isValidHomepage = validateHomepage(value);
      setHomepageValidation({
        isValid: isValidHomepage,
        errorMessage: isValidHomepage
          ? ''
          : 'Muss eine gültige Homepage-URL sein (https://beispiel.com) ',
      });
    }
  };

  const handleBtenClick = async () => {
    try {
      const url = '/api/rest';
      const request = `/${id}`;
      if (!cToken) {
        throw new Error('No token available');
      }

      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/json',
        'If-Match': etag,
      };

      const bookDTO = {
        isbn: editedBook.isbn,
        rating: parseInt(editedBook.rating, 10),
        art: editedBook.art,
        preis: parseFloat(editedBook.preis),
        rabatt: parseFloat(editedBook.rabatt),
        lieferbar: editedBook.lieferbar,
        datum: editedBook.datum,
        homepage: editedBook.homepage,
        schlagwoerter: editedBook.schlagwoerter,
      };

      const response = await axios.put(url + request, bookDTO, { headers });

      if (response.status === 204) {
        navigate(`/details/${id}`);
      } else {
        console.error('Error occurred during PUT request:', response);
      }
    } catch (error) {
      console.error('Error occurred during PUT request:', error.message);
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            name="titel"
            label="Buchtitel"
            variant="outlined"
            value={editedBook.titel}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="isbn"
            label="ISBN"
            variant="outlined"
            value={editedBook.isbn}
            onChange={handleInputChange}
            error={!isbnValidation.isValid}
            helperText={isbnValidation.errorMessage}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Rating
            name="rating"
            value={editedBook.rating}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Checkbox
                name="lieferbar"
                checked={editedBook.lieferbar}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="Lieferbar"
          />
        </Grid>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="Art"
            name="art"
            value={editedBook.art}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel
              value="DRUCKAUSGABE"
              control={<Radio />}
              label="Druckausgabe"
            />
            <FormControlLabel value="KINDLE" control={<Radio />} label="Kindle" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="preis"
            label="Preis"
            variant="outlined"
            value={editedBook.preis}
            onChange={handleInputChange}
            error={!preisValidation.isValid}
            helperText={preisValidation.errorMessage}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="rabatt"
            label="Rabatt"
            variant="outlined"
            value={editedBook.rabatt}
            onChange={handleInputChange}
            error={!rabattValidation.isValid}
            helperText={rabattValidation.errorMessage}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="datum"
            label="Datum"
            variant="outlined"
            value={editedBook.datum}
            onChange={handleInputChange}
            error={!datumValidation.isValid}
            helperText={datumValidation.errorMessage}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="homepage"
            label="Homepage"
            variant="outlined"
            value={editedBook.homepage}
            onChange={handleInputChange}
            error={!homepageValidation.isValid}
            helperText={homepageValidation.errorMessage}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="typescript"
                checked={editedBook.schlagwoerter.includes('TYPESCRIPT')}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="TypeScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="javascript"
                checked={editedBook.schlagwoerter.includes('JAVASCRIPT')}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="JavaScript"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBtenClick}
            disabled={!formValid}
          >
            Bearbeiten
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

BookChangeForm.propTypes = {
  book: PropTypes.shape({
    titel: PropTypes.string,
    isbn: PropTypes.string,
    rating: PropTypes.number,
    art: PropTypes.string,
    preis: PropTypes.string,
    rabatt: PropTypes.string,
    lieferbar: PropTypes.bool,
    datum: PropTypes.string,
    homepage: PropTypes.string,
    schlagwoerter: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  etag: PropTypes.string.isRequired,
};

export default BookChangeForm;
