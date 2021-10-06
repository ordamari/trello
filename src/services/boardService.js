import httpService from './httpService'
import { templates } from './templateService';
import { utilService } from './utilService';



export const boardService = {
    updateBoard,
    onDragEnd,
    addNewColumn,
    addNewTask,
    updateColumnName,
    updateTaskName,
    findTaskListTitle,
    updateTaskDescription,
    updateTaskDate,
    toggleIsShowCheckedItems,
    toggleIsDoneTaskInChecklist,
    deleteChecklist,
    addTaskToTasklist,
    updateChecklistName,
    updateChecklistTaskName,
    toggleTaskIsWatch,
    toggleTaskMember,
    toggleTaskLabel,
    updateLabel,
    addChecklist,
    deleteLabel,
    addLabelToTask,
    addDateToTask,
    addNewAttachment,
    changeIsCoverTaskTextColorBlack,
    updateTaskCover,
    moveTask,
    deleteTask,
    convertChecklistTaskToTask,
    deleteChecklistTask,
    updateIsCoverTop,
    removeColumn,
    coppiedColumn,
    moveList,
    updateBoardIsStared,
    updateBoardTitle,
    updateBoardBackground,
    getEmptyBoard,
    loadBoard,
    getBoardById,
    createBoardFromTemplate,
    addNewBoard,
    toggleUserInBoard,
    removeUserFromBoard,
    deleteBoard
}



async function createBoardFromTemplate(templateId, user) {
    try {
        var template = { ...templates.find(template => template.id === templateId) };
        template.members = [
            {
                "id": user._id,
                "imgUrl": user.profileImg,
                "userName": user.username
            }
        ]
        delete template.id;
        const { board, newUser } = await httpService.post(`board`, { board: template, userId: user._id });
        sessionStorage.setItem('user', JSON.stringify(newUser))
        return board
    } catch (err) {
        console.log(err);
    }
}

async function addNewBoard(boardTitle, background, user) {
    var emptyBoard = {
        members: [
            {
                "id": user._id,
                "imgUrl": user.profileImg,
                "userName": user.username
            }
        ],
        labels: [
            {
                color: 'green',
                text: ''
            },
            {
                color: 'yellow',
                text: ''
            },
            {
                color: 'orange',
                text: ''
            },
            {
                color: 'red',
                text: ''
            },
            {
                color: 'purple',
                text: ''
            },
            {
                color: 'blue',
                text: ''
            },
        ],

        tasks: {},
        columns: {},
        columnsOrder: [],
        title: boardTitle,
        isStared: false,
        background: background
    }
    try {
        const { board, newUser } = await httpService.post(`board`, { board: emptyBoard, userId: user._id });
        sessionStorage.setItem('user', JSON.stringify(newUser))
        return board
    } catch (err) {
        console.log(err);
    }
}

async function updateBoard(board) {
    try {
        const updateBoard = await httpService.put(`board/${board._id}`, board);
        return updateBoard
    } catch (err) {
        console.log(err);
    }
}

async function loadBoard(boardId) {
    const globalBoardId = "60e41ecca135ac1f2afcae46";

    try {
        var board = await httpService.get(`board/${boardId === 'global' ? globalBoardId : boardId}`);
        return board
    } catch (err) {
        console.log(err);
    }
}

async function getBoardById(id) {
    try {
        const board = await httpService.get(`board/${id}`);
        return board
    } catch (err) {
        console.log(err);
    }
}

async function deleteBoard(id) {
    try {
        await httpService.delete(`board/${id}`);
    } catch (err) {
        console.log(err);
    }
}

function onDragEnd(destination, source, draggableId, type, board) {

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return;

    if (type === "column") {
        const newColumnOrder = Array.from((board.columnsOrder))
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);
        const newBoard = _updateColumnOrder(newColumnOrder, board);
        return newBoard
    }

    if (type === 'members') {
        if (board.tasks[destination.droppableId].members.some(user => user.id === draggableId)) return;
        const newUser = {
            id: draggableId,
            imgUrl: board.members.find(user => user.id === draggableId).imgUrl
        }

        const newTask = {
            ...board.tasks[destination.droppableId],
            members: [...board.tasks[destination.droppableId].members, newUser]
        }
        const newBoard = _updateTask(newTask, board)
        return newBoard;

    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn = _updateColumnTaskIds(start, newTaskIds);
        const newBoard = _updateColumn(newColumn, board);
        return newBoard;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const startColumn = _updateColumnTaskIds(start, startTaskIds);

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const finishColumn = _updateColumnTaskIds(finish, finishTaskIds);

    const newBoard = {
        ...board,
        columns: {
            ...board.columns,
            [startColumn.id]: startColumn,
            [finishColumn.id]: finishColumn
        }
    }

    return newBoard
}

