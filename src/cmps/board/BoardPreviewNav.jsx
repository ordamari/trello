import React, { useEffect, useState } from 'react';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import { useHistory } from "react-router";

export default function BoardPreviewNav({ board, boardSearch,toggleBoardStar }) {

    const history = useHistory();

    function getStyle() {
        const { background } = board;
        if (background.type === 'color') return { backgroundColor: background.cover }
        return { backgroundImage: `url(${background.cover})` }
    }

    function onBoardClick(ev) {
        ev.stopPropagation();
        if (board.id) history.push(`/template/${board.id}`)
        else history.push(`/board/${board._id}`)
    }

    async function onToggleIsStar(ev) {
        ev.stopPropagation();
        await toggleBoardStar(board);
        history.push(`/board/${board._id}`)
    }

    return (
        <div
            style={getStyle()}
            className="board-preview-nav flex"
            onClick={onBoardClick}
        >
            <div
                className="picture"
                style={getStyle()}
            >
                <div className="white"></div>
            </div>
            <div className="board-info flex align-center">
                <div className="name">
                    <h3>{board.title}</h3>
                    {
                        !board.title.toLowerCase().includes(boardSearch.toLowerCase()) &&
                        Object.values(board.columns).some(column => column.title.toLowerCase().includes(boardSearch.toLowerCase())) &&
                        <p>List:{Object.values(board.columns).find(column => column.title.toLowerCase().includes(boardSearch.toLowerCase())).title}</p>
                    }
                    {
                        !board.title.toLowerCase().includes(boardSearch.toLowerCase()) &&
                        !Object.values(board.columns).some(column => column.title.toLowerCase().includes(boardSearch.toLowerCase())) &&
                        <p>Card:{Object.values(board.tasks).find(task => task.title.toLowerCase().includes(boardSearch.toLowerCase())).title}</p>
                    }

                </div>
                <GradeOutlinedIcon onClick={onToggleIsStar} className={`star ${board.isStared?'starred':'not-starred'}`} />
            </div>
        </div>
    )
}

