import React, { useState, useMemo, useEffect } from "react";
import axios from 'axios';
import { TextSearch } from "../../components/text-box";
import { ButtonRefresh } from "../../components/buttons";
import PaginationComponent from "../../components/paginations";
import Top10BookRecommendedByTitle from "../book-recommended/Top10BookRecommendedByTitle";
import './TableData.css'; 

const apiUrl = process.env.REACT_APP_API_BACKEND;
const dbUrl = process.env.REACT_APP_DB_PERPUS;


//STATE INITIALIZATION
//STATE digunakan untuk mengelola jumlah item, halaman saat ini, kata kunci pencarian, sorting, buku yg dipilih, rekomendasi buku, ID buku yg sedang di-load dan data koleksi buku
export default function TableData({ data }) {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [selectedBook, setSelectedBook] = useState(null);
    const [recommendations, setRecommendations] = useState({ loading: false, data: [], message: "" });
    const [loadingBookId, setLoadingBookId] = useState(null);
    const [koleksi, setKoleksi] = useState([]);
    const ITEMS_PER_PAGE = 20;

    //useEffect digunakan untuk mengambil data koleksi buku dari database ketika koponen pertama kali di render
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
    }, []);

    //ResultData adalah data yg te;ah di filter, diurutkan dan dipaginasi berdasarkan pencarian, sorting dan halaman saat ini.
    //useMemo digunakan untuk mengoptimalkan inerja dengan menghindari perhitungan ulang yg tidak perlu
    const ResultData = useMemo(() => {
        let computedData = data;
        if (search) {
            computedData = computedData.filter((listData) => {
                return Object.keys(listData).some(
                    (key) =>
                        listData[key]
                            .toString()
                            .toLowerCase()
                            .includes(search)
                );
            });
        }
        computedData.sort((a, b) => (a.total_pinjam > b.total_pinjam ? 1 : -1));
        setTotalItems(computedData.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedData = computedData.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        if (computedData.length > 0) {
            return computedData.slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
            );
        } else {
            return [];
        }
    }, [data, currentPage, search, sorting]);

    //fungsi ini mengambil rekomendasi buku berdasarkan judul buku yg dipilih, lalu menyimpannya dalam state recommendation
    const fetchRecommendations = async (book) => {
        setLoadingBookId(book.judul);
        setRecommendations({ loading: true, data: [], message: "" });
        try {
            const response = await axios.post(apiUrl + '/recommend', {
                input_book_title: book.judul
            });
            setRecommendations({ loading: false, data: response.data, message: "" });
            setSelectedBook(book);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setRecommendations({ loading: false, data: [], message: "Terjadi kesalahan dalam koneksi ke server. Silakan coba lagi nanti." });
        } finally {
            setLoadingBookId(null);
        }
    };

    return (
        <div className="table-responsive">
            {selectedBook ? (
                <Top10BookRecommendedByTitle bookselected={selectedBook} recommendations={recommendations} onBack={() => setSelectedBook(null)} koleksi={koleksi} />
            ) : (
                <>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <TextSearch onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div>
                            <ButtonRefresh totalItem={totalItems} />
                        </div>
                    </div>
                    <table className="table table-row-dashed align-middle gs-0 gy-4" style={{ borderCollapse: 'collapse', color: '#7913A7' }}>
                        <thead className="thead-center" style={{ borderBottom: '0.5px solid #D9D9D9' }}>
                            <tr className='fs-7 fw-bold'>
                                <th className='w-10px'>No</th>
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th>Penulis</th>
                                <th>Tahun Terbit</th>
                                <th>Total Pinjam</th>
                                <th>Cari Rekomendasi</th>
                            </tr>
                        </thead>
                        <tbody className="tbody-center" style={{color: 'black'}}>
                            {ResultData.map((v, index) => (
                                <tr key={index} style={{ borderBottom: '0.5px solid #D9D9D9' }}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                                    <td>{v.judul}</td>
                                    <td>{v.kategori}</td>
                                    <td>{v.penulis}</td>
                                    <td>{v.tahun_terbit}</td>
                                    <td>{v.total_peminjam}</td>
                                    <td>
                                        <button
                                            className="btn btn-icon btn-sm btn-light"
                                            type="button"
                                            onClick={() => fetchRecommendations(v)}
                                            disabled={loadingBookId === v.judul}
                                        >
                                            {loadingBookId === v.judul ? (
                                                <i className="bi bi-hourglass-split"></i> 
                                            ) : (
                                                <i className="bi bi-search"></i>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {totalItems > 0 ? (
                        <div className="footer">
                            <PaginationComponent
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    ) : ""}
                </>
            )}
        </div>
    );
}
