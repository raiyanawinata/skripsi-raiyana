import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './TableNav.css'; 


const apiUrl = process.env.REACT_APP_API_BACKEND;
const ByTitle = ({ selectedBookTitle }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedBookTitle) {
      fetchRecommendations(selectedBookTitle);
    }
  }, [selectedBookTitle]);

  const fetchRecommendations = async (bookTitle) => {
    try {
      const response = await axios.post(apiUrl + '/recommend', {
        input_book_title: bookTitle
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Error fetching recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card className="mt-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Card.Body>
        <Card.Title className="table-title text-purple mb-4">Rekomendasi Buku untuk "{selectedBookTitle}"</Card.Title>
        <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'scroll', fontSize:'18px' }}>
          <Table bordered hover className="table-custom">
            <thead className="bg-purple text-white">
              <tr>
                <th>No.</th>
                <th>Judul Buku</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Tahun Terbit</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.judul}</td>
                  <td>{book.penulis}</td>
                  <td>{book.kategori}</td>
                  <td>{book.tahun_terbit}</td>
                  <td>{book.rating}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ByTitle;
