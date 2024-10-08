import React from 'react'

export default function LayoutUI({ children }) {
    return (
        <div className="d-flex flex-column flex-root app-root ">
            <div className="app-page  flex-column flex-column-fluid ">
                <div className="app-wrapper  flex-column flex-row-fluid ">
                    <div className="app-container  container-fluid d-flex flex-row flex-column-fluid ">
                        <main className='app-main flex-column flex-row-fluid '>
                            <div className="d-flex flex-column flex-column-fluid">
                                <div className="app-content  flex-column-fluid">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
