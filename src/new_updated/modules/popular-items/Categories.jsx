import React from 'react'

export default function Categories({ data, activeCateg, setActiveCateg }) {
    return (
        <div className='card card-flush h-xl-100 border'>
            <div className="card-header pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-gray-800">
                        Top 10 Kategori
                    </span>
                    <span className="text-gray-500 pt-1 fw-semibold fs-6">Berdasarkan banyaknya buku dipinjam</span>
                </h3>
            </div>
            <div className="card-body d-flex align-items-start">
                <div className="w-100">
                    {data.map((v, index) => (
                        <div className={"d-flex align-items-center justify-content-between p-3  rounded cursor-pointer "+(activeCateg[0] === v[0] ? "bg-light-primary":"bg-hover-light-primary")} key={index} onClick={()=>setActiveCateg(v)}>
                            <div className="symbol symbol-30px me-5">
                                <span className="symbol-label">
                                    <span className="fs-3 text-gray-600">{index + 1}</span>
                                </span>
                            </div>
                            <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
                                <div className="me-5">
                                    <span className="text-gray-800 fw-bold text-hover-primary fs-6">
                                        {v[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <span className="text-gray-800 fw-bold fs-4 me-3">
                                    {v[1]}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
