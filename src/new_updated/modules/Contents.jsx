import React, { useEffect, useState } from 'react';
import { TopBookLoans } from './book-loans';
import { CalculateCard } from './calculate-books';
import { CardDataMaster } from './calculate-books/CalculateCard';
import PopularItems from './popular-items';
import axios from 'axios';
import './Contents.css'; // Import file CSS

const dbUrl = process.env.REACT_APP_DB_PERPUS;

export default function Contents() {
  //menyimpan data peminjaman
  const [loanData, setLoadData] = useState({ loading: false, data: [], message: "" });
  //menyimpan jumlah koleksi buku
  const [collectionCount, setCollectionCount] = useState(0);
  //menyimpan jumlah klasifikasi buku
  const [classificationCount, setClassificationCount] = useState(0);
  //menyimpan jumlah klasifikasi buku yg telah dipinjam
  const [loanClassificationCount, setLoanClassificationCount] = useState(0);

  //digunakan untk memanggil fungsi fetch
  useEffect(() => {
    fetchLoanData(setLoadData);
    fetchCollectionCount(setCollectionCount);
    fetchClassificationCount(setClassificationCount);
    fetchLoanClassificationCount(setLoanClassificationCount);
  }, []);

  const currentCollectionBook = { total: collectionCount, name: "Total koleksi" };
  const currentBookLoan = { total: Object.values(loanData.data).length, name: "Total dipinjam" };
  const currentTotalCategory = { total: classificationCount, name: "Total koleksi" };
  const currentTotalLoanByCategory = { total: loanClassificationCount, name: "Total dipinjam" };

  const navTabs = [
    { id: 1, name: "Daftar Buku Dipinjam", content: "nav-loan-book", component: <TopBookLoans loanData={loanData} /> },
    { id: 2, name: "Buku Populer", content: "nav-popularity", component: <PopularItems loanData={loanData} /> }
  ];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="my-5 row">
        <div className="col-6 col-lg-4">
          <CardDataMaster />
        </div>
        <div className="col-6 col-lg-4">
          <CalculateCard title="Koleksi Buku" original={currentCollectionBook} calculate={currentBookLoan} />
        </div>
        <div className="col-6 col-lg-4">
          <CalculateCard title="Kategori Buku" original={currentTotalCategory} calculate={currentTotalLoanByCategory} />
        </div>
      </div>
      <ul className="nav nav-underline my-10" role="tablist" id="nav-tab">
        {navTabs.map((v, index) => (
          <li
            key={index}
            className={`nav-link fw-bold ${activeTab === index ? 'active' : ''}`}
            id={"menu-" + v.content}
            data-bs-toggle="tab"
            data-bs-target={"#" + v.content}
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {v.name}
          </li>
        ))}
      </ul>
      <div className="tab-content" id='nav-tabContent'>
        {navTabs[activeTab].component}
      </div>
    </>
  );
}

const fetchLoanData = async (setLoanData) => {
  setLoanData({ loading: true, data: [], message: "" });
  try {
    const response = await axios.get(dbUrl + '/dataset_pinjam', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    setLoanData({ loading: false, data: response.data, message: "" });
  } catch (error) {
    console.error('Error fetching loan data:', error);
    setLoanData({ loading: false, data: [], message: "Terjadi kesalahan dalam koneksi ke server. Silakan coba lagi nanti." });
  }
};

const fetchCollectionCount = async (setCollectionCount) => {
  try {
    const response = await axios.get(dbUrl + '/biblio/count');
    setCollectionCount(response.data.count);
  } catch (error) {
    console.error("Error Fetching collection count: ", error);
  }
};

const fetchClassificationCount = async (setClassificationCount) => {
  try {
    const response = await axios.get(dbUrl + '/biblio/classification/count');
    setClassificationCount(response.data.count);
  } catch (error) {
    console.error("Error Fetching classification count: ", error);
  }
};

const fetchLoanClassificationCount = async (setLoanClassificationCount) => {
  try {
    const response = await axios.get(dbUrl + '/data_peminjam/classification/count');
    setLoanClassificationCount(response.data.unique_classification_count);
  } catch (error) {
    console.error("Error Fetching classification count: ", error);
  }
};