function toggleUserInBoard(user, board) {
    const userIdxInBoardMembers = board.members.findIndex(member => member.id === user.id);
    const userMembers = userIdxInBoardMembers === -1 ? [...board.members, user] : board.members.filter((member, idx) => idx !== userIdxInBoardMembers);
    return {
        ...board,
        members: userMembers
    }
}

function addNewColumn(title, board) {
    const newColumn = {
        id: utilService.genId(),
        title,
        taskIds: []
    }
    const newBoard = _updateColumn(newColumn, board);

    return {
        ...newBoard,
        columnsOrder: [...newBoard.columnsOrder, newColumn.id]
    }
}

function addNewTask(title, columnId, board) {
    const newTask = {
        id: utilService.genId(),
        title,
        isCoverTaskTextColorBlack: true,
        attachments: [],
        description: '',
        checklists: [],
        labels: [],
        activity: [],
        date: null,
        cover: null,
        isWatched: false,
        members: [],
        isCoverTop: true,
    }
    const newBoard = _updateTask(newTask, board);
    return {
        ...newBoard,
        columns: {
            ...newBoard.columns,
            [columnId]: {
                ...board.columns[columnId],
                taskIds: [...board.columns[columnId].taskIds, newTask.id]
            }
        }
    }
}

function updateColumnName(name, columnId, board) {
    const newColumn = {
        ...board.columns[columnId],
        title: name
    }
    const newBoard = _updateColumn(newColumn, board);
    return newBoard;
}

