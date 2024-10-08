import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Alert, Button, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TableRec from '../table/TableRec';
import RecTable from '../table/RecTable';
import ByTitle from '../table/ByTitle';


const apiUrl = process.env.REACT_APP_API_BACKEND;
const ChartPeminjaman = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedCategoryBooks, setSelectedCategoryBooks] = useState([]); 
  const [selectedCategoryRecommendations, setSelectedCategoryRecommendations] = useState([]); 
  const [showTableRec, setShowTableRec] = useState(false); 
  const [showRecTable, setShowRecTable] = useState(false); 
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [showByTitle, setShowByTitle] = useState(false); 

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      const response = await axios.get(apiUrl + '/loan_data', {
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

  const fetchCategoryBooks = async (category) => {
    try {
      const response = await axios.post( apiUrl +'/find_books_and_recommendations_by_category', {
        category_title: category, 
        limit: 10
      });
      const data = response.data;
      setSelectedCategoryBooks(data.popular_books || []); 
      setSelectedCategoryRecommendations(data.recommendations || []);
      setShowTableRec(true);
      setShowRecTable(false); 
      setShowByTitle(false); 
    } catch (error) {
      console.error('Error fetching category books:', error);
      setError('Error fetching category books. Please try again later.');
    }
  };

  const handleRecommendation = async (bookTitle) => {
    try {
      const response = await axios.post( apiUrl + '/recommend', {
        input_book_title: bookTitle
      });
      const recommendations = response.data;
      console.log('Recommendations:', recommendations);
      setSelectedBookTitle(bookTitle); 
      setShowByTitle(true); 
      setShowTableRec(false); 
      setShowRecTable(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      
    }
  };

  const getTopAuthors = (data, topN = 10) => {
    const sortedBooks = data.slice().sort((a, b) => b.total_peminjam - a.total_peminjam);
    return sortedBooks.slice(0, topN);
  };

  const getTopCategories = (data, topN = 10) => {
    const categoryMap = {};
    data.forEach(item => {
      if (!categoryMap[item.kategori]) categoryMap[item.kategori] = 0;
      categoryMap[item.kategori] += item.total_peminjam;
    });

    const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
    return sortedCategories.slice(0, topN);
  };

  const getTopBooks = (data, topN = 10) => {
    const sortedBooks = data.slice().sort((a, b) => b.total_peminjam - a.total_peminjam);
    return sortedBooks.slice(0, topN);
  };

  const topAuthors = getTopAuthors(loanData);
  const topCategories = getTopCategories(loanData);
  const topBooks = getTopBooks(loanData);

  const handleShowTableRec = (category) => {
    setSelectedCategory(category);
    fetchCategoryBooks(category);
  };

  const handleShowChartPeminjaman = () => {
    setShowTableRec(false);
    setShowRecTable(false);
    setShowByTitle(false);
  };

  const handleShowRecTable = () => {
    setShowRecTable(true);
    setShowTableRec(false);
    setShowByTitle(false);
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>10 Penulis Terpopuler</Card.Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topAuthors.map(author => ({ name: author.penulis, total: author.total_peminjam }))} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>10 Kategori Terpopuler</Card.Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topCategories.map(([name, total]) => ({ name, total }))} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            {showTableRec ? (
              <div>
                <TableRec books={selectedCategoryBooks} category={selectedCategory} onRecommend={handleRecommendation} />
                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                  <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
                  <Button variant="primary" onClick={handleShowRecTable} style={{ marginLeft: '10px' }}>Lihat Rekomendasi</Button>
                </div>
              </div>
            ) : showRecTable ? (
              <div>
                <RecTable recommendations={selectedCategoryRecommendations} category={selectedCategory} />
                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                  <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
                </div>
              </div>
            ) : showByTitle ? (
              <div>
                <ByTitle selectedBookTitle={selectedBookTitle} /> {/* Menampilkan komponen ByTitle */}
                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                  <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
                </div>
              </div>
            ) : (
              <div>
                <Table striped bordered hover style={{ fontSize: '18px' }}>
                  <thead style={{ fontSize: '18px' }}>
                    <tr>
                      <th>Nama Kategori</th>
                      <th>Jumlah Buku</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '18px' }}>
                    {topCategories.map(([name, total], index) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{total}</td>
                        <td>
                          <Button variant="primary" onClick={() => handleShowTableRec(name)}>Lihat Data</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>10 Judul Buku Terpopuler</Card.Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topBooks.map(book => ({ name: book.judul, total: book.total_peminjam }))} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ChartPeminjaman;