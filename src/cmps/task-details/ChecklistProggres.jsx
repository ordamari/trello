import React from 'react';


export default function ChecklistProggres({
  getCheckedPrecent,
}) {


  return (
    <div className="proggres-bar-container">
      <p>{getCheckedPrecent()}%</p>
      <div className="proggres-bar">
        <div
          className={`inner ${getCheckedPrecent() === 100 ? 'complete' : ''}`}
          style={{ width: getCheckedPrecent() + '%' }}
        >
        </div>
      </div>
    </div>
  )
}

