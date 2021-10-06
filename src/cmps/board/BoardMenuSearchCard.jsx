import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import TaskUser from '../TakUser';


export default function BoardMenuSearchCard({
  board,
  choosenLabelsFilter,
  setChoosenLabelsFilter,
  choosenMembersFilter,
  setChoosenMembersFilter,
  filterIsMembersOrLabels,
  setFilterIsMembersOrLabels,
}) {

  const [searchParams, setSearchParams] = useState('')

  const colorsMap = {
    green: '#61bd4f',
    yellow: '#f2d600',
    orange: '#ff9f1a',
    red: '#eb5a46',
    purple: '#c377e0',
    blue: '#0079bf',
    'no-color': '#b3bac5'
  }

  function updateChoosenMember(user) {
    let newChoosenMembersFilter = null;
    const idxInChoosenMembersFilter = choosenMembersFilter.findIndex(member => member.id === user.id);
    if (idxInChoosenMembersFilter === -1) {
      newChoosenMembersFilter = [...choosenMembersFilter, user];
    }
    else {
      newChoosenMembersFilter = [...choosenMembersFilter]
      newChoosenMembersFilter.splice(idxInChoosenMembersFilter, 1);
    }
    setChoosenMembersFilter(newChoosenMembersFilter);
  }
  function updateChoosenLabels(idx) {
    let newChoosenLabelsFilter = null;
    const idxInChoosenLabelsFilter = choosenLabelsFilter.findIndex(labelIdx => labelIdx === idx);
    if (idxInChoosenLabelsFilter === -1) {
      newChoosenLabelsFilter = [...choosenLabelsFilter, idx];
    }
    else {
      newChoosenLabelsFilter = [...choosenLabelsFilter]
      newChoosenLabelsFilter.splice(idxInChoosenLabelsFilter, 1);
    }
    setChoosenLabelsFilter(newChoosenLabelsFilter);
  }


  return (
    <div className="search-card-container">
      <div className="input-container">
        <input
          type="text"
          value={searchParams}
          onChange={({ target }) => { setSearchParams(target.value) }}
        />
        <p>Search by term, label or member</p>
      </div>
      <div className="label-filters">
        {board.labels.map((label, idx) => {
          if (
            label.color.includes(searchParams.toLowerCase()) ||
            label.text.toLowerCase().includes(searchParams.toLowerCase())
          ) return (
            <div
              className={`label flex align-center ${choosenLabelsFilter.some(labelIdx => labelIdx === idx) ? 'choosen' : ''}`}
              onClick={() => { updateChoosenLabels(idx) }}
              key={idx}
            >
              <div className="label-color" style={{ backgroundColor: colorsMap[label.color] }}></div>
              <div className="data-container flex align-center justify-space-between">
                <p>{label.text ? label.text : `${label.color} label (default)`}</p>
                <AiOutlineCheck />
              </div>
            </div>
          )
        })
        }
      </div>
      <div className="member-filter">
        {board.members.map((member, idx) => {
          if (
            member.id.toLowerCase().includes(searchParams.toLowerCase()) ||
            member.userName.toLowerCase().includes(searchParams.toLowerCase())
          ) return (
            <div
              className={`member flex align-center ${choosenMembersFilter.some(filterMember => filterMember.id === member.id) ? 'choosen' : ''}`}
              onClick={() => { updateChoosenMember(member) }}
              key={idx}
            >
              <TaskUser user={member} />
              <div className="data-container flex align-center justify-space-between">
                <p>{member.userName} ({member.id})</p>
                <AiOutlineCheck />
              </div>
            </div>
          )
        })
        }
      </div>
      <div className="group-container">
        <div
          className={`option ${!filterIsMembersOrLabels ? 'choosen' : ''}`}
          onClick={() => { setFilterIsMembersOrLabels(false) }}
        >
          <div className="data-container flex align-center justify-space-between">
            <p>Matches any label and any member</p>
            <AiOutlineCheck />
          </div>
        </div>
        <div
          className={`option ${filterIsMembersOrLabels ? 'choosen' : ''}`}
          onClick={() => { setFilterIsMembersOrLabels(true) }}
        >
          <div className="data-container flex align-center justify-space-between">
            <p>Matches all label and all member</p>
            <AiOutlineCheck />
          </div>
        </div>
      </div>
    </div>
  )
}

