import React, { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { GrTextAlignFull } from 'react-icons/gr';
import TaskPreviewChecklist from './TaskPreviewChecklist';
import TaskPreviewDate from './TaskPreviewDate';


export default function TaskPreviewData({ task, updateTaskDate }) {


  return (
    <div className='task-preview-data'>
      {task.isWatched &&
        <div className="task-preview-icon-container">
        <FiEye />
        </div>
      }
      {task.date &&
        <TaskPreviewDate 
        date={task.date} 
        taskId={task.id}
        updateTaskDate={updateTaskDate}
        />
      }
      {task.description &&
      <div className="task-preview-icon-container">
        <GrTextAlignFull />
      </div>
      }
      { !!task.checklists.length &&
        <TaskPreviewChecklist checklists= {task.checklists} />
      }
    </div>
  )
}

