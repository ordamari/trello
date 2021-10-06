import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { createBoardFromTemplate } from '../actions/boardActions';
import Board from '../cmps/board/Board';
import TemplateHeader from '../cmps/TemplateHeader';
import { boardService } from '../services/boardService';
import { eventBusService } from '../services/eventBusService';
import { templates } from '../services/templateService';

function _Template(props) {

    const [template, setTemplate] = useState(boardService.getEmptyBoard());

    useEffect(() => {
        eventBusService.emit('set-curr-page', 'template');
        setTemplate(templates.find(template => template.id === props.match.params.id))
    }, [])



    function getBoardPageStyle() {
        if (template.background.type === "color") return { backgroundColor: template.background.cover }
        return { backgroundImage: `url(${template.background.cover})` }
    }




    return (
        <div
            className="h100 board-page-conatiner template"
            style={getBoardPageStyle()}
        >
            <TemplateHeader
                template={template}
                createBoardFromTemplate={props.createBoardFromTemplate}
                user={props.loggedInUser}
                history={props.history}
            />
            <DragDropContext
                onDragEnd={() => { }}
                onDragStart={() => { }}
            >
                <Board
                    board={template}
                    checkIsIncludeInFilter={() => { return true }}
                />
            </DragDropContext>
            <div className="untouch-board"></div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedinUser
    }
}
const mapDispatchToProps = {
    createBoardFromTemplate
}
export default connect(mapStateToProps, mapDispatchToProps)(_Template)