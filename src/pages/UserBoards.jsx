import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BoardPreview from '../cmps/board/BoardPreview';
import { eventBusService } from '../services/eventBusService';
import { templates } from '../services/templateService';
import { getBoardById, toggleBoardStar } from '../actions/boardActions';
import { AiFillStar, AiOutlineStar, FaTrello } from 'react-icons/all';




function _UserBoards(props) {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        eventBusService.emit('set-curr-page', 'user-boards');
        if (!props.loggedInUser) props.history.push('/login')
    }, [])

    useEffect(() => {
        if (props.loggedInUser) {
            updateUserBoards();
        }
    }, [props.loggedInUser?.boards])


    async function updateUserBoards() {
        const userBoards = props.loggedInUser.boards.map(boardId => props.getBoardById(boardId))
        Promise.all(userBoards).then(boardRes => {
            setBoards(boardRes)
        })
    }

    return (
        <div className="main-container user-boards">
            <div className="user-bords-title">
                <FaTrello />
                <h3>Most popular template</h3>
            </div>
            <div className="templates">

                <div className="boards-container">
                    {templates.map((template) => (
                        <BoardPreview
                            key={template.id}
                            board={template}
                            history={props.history}
                        />
                    ))

                    }
                </div>
                <button>Show all templates</button>
            </div>

            {   boards.find(board => board.isStared) &&
                <>
                    <div className="user-bords-title">
                        <AiFillStar />
                        <h3>Starred boards</h3>
                    </div>
                    <div className="boards-container">
                        {boards.map((board) => {
                            return (

                                board.isStared &&
                                <BoardPreview
                                    key={board._id}
                                    board={board}
                                    history={props.history}
                                    toggleBoardStar={props.toggleBoardStar}
                                    updateUserBoards={updateUserBoards}
                                />
                            )
                        })
                        }
                    </div>
                </>
            }
            {   boards.find(board => !board.isStared) &&
                <>
                    <div className="user-bords-title">
                        <AiOutlineStar />
                        <h3>Other boards</h3>
                    </div>
                    <div className="boards-container">
                        {boards.map((board) => {
                            return (

                                !board.isStared &&
                                <BoardPreview
                                    key={board._id}
                                    board={board}
                                    history={props.history}
                                    toggleBoardStar={props.toggleBoardStar}
                                    updateUserBoards={updateUserBoards}
                                />
                            )
                        })
                        }
                    </div>
                </>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedinUser
    }
}
const mapDispatchToProps = {
    getBoardById,
    toggleBoardStar
}
export default connect(mapStateToProps, mapDispatchToProps)(_UserBoards)