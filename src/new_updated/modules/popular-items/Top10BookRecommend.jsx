// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Spinner } from 'react-bootstrap';
// import { AlertNotif } from '../../components/alerts';
// import './Top10RecByCategories.css';
// const apiUrl = process.env.REACT_APP_API_BACKEND;
// const dbUrl = process.env.REACT_APP_DB_PERPUS;

// export default function Top10BookRecommend({ activeCateg }) {
//     const [bookRecom, setBookRecom] = useState({ loading: false, data: [], message: "" });
//     const [koleksi, setKoleksi] = useState([]);

//     useEffect(() => {
//         const fetchKoleksi = async () => {
//             try {
//                 const response = await axios.get(dbUrl + '/biblio');
//                 setKoleksi(response.data);
//             } catch (error) {
//                 console.error('Error fetching koleksi:', error);
//             }
//         };

//         fetchKoleksi();
//         fetchRecommendedBookByCateg(activeCateg[0], setBookRecom);
//     }, [activeCateg[0]]);

//     const isInKoleksi = (judul, penulis) => {
//         return koleksi.some(b => b.judul.toLowerCase() === judul.toLowerCase() && b.penulis.toLowerCase() === penulis.toLowerCase());
//     };

//     return (
//         <div className='card card-flush h-xl-100 border'>
//             <div className="card-header pt-5">
//                 <h3 className="card-title align-items-start flex-column">
//                     <span className="card-label fw-bold text-gray-800">
//                         Buku Rekomendasi
//                     </span>
//                     <span className="text-gray-500 pt-1 fw-semibold fs-6">
//                         Kategori <span className="custom-text-primary">{activeCateg[0]}</span>
//                     </span>
//                 </h3>
//             </div>
            
//             <div className="card-body">
//                 <div className="table-responsive">
//                     {bookRecom.loading ? (
//                         <Spinner animation="border" role="status" />
//                     ) : bookRecom.message ? (
//                         <AlertNotif color="danger" message={bookRecom.message} />
//                     ) : bookRecom.data.recommendations && bookRecom.data.recommendations.length > 0 ? (
//                         bookRecom.data.recommendations.map((v, index) => (
//                             <div key={index} className="book-recom-item-container mb-4">
//                                 <div className='book-recom-item'>
//                                     <span className="text-gray-800 fw-bold text-hover-primary fs-6 d-block">
//                                         {v.judul}
//                                     </span>
//                                     <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">
//                                         Penulis: {v.penulis}
//                                     </span>
//                                     <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">
//                                         Rating: {v.rating}/5
//                                     </span>
//                                 </div>
//                                 <div className='d-flex align-items-center border-0'>
//                                     <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">Skor Kesamaan: {v.hybrid_score}%</span>
//                                 </div>
//                                 <div className="availability-status" style={{ flexGrow: 1 }}>
//                                         {isInKoleksi(v.judul, v.penulis) ? (
//                                             <div>
//                                                 <span className="text-danger">Sudah Tersedia</span> | <span className="text-gray-500">Belum Tersedia</span>
//                                             </div>
//                                         ) : (
//                                             <div>
//                                                 <span className="text-gray-500">Sudah Tersedia</span> | <span className="text-success">Belum Tersedia</span>
//                                             </div>
//                                         )}
//                                     </div>

//                             </div>
//                         ))
//                     ) : (
//                         <p>Belum ada data buku rekomendasi.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const fetchRecommendedBookByCateg = async (category, setBookRecom) => {
//     setBookRecom({ loading: true, data: [], message: "" });
//     try {
//         const response = await axios.post(apiUrl + '/find_books_and_recommendations_by_category', {
//             category_title: category,
//             limit: 10
//         });
//         setBookRecom({ loading: false, data: response.data, message: "" });
//     } catch (error) {
//         console.error('Error fetching loan data:', error);
//         setBookRecom({ loading: false, data: [], message: "Terjadi kesalahan dalam koneksi ke server. Silakan coba lagi nanti." });
//     }
// };
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';
import PaginationComponent from '../../components/paginations/index'; // Pastikan path sudah benar
import './Top10RecByCategories.css';

const apiUrl = process.env.REACT_APP_API_BACKEND;
const dbUrl = process.env.REACT_APP_DB_PERPUS;

export default function Top10BookRecommend({ activeCateg }) {
    const [bookRecom, setBookRecom] = useState({ loading: false, data: [], message: "" });
    const [koleksi, setKoleksi] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchKoleksi = async () => {
            try {
                const response = await axios.get(dbUrl + '/biblio');
                setKoleksi(response.data);
            } catch (error) {
                console.error('Error fetching koleksi:', error);
            }
        };

        fetchKoleksi();
        fetchRecommendedBookByCateg(activeCateg[0], setBookRecom);
    }, [activeCateg[0]]);

    const isInKoleksi = (judul, penulis) => {
        return koleksi.some(b => b.judul.toLowerCase() === judul.toLowerCase() && b.penulis.toLowerCase() === penulis.toLowerCase());
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='card card-flush h-xl-100 border'>
            <div className="card-header pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-gray-800">
                        Buku Rekomendasi
                    </span>
                    <span className="text-gray-500 pt-1 fw-semibold fs-6">
                        Kategori <span className="custom-text-primary">{activeCateg[0]}</span>
                    </span>
                </h3>
            </div>
            
            <div className="card-body">
                <div className="table-responsive">
                    {bookRecom.loading ? (
                        <Spinner animation="border" role="status" />
                    ) : bookRecom.message ? (
                        <AlertNotif color="danger" message={bookRecom.message} />
                    ) : bookRecom.data.recommendations && bookRecom.data.recommendations.length > 0 ? (
                        <>
                            {bookRecom.data.recommendations
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((v, index) => (
                                    <div key={index} className="book-recom-item-container mb-4">
                                        <div className='book-recom-item'>
                                            <span className="text-gray-800 fw-bold text-hover-primary fs-6 d-block">
                                                {v.judul}
                                            </span>
                                            <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">
                                                Penulis: {v.penulis}
                                            </span>
                                            <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">
                                                Rating: {v.rating}/5
                                            </span>
                                        </div>
                                        <div className='d-flex align-items-center border-0'>
                                            <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">Skor Kesamaan: {v.hybrid_score}%</span>
                                        </div>
                                        <div className="availability-status" style={{ flexGrow: 1 }}>
                                            {isInKoleksi(v.judul, v.penulis) ? (
                                                <div>
                                                    <span className="text-danger">Sudah Tersedia</span> | <span className="text-gray-500">Belum Tersedia</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="text-gray-500">Sudah Tersedia</span> | <span className="text-success">Belum Tersedia</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            {bookRecom.data.recommendations.length > itemsPerPage &&
                                <PaginationComponent
                                    total={bookRecom.data.recommendations.length}
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
    );
}

const fetchRecommendedBookByCateg = async (category, setBookRecom) => {
    setBookRecom({ loading: true, data: [], message: "" });
    try {
        const response = await axios.post(apiUrl + '/find_books_and_recommendations_by_category', {
            category_title: category
        });
        setBookRecom({ loading: false, data: response.data, message: "" });
    } catch (error) {
        console.error('Error fetching loan data:', error);
        setBookRecom({ loading: false, data: [], message: "Terjadi kesalahan dalam koneksi ke server. Silakan coba lagi nanti." });
    }
};
