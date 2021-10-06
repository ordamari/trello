import React, { useEffect, useState } from 'react';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';



export default function BoardPreview({
    board,
    history,
    toggleBoardStar,
    updateUserBoards
}) {

    async function onToggleIsStar(ev) {
        ev.stopPropagation();
        await toggleBoardStar(board);
        updateUserBoards();
    }

    function getStyle() {
        const { background } = board;
        if (background.type === 'color') return { backgroundColor: background.cover }
        return { backgroundImage: `url(${background.cover})` }
    }

    function onBoardClick() {
        if (board.id) history.push(`/template/${board.id}`)
        else history.push(`/board/${board._id}`)
    }


    return (
        <div
            style={getStyle()}
            className="board-preview flex column align-start justify-space-between"
            onClick={onBoardClick}
        >
            <div className="">
                {board.id &&
                    <p>TEMPLATE</p>
                }
                <h3>{board.title}</h3>
            </div>
            {board._id &&
                <div
                    className={`${board.isStared ? 'stared' : 'dont-stared'}`}
                    onClick={() => { }}
                >
                    <GradeOutlinedIcon onClick={onToggleIsStar} />
                </div>
            }
        </div>
    )
}

