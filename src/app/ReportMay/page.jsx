import React from 'react'
import "./ReportMay.css"

const ReportMay = () => {
  return (
    <div className='report-may flex'>
      <h2>May 2024  Monthly revenue report</h2>
      <div className="report-list-items flex">
        <div className="report-title">Date</div>
        <div className="report-item">2024-5-1  to  2024-5-31</div>  
      </div>
      <hr/>
      <div className="report-list-items flex">
        <div className="report-title">Total orders</div>
        <div className="report-item">78</div>  
      </div>
      <hr/>
      <div className="report-list-items flex">
        <div className="report-title">Total Avenue</div>
        <div className="report-item">$10,000</div>  
      </div>
      <hr/>
      <div className="report-list-items flex">
        <div className="report-title">Average order amount</div>
        <div className="report-item">$135</div>  
      </div>
      <hr/>
      
    </div>
  )
}

export default ReportMay