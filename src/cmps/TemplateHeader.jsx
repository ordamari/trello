import React, { useEffect, useState } from 'react';
import { boardService } from '../services/boardService';


export default function TemplateHeader({ template,createBoardFromTemplate,user,history }) {

  async function onCreateBoardFromTemplate(){
    const board = await createBoardFromTemplate(template.id,user);
    history.push(`/board/${board._id}`)
  }



  return (
    <div className="template-header">
      <div className="container">
        <h3>{template.title}</h3>
        <p>TEMPLATE</p>
      </div>
      <button onClick={onCreateBoardFromTemplate} >Create board from template</button>
    </div>
  )
}

