import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskUser from '../TakUser';


export default function BoardMembers({ members }) {


  return (
    <Droppable droppableId="members" direction="horizontal" type="members">
      {(provided) => (
        <div
          className="members flex align-center"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {members.map((user, idx) => (
            <Draggable
              draggableId={user.id}
              index={idx}
              key={idx}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <TaskUser user={user} />
                </div>
              )
              }
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  )
}

