import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';
import PaginationComponent from '../../components/paginations/index'; 
import './Top10RecByTitle.css';

export default function Top10BookRecommendedByTitle({ bookselected, recommendations, onBack, koleksi }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Ubah sesuai jumlah item per halaman yang diinginkan

    const isInKoleksi = (judul, penulis) => {
        return koleksi.some(b => b.judul.toLowerCase() === judul.toLowerCase() && b.penulis.toLowerCase() === penulis.toLowerCase());
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className='card card-flush h-xl-100 border'>
            <div className="card-header pt-5">
                <div className="card-title align-items-center">
                    <button className="btn btn-icon" type='button' onClick={onBack}>
                        <i className="bi bi-arrow-left-circle fs-2x"></i>
                    </button>
                    <div className='d-flex ms-3'>
                        <div className='d-flex flex-column border border-dashed rounded p-3 bg-light'>
                            <span className="card-label fw-bold text-800">
                                Buku {bookselected.judul}
                            </span>
                            <span className="text-gray-500 pt-1 fw-semibold fs-6">Kategori <span className="custom-text-primary">{bookselected.kategori}</span></span>
                        </div>

                        <div className='d-flex flex-column mx-3 border border-dashed rounded p-3 bg-light'>
                            <span className="card-label fw-bold text-gray-800">
                                Penulis: {bookselected.penulis}
                            </span>
                            <div className="d-flex">
                                <span className="text-gray-500 pt-1 fw-semibold fs-6 me-2">Tahun terbit <span className="custom-text-primary">{bookselected.tahun_terbit}</span></span>
                                <span className="text-gray-500 pt-1 fw-semibold fs-6">· Dipinjam sebanyak <span className="custom-text-primary">{bookselected.total_peminjam}x</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body py-8">
                <h3>Daftar Buku Rekomendasi:</h3>
                <div className="table-responsive">
                    {recommendations.loading ? (
                        <Spinner animation="border" role="status" />
                    ) : recommendations.message ? (
                        <AlertNotif color="danger" message={recommendations.message} />
                    ) : recommendations.data.length > 0 ? (
                        <>
                            <table className="table table-row-dashed align-middle gs-0 gy-4" style={{ borderCollapse: 'collapse', color: '#7913A7' }}>
                                <thead className="thead-center">
                                    <tr className='fs-7 fw-bold'>
                                        <th>No</th>
                                        <th>Judul</th>
                                        <th>Penulis</th>
                                        <th>Kategori</th>
                                        <th>Rating</th>
                                        <th>Score</th>
                                        <th>Data di Koleksi</th>
                                    </tr>
                                </thead>
                                <tbody className="tbody-center" style={{ color: 'black' }}>
                                    {recommendations.data
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((v, index) => (
                                            <tr key={index} style={{ borderBottom: '0.5px solid #D9D9D9' }}>
                                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                <td>{v.judul}</td>
                                                <td>{v.penulis}</td>
                                                <td>{v.kategori}</td>
                                                <td>{v.rating}</td>
                                                <td>{v.hybrid_score}%</td>
                                                <td className='center-cell'>
                                                    {isInKoleksi(v.judul, v.penulis) ? (
                                                        <span className="text-danger">Sudah Tersedia</span>
                                                    ) : (
                                                        <span className="text-success">Belum Tersedia</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {recommendations.data.length > itemsPerPage &&
                                <PaginationComponent
                                    total={recommendations.data.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            }
                        </>
                    ) : (
                        <p>Belum ada data buku rekomendasi.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
