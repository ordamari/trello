import React, { useEffect, useState } from 'react';
import { GrTextAlignFull } from 'react-icons/gr';
import { eventBusService } from '../../services/eventBusService';
import CloseBtn from '../CloseBtn';




export default function TaskDetailsDescription({ closeOtherInputs, description, updateTaskDescription, taskId }) {


  const [isInputOpen, setIsInputOpen] = useState(false);
  const [formText, setFormText] = useState(description);

  useEffect(() => {
    eventBusService.on('close-desc-input', onCloseInput)
  }, [])

  function onCloseInput() {
    setFormText(description);
    setIsInputOpen(false);
  }

  function onSubmitForm(ev) {
    ev.preventDefault();
    updateTaskDescription(formText, taskId)
    setIsInputOpen(false);
  }

  function onOpenInput(ev) {
    ev.stopPropagation();
    closeOtherInputs();
    setIsInputOpen(true);
  }

  return (
    <div className='task-details-description'>
      <div className="flex align-center">
        <p className="middle-title"><GrTextAlignFull /> Description</p>
        {description && !isInputOpen &&
          <button className="grey-btn" onClick={onOpenInput} >Edit</button>
        }
      </div>
      <div >

        <div>
          {isInputOpen ? (
            <form className="desc-form" onSubmit={onSubmitForm}>
              <textarea
                autoFocus={true}
                onClick={ev => { ev.stopPropagation() }}
                value={formText}
                onChange={({ target }) => setFormText(target.value)}
                placeholder="Add a more detailed description..."
              />
              <div className="flex align-center">
                <button onClick={onSubmitForm} className="blue-btn">Save</button>
                <CloseBtn onClick={onCloseInput} />
              </div>
            </form>
          ) : (
            <div>
              {description ? (
                <p onClick={onOpenInput} className="desc">{description}</p>
              ) : (
                <div
                  className="add-desc"
                  onClick={onOpenInput}
                >
                  <p>Add a more detailed description...</p>
                </div>
              )}
            </div>

          )}
        </div>
      </div>
    </div>
  )
}

