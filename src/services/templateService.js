import cat from '../assets/imgs/cat.gif'

const projectManagemen = {
    members: [],
    labels: [
        {
            color: 'green',
            text: 'Halp'
        },
        {
            color: 'yellow',
            text: 'Copy Request'
        },
        {
            color: 'red',
            text: 'Priority'
        },
        {
            color: 'purple',
            text: 'Design Team'
        },
        {
            color: 'blue',
            text: 'Trello Tip'
        },
        {
            color: 'orange',
            text: 'One more step'
        }
    ],

    tasks: {

        t101: {
            id: 't101',
            title: 'Trello Tip: Card labels! What do they mean? (Click for more info)',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: 'Labels are great ways to differentiate the type of tasks your team has.',
            checklists: [],
            labels: [1, 2, 3, 4, 0],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t102: {
            id: 't102',
            title: 'Project "Teamwork Dream Work" Launch Timeline',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: 'Whoa! Look! Its a checklist—you can create tasks, tag your teammates, and check-off tasks as you go and achieve milestones.',
            checklists: [
                {
                    "title": 'Checklist',
                    "isShowCheckedItems": true,
                    "list": [
                        {
                            "isDone": false,
                            "task": 'March 1st, 2019: Begin campaign planning'
                        },
                        {
                            "isDone": false,
                            "task": 'March 15th, 2019: Approve budgets'
                        },
                        {
                            "isDone": false,
                            "task": 'March 22nd, 2019: Finish legal review'
                        },
                        {
                            "isDone": false,
                            "task": 'April 15th, 2019: Approve designs'
                        },
                        {
                            "isDone": false,
                            "task": 'May 1st, 2019: Test website'
                        },
                        {
                            "isDone": false,
                            "task": 'May 20th, 2019: Launch!'
                        },
                    ]
                },
            ],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t103: {
            id: 't103',
            title: 'Stakeholders',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t104: {
            id: 't104',
            title: 'Weekly Updates',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t105: {
            id: 't105',
            title: 'Trello Tip: 🌊Slide your Qs into this handy list so your team keeps on flowing.',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [4],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t106: {
            id: 't106',
            title: 'Whos the best person to fix my HTML snag?',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: 'For some reason, I cant make all the text aligned on the landing page. Can someone look over the code to see what Im missing?',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t107: {
            id: 't107',
            title: 'How can I get access to the super secret document?',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t108: {
            id: 't108',
            title: 'rello Tip: This is where assigned tasks live so that your team can see whos working on what and when its due.',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [4],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t109: {
            id: 't109',
            title: 'Sketch site banner',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [3],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t110: {
            id: 't110',
            title: 'Edit email drafts',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t111: {
            id: 't111',
            title: 'Curate customer list',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t112: {
            id: 't112',
            title: 'Curate customer list',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [5],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t113: {
            id: 't113',
            title: 'Trello Tip: 💬For those in-between tasks that are almost done but also awaiting one last step.',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [4],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t114: {
            id: 't114',
            title: 'Legal review',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t115: {
            id: 't115',
            title: 'Social media assets',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [3],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t116: {
            id: 't116',
            title: 'Trello Tip: Splash those redtape-heavy issues that are slowing your team down here.',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [
                {
                    "src": 'https://res.cloudinary.com/dif8yy3on/image/upload/v1625745147/vu3wnorikcdu8f21b0um.gif',
                    "name": 'cat',
                    "addedAt": 1624179557810
                }
            ],
            description: '',
            checklists: [],
            labels: [4],
            activity: [],
            date: null,
            cover: {
                type: 'img',
                cover: 'https://res.cloudinary.com/dif8yy3on/image/upload/v1625745147/vu3wnorikcdu8f21b0um.gif'
            },
            isWatched: false,
            members: []
        },
        t117: {
            id: 't117',
            title: 'Freelancer contracts',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [5],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t118: {
            id: 't118',
            title: 'Budget approval',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t119: {
            id: 't119',
            title: 'Trello Tip: ✨ Be proud! Youre done! For all your finished tasks that your team has hustled on.',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [4],
            activity: [],
            date: null,
            cover: null,
            isWatched: false,
            members: []
        },
        t120: {
            id: 't120',
            title: 'Finalize Campaign Name: Teamwork Dream Work ✨',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: {
                "isDone": true,
                "timestamp": 1623760086065
            },
            cover: null,
            isWatched: false,
            members: []
        },
        t121: {
            id: 't121',
            title: 'Submit Q1 report',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: {
                "isDone": true,
                "timestamp": 1603260056065
            },
            cover: null,
            isWatched: false,
            members: []
        },
        t122: {
            id: 't122',
            title: 'Campaign Proposal',
            isCoverTop: true,
            isCoverTaskTextColorBlack: true,
            attachments: [],
            description: '',
            checklists: [],
            labels: [],
            activity: [],
            date: {
                "isDone": true,
                "timestamp": 1601260056065
            },
            cover: null,
            isWatched: false,
            members: []
        },
    },
    columns: {
        c101: {
            id: 'c101',
            title: 'Project Resources',
            taskIds: ['t101', 't102', 't103', 't104']
        },
        c102: {
            id: 'c102',
            title: 'Questions For Next Meeting',
            taskIds: ['t105', 't106', 't107']
        },
        c103: {
            id: 'c103',
            title: 'To Do',
            taskIds: ['t108', 't109', 't110', 't111', 't112']
        },
        c104: {
            id: 'c104',
            title: 'Pending',
            taskIds: ['t113', 't114', 't115']
        },
        c105: {
            id: 'c105',
            title: 'Blocked',
            taskIds: ['t116', 't117', 't118']
        },
        c106: {
            id: 'c106',
            title: 'Done',
            taskIds: ['t119', 't120', 't121', 't122']
        },
    },
    columnsOrder: ['c101', 'c102', 'c103', 'c104', 'c105', 'c106'],
    title: 'Project Management',
    isStared: false,
    background: {
        type: 'color',
        cover: '#89609e'
    },
    id: 't101'
}

const kanbanTemplate = {

    "id": 't102',
    "members": [],
    "labels": [
        {
            "color": "green",
            "text": ""
        },
        {
            "color": "yellow",
            "text": ""
        },
        {
            "color": "orange",
            "text": ""
        },
        {
            "color": "red",
            "text": ""
        },
        {
            "color": "purple",
            "text": ""
        },
        {
            "color": "blue",
            "text": ""
        }
    ],
    "tasks": {
        "_mpoftre0w": {
            "id": "_mpoftre0w",
            "title": "Backlog",
            "isCoverTaskTextColorBlack": true,
            "attachments": [
                {
                    "src": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746338/v00dssonira4veo6vctk.png",
                    "name": "backlog",
                    "addedAt": 1625746339668.0
                }
            ],
            "description": "A list of the things we think we want to do, maybe not quite ready for work, but high likelihood of being worked on.\n\nThis is the staging area where specs should get fleshed out.\n\nNo limit on the list size, but we should reconsider if it gets long.",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": {
                "type": "img",
                "cover": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746338/v00dssonira4veo6vctk.png"
            },
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_ggpy71pi5": {
            "id": "_ggpy71pi5",
            "title": "[Example task]",
            "isCoverTaskTextColorBlack": true,
            "attachments": [],
            "description": "",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_amsrvf7gb": {
            "id": "_amsrvf7gb",
            "title": "Design & Research",
            "isCoverTaskTextColorBlack": true,
            "attachments": [
                {
                    "src": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746465/vyzo4c7umppw7f9vvgmq.png",
                    "name": "design",
                    "addedAt": 1625746466830.0
                }
            ],
            "description": "",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": {
                "type": "img",
                "cover": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746465/vyzo4c7umppw7f9vvgmq.png"
            },
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_0quhotu71": {
            "id": "_0quhotu71",
            "title": "[Example task with designs]",
            "isCoverTaskTextColorBlack": true,
            "attachments": [],
            "description": "Attach designs conveniently using Power-ups for design tools like Figma or Invision",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_gqxjd85an": {
            "id": "_gqxjd85an",
            "title": "To Do",
            "isCoverTaskTextColorBlack": true,
            "attachments": [
                {
                    "src": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746589/lif2fhaoon1o6jzyfwuw.png",
                    "name": "to do",
                    "addedAt": 1625746590042.0
                }
            ],
            "description": "This is a list of things that are good to pull off to work on, prioritized.\n\nIf there are too few items here, we should swarm against getting tasks ready for work.",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": {
                "type": "img",
                "cover": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746589/lif2fhaoon1o6jzyfwuw.png"
            },
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_30sltlpib": {
            "id": "_30sltlpib",
            "title": "Code Review",
            "isCoverTaskTextColorBlack": true,
            "attachments": [
                {
                    "src": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746708/juzs9yk5whxdpfapdam9.png",
                    "name": "code review",
                    "addedAt": 1625746708694.0
                }
            ],
            "description": "This list is for items in code review.\n\nWhen a task has gotten approval, it moves off to Testing.\n\nIf there are too many cards here, we should break off from other tasks to get code review done.",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": {
                "type": "img",
                "cover": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746708/juzs9yk5whxdpfapdam9.png"
            },
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_xf55cfr7a": {
            "id": "_xf55cfr7a",
            "title": "This list has the List Limits Power-up enabled, to help the team prioritize and remove bottlenecks before picking up new work. The list will be highlighted if the number of cards in it passes the limit that the team determines based on team size.",
            "isCoverTaskTextColorBlack": true,
            "attachments": [],
            "description": "",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_odys0jav0": {
            "id": "_odys0jav0",
            "title": "[Example task]",
            "isCoverTaskTextColorBlack": true,
            "attachments": [],
            "description": "",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_joanp0z57": {
            "id": "_joanp0z57",
            "title": "[Example task]",
            "isCoverTaskTextColorBlack": true,
            "attachments": [],
            "description": "",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_x1jwgmem0": {
            "id": "_x1jwgmem0",
            "title": "Testing\n",
            "isCoverTaskTextColorBlack": true,
            "attachments": [
                {
                    "src": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746872/oc35pbqoiwf7duqo6ppe.png",
                    "name": "testing",
                    "addedAt": 1625746873089.0
                }
            ],
            "description": "Cards come here after being code reviewed, and we're in a place for QA and fixing things QA finds. Design review also happens at this stage.\n\nIf we have too many cards here, we should throw a flag and figure out whether we're building things that take too many passes of QA, or if we're bottlenecked on QA time.",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": {
                "type": "img",
                "cover": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746872/oc35pbqoiwf7duqo6ppe.png"
            },
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_na5ljxtg5": {
            "id": "_na5ljxtg5",
            "title": " Done ",
            "isCoverTaskTextColorBlack": true,
            "attachments": [
                {
                    "src": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746926/utulhnafovbraqrkldbd.png",
                    "name": "done",
                    "addedAt": 1625746927544.0
                }
            ],
            "description": "We shipped it to production!",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": {
                "type": "img",
                "cover": "http://res.cloudinary.com/dif8yy3on/image/upload/v1625746926/utulhnafovbraqrkldbd.png"
            },
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        },
        "_vs8x65wf4": {
            "id": "_vs8x65wf4",
            "title": "[Completed task]",
            "isCoverTaskTextColorBlack": true,
            "attachments": [],
            "description": "",
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": {
                "timestamp": 1626087600000.0,
                "isDone": true
            },
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTop": true
        }
    },
    "columns": {
        "c101": {
            "id": "c101",
            "title": "Backlog",
            "taskIds": [
                "_mpoftre0w",
                "_ggpy71pi5"
            ]
        },
        "c102": {
            "id": "c102",
            "title": "Design",
            "taskIds": [
                "_amsrvf7gb",
                "_0quhotu71"
            ]
        },
        "c103": {
            "id": "c103",
            "title": "To Do",
            "taskIds": [
                "_gqxjd85an"
            ]
        },
        "_lo8627fny": {
            "id": "_lo8627fny",
            "title": "Doing",
            "taskIds": [
                "_30sltlpib",
                "_xf55cfr7a",
                "_odys0jav0",
                "_joanp0z57"
            ]
        },
        "_66emb2wmi": {
            "id": "_66emb2wmi",
            "title": "Testing",
            "taskIds": [
                "_x1jwgmem0"
            ]
        },
        "_p5e1xb4gu": {
            "id": "_p5e1xb4gu",
            "title": " Done 🎉",
            "taskIds": [
                "_na5ljxtg5",
                "_vs8x65wf4"
            ]
        }
    },
    "columnsOrder": [
        "c101",
        "c102",
        "c103",
        "_lo8627fny",
        "_66emb2wmi",
        "_p5e1xb4gu"
    ],
    "title": "Kanban Template",
    "isStared": false,
    "background": {
        "type": "img",
        "cover": "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHwyfHxjb2xvcnN8ZW58MHx8fHwxNjI1NzQ3MDcw&ixlib=rb-1.2.1&q=85"
    }
}

const simpleProjectBoard = {
    "id" : 't103',
    "members" : [ 
        {
            "id" : "user1",
            "imgUrl" : "https://res.cloudinary.com/dif8yy3on/image/upload/v1607437600/swaywrwr3bfqwbjvbqyf.jpg",
            "userName" : "Or"
        }, 
        {
            "id" : "user2",
            "imgUrl" : "https://res.cloudinary.com/dif8yy3on/image/upload/v1600550105/vgtz58l672lcmxishf1k.png",
            "userName" : "Sapir"
        }
    ],
    "labels" : [ 
        {
            "color" : "green",
            "text" : "or"
        }, 
        {
            "color" : "yellow",
            "text" : ""
        }, 
        {
            "color" : "orange",
            "text" : ""
        }, 
        {
            "color" : "red",
            "text" : ""
        }, 
        {
            "color" : "purple",
            "text" : ""
        }, 
        {
            "color" : "blue",
            "text" : ""
        }
    ],
    "tasks" : {
        "_g2uin9j4x" : {
            "id" : "_g2uin9j4x",
            "title" : "✋🏿 Add what you'd like to work on below\n",
            "isCoverTaskTextColorBlack" : true,
            "attachments" : [],
            "description" : "Ideas are created and share here through a card.\nHere you can describe what you'd like to accomplish.\nFor example you can follow three simple questions to create the card related to your idea:\n\nWhy ? (Why do you wish to do it ?)\nWhat ? (What it is it, what are the goals, who is concerned)\nHow ? (How do you think you can do it ? What are the required steps ?)\nAfter creation, you can move your card to the todo list.",
            "checklists" : [],
            "labels" : [],
            "activity" : [],
            "date" : null,
            "cover" : {
                "type" : "img",
                "cover" : "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHwzfHxCUkFJTlNUT1JNfGVufDB8fHx8MTYyNTc0Nzg2Nw&ixlib=rb-1.2.1&q=80&w=1080"
            },
            "isWatched" : false,
            "members" : [],
            "isCoverTop" : true
        },
        "_a15xjonrk" : {
            "id" : "_a15xjonrk",
            "title" : "✋🏿 Move anything 'ready' here",
            "isCoverTaskTextColorBlack" : true,
            "attachments" : [],
            "description" : "",
            "checklists" : [],
            "labels" : [],
            "activity" : [],
            "date" : null,
            "cover" : {
                "type" : "img",
                "cover" : "https://images.unsplash.com/photo-1524862655266-89c67a10c4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHwyfHx0byUyMGRvfGVufDB8fHx8MTYyNTc0NzkzMw&ixlib=rb-1.2.1&q=80&w=1080"
            },
            "isWatched" : false,
            "members" : [],
            "isCoverTop" : true
        },
        "_drkrgqjjj" : {
            "id" : "_drkrgqjjj",
            "title" : "✋🏿 Move anything that is actually started here",
            "isCoverTaskTextColorBlack" : true,
            "attachments" : [],
            "description" : "",
            "checklists" : [],
            "labels" : [],
            "activity" : [],
            "date" : null,
            "cover" : {
                "type" : "img",
                "cover" : "https://images.unsplash.com/photo-1543157840-7f089c3afd69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHw3fHxkb2luZ3xlbnwwfHx8fDE2MjU3NDc5OTc&ixlib=rb-1.2.1&q=80&w=1080"
            },
            "isWatched" : false,
            "members" : [],
            "isCoverTop" : true
        },
        "_lrvryy4cw" : {
            "id" : "_lrvryy4cw",
            "title" : "✋🏿 Move anything from doing to done here",
            "isCoverTaskTextColorBlack" : true,
            "attachments" : [],
            "description" : "",
            "checklists" : [],
            "labels" : [],
            "activity" : [],
            "date" : null,
            "cover" : {
                "type" : "img",
                "cover" : "https://images.unsplash.com/photo-1489533119213-66a5cd877091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHw1fHxkb25lfGVufDB8fHx8MTYyNTc0ODAzOQ&ixlib=rb-1.2.1&q=80&w=1080"
            },
            "isWatched" : false,
            "members" : [],
            "isCoverTop" : true
        },
        "_6g9ih3pnr" : {
            "id" : "_6g9ih3pnr",
            "title" : "Inspiration for a Card 📝",
            "isCoverTaskTextColorBlack" : true,
            "attachments" : [],
            "description" : "How can members share freely ideas and follow them, team up to accomplish them ?\nA simple idea is trello board visible to everyone but only managed by members.",
            "checklists" : [ 
                {
                    "title" : "What needs to be done",
                    "isShowCheckedItems" : true,
                    "list" : [ 
                        {
                            "isDone" : true,
                            "task" : "Create lists (Brainstorm, todo, doing, done)\n"
                        }, 
                        {
                            "isDone" : true,
                            "task" : "Create template card example"
                        }, 
                        {
                            "isDone" : true,
                            "task" : "Turn board into template"
                        }, 
                        {
                            "isDone" : true,
                            "task" : "Share with the community"
                        }
                    ]
                }
            ],
            "labels" : [],
            "activity" : [],
            "date" : null,
            "cover" : null,
            "isWatched" : false,
            "members" : [],
            "isCoverTop" : true
        }
    },
    "columns" : {
        "_p5e1xb4gu" : {
            "id" : "_p5e1xb4gu",
            "title" : " BRAINSTORM 🤔",
            "taskIds" : [ 
                "_g2uin9j4x"
            ]
        },
        "_xtemyb4x9" : {
            "id" : "_xtemyb4x9",
            "title" : " TODO 📚",
            "taskIds" : [ 
                "_a15xjonrk"
            ]
        },
        "_yy9dahgfo" : {
            "id" : "_yy9dahgfo",
            "title" : "DOING ⚙️",
            "taskIds" : [ 
                "_drkrgqjjj"
            ]
        },
        "_5sdnldhij" : {
            "id" : "_5sdnldhij",
            "title" : "DONE! 🙌🏽",
            "taskIds" : [ 
                "_lrvryy4cw", 
                "_6g9ih3pnr"
            ]
        }
    },
    "columnsOrder" : [ 
        "_p5e1xb4gu", 
        "_xtemyb4x9", 
        "_yy9dahgfo", 
        "_5sdnldhij"
    ],
    "title" : "Simple Project Board",
    "isStared" : false,
    "background" : {
        "type" : "img",
        "cover" : "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNjcwNTJ8MHwxfHNlYXJjaHw4fHxMZWF2ZXN8ZW58MHx8fHwxNjI1NzQ4MjYw&ixlib=rb-1.2.1&q=85"
    }

}

export const templates = [projectManagemen,kanbanTemplate,simpleProjectBoard];


