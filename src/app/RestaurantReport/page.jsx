import React from 'react'
import "./RestaurantReport.css"
import Link from 'next/link'

const RestaurantReport = () => {
  return (
    <div className='restaurant-report flex'>
      <h2>Report</h2>
      <div className="report-list-headings flex">
        <div className="report-list-heading">
          Date
        </div>
        <div className="report-list-heading">
          Title
        </div>
        
      </div>
      <hr/>
      <div className="report-list-items flex">
        <div className="report-date">2024-5-1</div>
        <Link href="/ReportMay">May 2024 Monthly report</Link>  
      </div>
      <hr/>
      <div className="report-list-items flex">
        <div className="report-date">2024-4-1</div>
        <Link href="/">Arpil 2024 Monthly report</Link>
        
      </div>
      <hr/>
      <div className="report-list-items flex">
        <div className="report-date">2024-3-1</div>
        <Link href="/">March 2024 Monthly report</Link>
        
      </div>
      <hr/>
    </div>
  )
}

export default RestaurantReport