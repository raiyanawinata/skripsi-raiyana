import React from 'react';
import { Table } from 'react-bootstrap';

const RecTable = ({ recommendations, category }) => {
  return (
    <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'scroll', fontSize: '18px' }}>
      <h3>Top 10 Recommendations for {category}</h3>
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
          {recommendations && recommendations.map((book, index) => ( // Periksa apakah recommendations ada sebelum memanggil map()
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
  );
};

export default RecTable;
