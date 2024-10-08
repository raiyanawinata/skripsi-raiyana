import React from 'react'

const CardDataMaster = () => {
    return (
        <div  className="card h-xl-100 border" style={{ backgroundColor: '#7913A7' }}>
            <div className="card-body d-flex justify-content-between flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-center mb-5">
                    <img src={require("../../asstes/media/logoIbik.png")} alt="logo-ibik" className='w-45px me-2' />
                    <div className="d-flex flex-column text-white fs-4 justify-content-center">
                        <span className='fw-bold text-white'>Perpustakaan</span>
                        <span className='fw-bold text-white'>IBI Kesatuan</span>
                    </div>

                </div>
                {/* <div className="d-flex justify-content-between w-100">
                    <button className="btn btn-primary" type='button'>
                        Sync DB Perpus
                    </button>
                    <button className="btn btn-light-danger" type='button'>
                        Re-Load Scrapper
                    </button>
                </div> */}
            </div>
        </div>
    )
}

const CalculateCard = ({ title, original, calculate }) => {
    return (
        <div className="card card-flush h-xl-100 border">
            <div className="card-header py-0">
                <h3 className="card-title align-items-start flex-column m-0">
                    <span className="card-label fw-bold text-gray-800">
                        {title}
                    </span>
                </h3>
            </div>
            <div className="card-body d-flex justify-content-between flex-column align-items-center pt-0">
                <div className="d-flex flex-wrap">
                    <div className="border-end-dashed border-end border-gray-300 pe-7 me-5">
                        <div className="d-flex">
                            <span className="fs-2hx fw-bold me-2 lh-1 ls-n2" >
                                {original.total}
                            </span>
                        </div>
                        <span className="fs-6 fw-bold 500" style={{color: '#D9D9D9'}}>
                            {original.name}
                        </span>
                    </div>
                    <div className="m-0">
                        <div className="d-flex align-items-center">
                            <span className="fs-2hx fw-bold me-2 lh-1 ls-n2">
                                {calculate.total}
                            </span>
                        </div>
                        <span className="fs-6 fw-bold 500" style={{color: '#D9D9D9'}}>
                            {calculate.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export { CardDataMaster, CalculateCard }