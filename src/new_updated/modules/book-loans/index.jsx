import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';
import TableData from './TableData';
import Top10BookRecommendedByTitle from '../book-recommended/Top10BookRecommendedByTitle';
import './TopBookLoans.css'; 

export function TopBookLoans({ loanData }) {
    //state ini digunakan untuk menyimpan buku yg dipilih oleh pengguna. jika buku dipilih, komponen akan menampilkan rekomendasi buku berdasarkan buku yg dipilih tsb.
    const [selectedBook, setSelectedBook] = useState();

    //fungsi ini digunakan untuk memperbarui state selectedBook dengan data buku yg dipilih
    const HandlerSelectedBook = (data) => {
        setSelectedBook(data);
    }

    //jika ada buku yg dipilih maka komponen Top10Book akan ditampilkan
    //jika tidak ada buku yg dipilih, maka akan menampilkan kompinen tableData dalam sebuah card dengan judul Daftar Buku Peminjaman
    if (selectedBook) {
        return <Top10BookRecommendedByTitle bookselected={selectedBook} HandlerSelectedBook={HandlerSelectedBook} />
    } else {
        return (
            <div className='card card-flush h-xl-100 border'>
                <div className="card-header pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span 
                        className="card-label fw-bold text-gray-800 custom-title-color">
                            Daftar Buku Peminjaman
                        </span>
                    </h3>
                </div>
                <div className="card-body py-3">
                    {loanData.loading ? <Spinner animation="border" role="status"></Spinner> :
                        loanData.message ? <AlertNotif color="danger" message={loanData.message} /> :
                            Object.values(loanData.data).length > 0 ? (
                                <TableData data={loanData.data} HandlerSelectedBook={HandlerSelectedBook} />
                            ) : ""
                    }
                </div>
            </div>
        )
    }
}
