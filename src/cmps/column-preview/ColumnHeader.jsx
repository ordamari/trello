import React, { useEffect, useState } from 'react';
import MenuBtn from '../MenuBtn';
import PopColumnMenu from '../pop/PopColumnMenu';
import useWindowDimensions from '../../services/useWindowDimensions';
import { eventBusService } from '../../services/eventBusService';




export default function ColumnHeader({
  closeColumnsInputAndMenu,
  updateColumnName,
  provided,
  column,
  removeColumn,
  coppiedColumn,
  board,
  moveList
}) {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    eventBusService.on('close-columns-input-and-menu', () => {
      setIsFormOpen(false);
      setMenuIsOpen(false);
    })
  }, [])

  function submitForm(ev) {
    ev.preventDefault();
    setIsFormOpen(false);
  }

  function toggleIsMenuOpen(ev) {
    if (ev) ev.stopPropagation();
    if (!menuIsOpen) closeColumnsInputAndMenu();
    setMenuIsOpen(prevState => !prevState);
  }

  function onOpenForm(ev) {
    if (ev) ev.stopPropagation();
    closeColumnsInputAndMenu();
    setIsFormOpen(true)
  }


  return (
    <div className="column-header">
      <div className="title-container">
        {isFormOpen ? (
          <form onSubmit={submitForm}>
            <input autoFocus={true} type="text" value={column.title} onChange={({ target }) => { updateColumnName(target.value, column.id) }} />
          </form>
        ) : (
          <h3 onClick={onOpenForm} {...provided.dragHandleProps}>{column.title}</h3>

        )
        }
      </div>
      <div className="menu-container">
        {menuIsOpen &&
          <PopColumnMenu
            height={height}
            width={width}
            toggleIsMenuOpen={toggleIsMenuOpen}
            column={column}
            removeColumn={removeColumn}
            coppiedColumn={coppiedColumn}
            board={board}
            moveList={moveList}
          />
        }
      </div>
      <MenuBtn onClick={toggleIsMenuOpen} />
    </div>
  )
}