function updateTaskName(name, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        title: name
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function findTaskListTitle(taskId, board) {
    const taskColumn = Object.values(board.columns).find(column => {
        return column.taskIds.some(currTaskId => currTaskId === taskId)
    })

    return taskColumn.title
}

function updateTaskDescription(description, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        description
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function updateTaskDate(date, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        date
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function updateIsCoverTop(isCoverTop, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        isCoverTop
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function toggleIsShowCheckedItems(taskId, checklistIdx, board) {
    const newChecklist = {
        ...board.tasks[taskId].checklists[checklistIdx],
        isShowCheckedItems: !board.tasks[taskId].checklists[checklistIdx].isShowCheckedItems
    }
    const newTask = _updateTaskChecklist(taskId, checklistIdx, newChecklist, board);
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function toggleIsDoneTaskInChecklist(taskId, checklistIdx, checklistTaskIdx, board) {
    const newChecklist = {
        ...board.tasks[taskId].checklists[checklistIdx],
        list: board.tasks[taskId].checklists[checklistIdx].list.map((task, idx) => {
            return idx === checklistTaskIdx ? { ...task, isDone: !task.isDone } : task
        })
    }
    const newTask = _updateTaskChecklist(taskId, checklistIdx, newChecklist, board);
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function deleteChecklist(taskId, checklistIdx, board) {
    const newTask = {
        ...board.tasks[taskId],
        checklists: board.tasks[taskId].checklists.filter((checklist, idx) => idx !== checklistIdx)
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function addTaskToTasklist(taskId, checklistIdx, name, board) {
    const newTask = {
        ...board.tasks[taskId],
        checklists: board.tasks[taskId].checklists.map((checklist, idx) => {
            return checklistIdx === idx ? { ...checklist, list: [...checklist.list, { isDone: false, task: name }] } : checklist
        })
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function updateChecklistName(taskId, checklistIdx, name, board) {
    const newChecklist = {
        ...board.tasks[taskId].checklists[checklistIdx],
        title: name
    }
    const newTask = _updateTaskChecklist(taskId, checklistIdx, newChecklist, board);
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function updateChecklistTaskName(taskId, checklistIdx, checklistTaskIdx, name, board) {
    const newChecklist = {
        ...board.tasks[taskId].checklists[checklistIdx],
        list: board.tasks[taskId].checklists[checklistIdx].list.map((task, idx) => {
            return idx === checklistTaskIdx ? { ...task, task: name } : task
        })
    }
    const newTask = _updateTaskChecklist(taskId, checklistIdx, newChecklist, board);
    const newBoard = _updateTask(newTask, board)
    return newBoard;
}

function toggleTaskIsWatch(taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        isWatched: !board.tasks[taskId].isWatched
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function toggleTaskMember(member, taskId, board) {
    const isTaskMember = board.tasks[taskId].members.some(taskMember => taskMember.id === member.id);
    const newTask = {
        ...board.tasks[taskId],
        members: isTaskMember ? (
            board.tasks[taskId].members.filter(taskMember => taskMember.id !== member.id)
        ) : (
            [...board.tasks[taskId].members, member]
        )
    }
    const newBoard = _updateTask(newTask, board)
    return newBoard
}

function toggleTaskLabel(labelIdx, taskId, board) {
    const isTaskLabel = board.tasks[taskId].labels.some(taskLabelIdx => taskLabelIdx === labelIdx);
    const newTask = {
        ...board.tasks[taskId],
        labels: isTaskLabel ? (
            board.tasks[taskId].labels.filter(taskLabelIdx => taskLabelIdx !== labelIdx)
        ) : (
            [...board.tasks[taskId].labels, labelIdx]
        )
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard
}

function updateLabel(newLabel, labelIdx, board) {
    return {
        ...board,
        labels: board.labels.map((label, idx) => idx === labelIdx ? newLabel : label)
    }
}

function addChecklist(taskId, checklistTitle, copyFrom, board) {

    var newChecklist = {
        title: checklistTitle,
        isShowCheckedItems: true,
        list: []
    }
    if (copyFrom) {
        const newList = board.tasks[copyFrom.taskId].checklists[copyFrom.checklistIdx].list.map(task => (
            { task: task.task, isDone: false }
        ))
        newChecklist.list = newList
    }
    const newTask = {
        ...board.tasks[taskId],
        checklists: [...board.tasks[taskId].checklists, newChecklist]
    }

    const newBoard = _updateTask(newTask, board)
    return newBoard;
}

function deleteLabel(labelIdx, board) {
    const newTasks = Object.keys(board.tasks).reduce((acc, key) => {
        let newTaskLabels = board.tasks[key].labels.filter(label => label !== labelIdx);
        newTaskLabels = newTaskLabels.map(taskLabelIdx => taskLabelIdx > labelIdx ? taskLabelIdx - 1 : taskLabelIdx);

        acc[key] = {
            ...board.tasks[key],
            labels: newTaskLabels
        }
        return acc
    }, {})

    const newBoard = {
        ...board,
        labels: board.labels.filter((label, idx) => idx !== labelIdx),
        tasks: newTasks
    }

    return newBoard;
}

function addLabelToTask(newLabel, taskId, board) {
    const newTaskIdx = board.labels.findIndex(label => label.text === newLabel.text && label.color === newLabel.color);
    if (newTaskIdx !== -1) {
        if (!board.tasks[taskId].labels.some(labelIdx => labelIdx === newTaskIdx)) {
            if (taskId) {
                const newTask = {
                    ...board.tasks[taskId],
                    labels: [...board.tasks[taskId].labels, newTaskIdx]
                }
                return _updateTask(newTask, board);
            }
        }
        return board;
    } else {
        if (taskId) {

            const newTask = {
                ...board.tasks[taskId],
                labels: [...board.tasks[taskId].labels, board.labels.length]
            }
            return {
                ...board,
                tasks: {
                    ...board.tasks,
                    [taskId]: newTask
                },
                labels: [...board.labels, newLabel]
            }
        }
        return {
            ...board,
            labels: [...board.labels, newLabel]
        }
    }
}

function addDateToTask(taskId, newDate, board) {
    const newTask = {
        ...board.tasks[taskId],
        date: newDate
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard
}

function addNewAttachment(newAttachment, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        attachments: [...board.tasks[taskId].attachments, newAttachment]
    }
    const newBoard = _updateTask(newTask, board)
    return newBoard;
}

function moveTask(from, to, taskId, board) {
    const source = {
        index: from.position,
        droppableId: from.columnId,
    }
    const destination = {
        index: to.position,
        droppableId: to.columnId,
    }
    return onDragEnd(destination, source, taskId, 'task', board);
}

function changeIsCoverTaskTextColorBlack(isCoverTaskTextColorBlack, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        isCoverTaskTextColorBlack: isCoverTaskTextColorBlack
    }
    const newBoard = _updateTask(newTask, board);
    return newBoard;
}

function updateTaskCover(newCover, taskId, board) {
    const newTask = {
        ...board.tasks[taskId],
        cover: newCover
    }
    let newBoard = _updateTask(newTask, board);
    if (!newCover) newBoard = updateIsCoverTop(true, taskId, newBoard);
    return newBoard
}

function deleteTask(taskId, board) {
    const newColumns = Object.values(board.columns).reduce((acc, column) => {
        acc[column.id] = {
            ...board.columns[column.id],
            taskIds: board.columns[column.id].taskIds.filter(currTaskId => currTaskId !== taskId)
        }
        return acc
    }, {})

    const newTasks = { ...board.tasks };
    delete newTasks[taskId];

    return {
        ...board,
        columns: newColumns,
        tasks: newTasks
    }
}

function deleteChecklistTask(taskId, checklistIdx, taskIdx, board) {
    const newChecklist = {
        ...board.tasks[taskId].checklists[checklistIdx],
        list: board.tasks[taskId].checklists[checklistIdx].list.filter((task, idx) => idx !== taskIdx)
    }
    const newTask = _updateTaskChecklist(taskId, checklistIdx, newChecklist, board);
    const newBoard = _updateTask(newTask, board)
    return newBoard;
}

function convertChecklistTaskToTask(taskId, checklistIdx, taskIdx, columnId, board) {
    const taskName = board.tasks[taskId].checklists[checklistIdx].list[taskIdx].task;
    var newBoard = deleteChecklistTask(taskId, checklistIdx, taskIdx, board);
    newBoard = addNewTask(taskName, columnId, newBoard);
    return newBoard;
}

function removeColumn(columnId, board) {
    const newTasks = Object.keys(board.tasks).reduce((acc, taskId) => {
        if (!board.columns[columnId].taskIds.some(columnTaskId => columnTaskId === taskId)) {
            acc[taskId] = board.tasks[taskId]
        }
        return acc
    }, {})
    let newColumns = { ...board.columns };
    delete newColumns[columnId];
    const newColumnsOrder = board.columnsOrder.filter(orderColumnId => orderColumnId !== columnId);
    return {
        ...board,
        tasks: newTasks,
        columns: newColumns,
        columnsOrder: newColumnsOrder
    }
}

function coppiedColumn(columnId, newColumnTitle, board) {
    const newColumnTasks = board.columns[columnId].taskIds.map(taskId => {
        let newTask = JSON.parse(JSON.stringify(board.tasks[taskId]));
        newTask.id = utilService.genId();
        return newTask
    })
    const coppiedColumn = {
        id: utilService.genId(),
        title: newColumnTitle,
        taskIds: newColumnTasks.map(task => task.id)
    }

    let newTasks = { ...board.tasks };

    newColumnTasks.forEach(task => {
        newTasks[task.id] = task
    });

    let newColumnsOrder = [...board.columnsOrder];
    newColumnsOrder.splice(board.columnsOrder.findIndex(orderColumnId => orderColumnId === columnId) + 1, 0, coppiedColumn.id);

    return {
        ...board,
        tasks: newTasks,
        columns: { ...board.columns, [coppiedColumn.id]: coppiedColumn },
        columnsOrder: newColumnsOrder
    }
}

function moveList(columnId, position, moveTo, board) {
    const newColumnOrder = Array.from((board.columnsOrder))
    newColumnOrder.splice(position, 1);
    newColumnOrder.splice(moveTo, 0, columnId);
    const newBoard = _updateColumnOrder(newColumnOrder, board);
    return newBoard
}

function updateBoardIsStared(board) {
    return {
        ...board,
        isStared: !board.isStared
    }
}

function updateBoardTitle(newTitle, board) {
    return {
        ...board,
        title: newTitle ? newTitle : board.title
    }
}

function removeUserFromBoard(board, userId) {
    return {
        ...board,
        members: board.members.filter(boardMember => boardMember.id !== userId)
    }
}

function getEmptyBoard() {
    return {
        members: [],
        labels: [
            {
                color: 'green',
                text: ''
            },
            {
                color: 'yellow',
                text: ''
            },
            {
                color: 'orange',
                text: ''
            },
            {
                color: 'red',
                text: ''
            },
            {
                color: 'purple',
                text: ''
            },
            {
                color: 'blue',
                text: ''
            },
        ],

        tasks: {

            t101: {
                id: 't101',
                title: 'Load the board',
                isCoverTop: true,
                isCoverTaskTextColorBlack: true,
                attachments: [],
                description: '',
                checklists: [],
                labels: [],
                activity: [],
                date: null,
                cover: null,
                isWatched: true,
                members: []
            },
        },
        columns: {
            c101: {
                id: 'c101',
                title: 'todo 1',
                taskIds: ['t101']
            },
        },
        columnsOrder: ['c101'],
        title: 'Empty board',
        isStared: false,
        background: {
            type: 'color',
            cover: '#4bbf6b'
        }
    }
}

function updateBoardBackground(newBackground, bord) {
    return {
        ...bord,
        background: newBackground
    }
}

function _updateTaskChecklist(taskId, checklistIdx, newChecklist, board) {
    return {
        ...board.tasks[taskId],
        checklists: board.tasks[taskId].checklists.map((checklist, idx) => idx === checklistIdx ? newChecklist : checklist)
    }
}

function _updateColumnOrder(newColumnOrder, board) {
    return {
        ...board,
        columnsOrder: newColumnOrder
    }
}

function _updateTask(newTask, board) {
    return {
        ...board,
        tasks: {
            ...board.tasks,
            [newTask.id]: newTask
        }
    }
}

function _updateColumnTaskIds(column, newTaskIds) {
    return {
        ...column,
        taskIds: newTaskIds
    }
}

function _updateColumn(column, board) {
    return {
        ...board,
        columns: {
            ...board.columns,
            [column.id]: column
        }
    }
}

