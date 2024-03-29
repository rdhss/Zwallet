import React from 'react'

const Graphic = () => {
    return (
        <div className="b-2 d-md-flex border1 w-50 d-none justify-content-between">
            <div className="border1 w-100 h-100 bg-light">
                <div className="d-flex justify-content-between h-20 w-100 align-items-center mt-4 px-4">
                    <div>
                        <img src="image/arrow-down-green.png" alt="" />
                        <p>Income</p>
                        <h6>Rp2.120.000</h6>
                    </div>
                    <div>
                        <img src="image/arrow-up-red.png" alt="" />
                        <p>Expense</p>
                        <h6>Rp2.120.000</h6>
                    </div>
                </div>
                <div className="graphic d-flex justify-content-center align-items-center pt-4 w-100 h-50 mt-4">
                    <img src="image/graphic.png" width='260vh'  alt="" className="" />
                </div>
            </div>
        </div>
    )
}

export default Graphic
