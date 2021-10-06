import React, { useEffect, useState } from 'react';
import BoardPreview from './board/BoardPreview';
import BoardPreviewNav from './board/BoardPreviewNav';


export default function NavSearchedBoards({
    getBoardById,
    loggedInUser,
    boardSearch,
    toggleBoardStar
}) {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        if (loggedInUser) {
            updateUserBoards();
        }
    }, [loggedInUser?.boards])

    async function updateUserBoards() {
        const userBoards = loggedInUser.boards.map(boardId => getBoardById(boardId))
        Promise.all(userBoards).then(boardRes => {
            setBoards(boardRes)
        })
    }

    function filterBoards() {
        return boards.filter(board => (
            board.title.toLowerCase().includes(boardSearch.toLowerCase()) ||
            Object.values(board.columns).some(column => column.title.toLowerCase().includes(boardSearch.toLowerCase())) ||
            Object.values(board.tasks).some(task => task.title.toLowerCase().includes(boardSearch.toLowerCase()))
        ))
    }

    return (
        <div className='nav-search-boards'>
            { filterBoards().some(board => board.isStared) &&
                <>
                    <h3 className="mini-title">STARRED BOARDS</h3>
                    <div className="boards-container">
                        {filterBoards().map((board) => {
                            return (

                                board.isStared &&
                                <BoardPreviewNav
                                    board={board}
                                    boardSearch={boardSearch}
                                    key={board._id}
                                    toggleBoardStar={toggleBoardStar}
                                />
                            )
                        })}
                    </div>
                </>
            }
            { filterBoards().some(board => !board.isStared) &&
                <>
                    <h3 className="mini-title">OTHER BOARDS</h3>
                    <div className="boards-container">
                        {filterBoards().map((board) => {
                            return (

                                !board.isStared &&
                                <BoardPreviewNav
                                    board={board}
                                    boardSearch={boardSearch}
                                    key={board._id}
                                    toggleBoardStar={toggleBoardStar}
                                />
                            )
                        })}
                    </div>
                </>
            }
            {!filterBoards().length &&
                <div className="not-found">
                    <p>We couldn't find any cards or boards that matched your search.</p>
                </div>
            }
        </div>
    )
}