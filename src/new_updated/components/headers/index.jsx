import React from 'react'

export function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-md fixed-top border-bottom bg-white">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <img src={require("../../asstes/media/logoIbik.png")} alt="logo-ibik" className="me-2" style={{ width: "40px", height: "40px" }} />
                        <div className='fw-bolder'>
                            <span className="d-block">Perpustakaan</span>
                            <span>IBI Kesatuan</span>
                        </div>
                    </div>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" type='button'>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id='navbarCollapse'>
                        <ul className="navbar-nav me-auto mb-2 mb-md-0"></ul>

                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <span className="nav-link active">Home</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Home</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Home</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
