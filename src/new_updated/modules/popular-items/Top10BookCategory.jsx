import React from 'react'
import './Top10Categories.css'

export default function Top10BookCategory({ activeCateg, loandata }) {
    const bookCateg = loandata.filter(item => item.kategori === activeCateg[0]);
    console.log(bookCateg);
    const top10 = bookCateg.slice(0, 10);

    return (
        <div className='card card-flush h-xl-100 border'>
            <div className="card-header pt-5 pb-0"> {/* Mengurangi padding-bottom */}
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-gray-800">
                        Top 10 Buku Dipinjam
                    </span>
                    <span className="text-gray-500 pt-1 fw-semibold fs-6">
                        Kategori <span className="custom-text-primary2">{activeCateg[0]}</span>
                    </span>
                </h3>
            </div>
            <div className="card-body pt-2 pb-5"> {/* Mengurangi padding-top */}
                <div className="w-100">
                    {top10.map((v, index) => (
                        <div key={index}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
                                    <div className="me-5">
                                        <span className="text-gray-800 fw-bold text-hover-primary fs-6">{v.judul}</span>
                                        <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">{v.penulis}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <span className='text-gray-800 fs-6 me-3 text-center'>
                                        <span className="d-block">
                                            Dipinjam
                                        </span>
                                        <span className="fw-bold">{v.total_peminjam}x</span>
                                    </span>
                                    <span className="badge badge-light-success fs-base">{v.tahun_terbit}</span>
                                </div>
                            </div>
                            <div className="separator separator-dashed my-3"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
