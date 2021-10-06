import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

export default function ColumnAdd({ addColumn }) {

  const [isOpen, setIsOpen] = useState(false);
  const [columnName, setColumnName] = useState('');

  function onAddColumn() {
    addColumn(columnName);
    onClose();
  }

  function onClose() {
    setIsOpen(false);
    setColumnName('');
  }


  return (
    <div className='column-add'>
      {
        isOpen ? (
          <div className='open'>
            <form>

              <input autoFocus={true} value={columnName} onChange={({ target }) => { setColumnName(target.value) }} type="text" placeholder="Enter list title..." />
              <button className="blue-btn" onClick={onAddColumn} >Add list</button>
              <div className="close-btn" onClick={onClose}><CloseIcon /></div>
            </form>
          </div>
        ) : (
          <div onClick={() => setIsOpen(true)} className='close'>
            <AddIcon  />
            <p>Add another list</p>
          </div>
        )
      }
    </div>
  )
}

