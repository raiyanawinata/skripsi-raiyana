import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './TableNav.css'; 


const dbUrl = process.env.REACT_APP_DB_PERPUS;
const TablePeminjaman = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      const response = await axios.get(dbUrl + '/dataset_pinjam', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setLoanData(response.data);
    } catch (error) {
      console.error('Error fetching loan data:', error);
      setError('Error fetching loan data. Please try again later.');
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
        <Card.Title className="table-title text-purple mb-4">Data Peminjaman</Card.Title>
        <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'scroll', fontSize:'18px' }}>
          <Table bordered hover className="table-custom">
            <thead className="bg-purple text-white">
              <tr>
                <th>No.</th>
                <th>Judul Buku</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Tahun Terbit</th>
                <th>Total Peminjam</th>
              </tr>
            </thead>
            <tbody>
              {loanData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.judul}</td>
                  <td>{item.penulis}</td>
                  <td>{item.kategori}</td>
                  <td>{item.tahun_terbit}</td>
                  <td>{item.total_peminjam}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TablePeminjaman;
