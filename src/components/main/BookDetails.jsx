import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../provider/useAuth.js';
import BookDetailsForm from '../form/BookDetailsForm.jsx';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id = 'default' } = useParams();
  const [notFound, setNotFound] = useState(false);
  const { Token } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      const url = '/api/rest';
      const request = `/${id}`;
      try {
        const response = await axios.get(url + request);
        if (response.status === 200) {
          if (response.data) {
            setBook(response.data);
            setNotFound(false);
          } else {
            console.error(
              'BookDetails.fetchBook: response.data ist undefiniert'
            );
          }
        } else {
          throw new Error(
            `BookDetails.fetchBook: Statuscode: ${response.status}`
          );
        }
      } catch (error) {
        console.error('BookDetails.fetchBook:', error.message);
        setNotFound(true);
        setBook(null);
      }
    };
    fetchBook();
  }, [id]);

  const deleteBook = async (id) => {
    if (!Token) {
      console.error('BookDetails.deleteBook: Kein Token vorhanden');
      return;
    }
    
    const headers = {
      Authorization: `Bearer ${Token}`
    };
    const url = `/api/rest/${id}`;
    try {
      const response = await axios.delete(url, { headers });
        if (response.status !== 204) {
          throw new Error(
            `BookDetails.deleteBook: Kein 200 Status-Code, sondern:${response.status}`
          );
        }
        setBook(null);
      } catch (error) {
        console.error('BookDetails.deleteBook:', error.message);
      }
  };

  if (!book) {
    if (notFound) {
      return <div>Book not found</div>;
    }
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <BookDetailsForm
        book={book}
        deleteBook={deleteBook}
      />
    </div>
  );
};

export default BookDetails;
