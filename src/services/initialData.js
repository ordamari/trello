const initialData = {

    "members": [
        {
            "id": 'user1',
            "imgUrl": 'https://res.cloudinary.com/dif8yy3on/image/upload/v1607437600/swaywrwr3bfqwbjvbqyf.jpg',
            "userName": 'Or'
        },
        {
            "id": 'user2',
            "imgUrl": 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600550105/vgtz58l672lcmxishf1k.png',
            "userName": 'Sapir'
        }
    ],
    "labels": [
        {
            "color": 'green',
            "text": 'or'
        },
        {
            "color": 'yellow',
            "text": ''
        },
        {
            "color": 'orange',
            "text": ''
        },
        {
            "color": 'red',
            "text": ''
        },
        {
            "color": 'purple',
            "text": ''
        },
        {
            "color": 'blue',
            "text": ''
        },
    ],

    "tasks": {

        "t101": {
            "id": 't101',
            "title": 'task 1',
            "isCoverTop":true,
            "isCoverTaskTextColorBlack":true,
            "attachments": [
                {
                    "src": 'https://res.cloudinary.com/dif8yy3on/image/upload/v1615376871/gdaugtubodtekbuygrtj.jpg',
                    "name": 'simple',
                    "addedAt": 1624179557810
                }
            ],
            "description": 'sdsad',
            "checklists": [
                {
                    "title": 'Checklist',
                    "isShowCheckedItems": true,
                    "list": [
                        {
                            "isDone": true,
                            "task": 'build tasklist'
                        },
                        {
                            "isDone": false,
                            "task": 'style tasklist'
                        },
                        {
                            "isDone": false,
                            "task": 'style tasklist again'
                        },
                    ]
                },
                {
                    "title": 'Checklist 2',
                    "isShowCheckedItems": true,
                    "list": [
                        {
                            "isDone": false,
                            "task": 'build activity'
                        },
                        {
                            "isDone": false,
                            "task": 'style activity'
                        },
                    ]
                },
            ],
            "labels": [0, 2, 3],
            "activity": [],
            "date": {
                "isDone": true,
                "timestamp": 1623760086065
            },
            "cover": null,
            "isWatched": true,
            "members": [
                {
                    "id": 'user1',
                    "imgUrl": 'https://res.cloudinary.com/dif8yy3on/image/upload/v1607437600/swaywrwr3bfqwbjvbqyf.jpg',
                    "userName": 'or'
                },
                {
                    "id": 'user2',
                    "imgUrl": 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600550105/vgtz58l672lcmxishf1k.png',
                    "userName": 'sapir'
                }
            ]
        },
        "t102": {
            "id": 't102',
            "title": 'task 2',
            "isCoverTop":true,
            "checklists": [],
            "labels": [
                0
            ],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTaskTextColorBlack":true,
            "attachments": [],
            "description": ''
        },
        "t103": {
            "id": 't103',
            "title": 'task 3',
            "isCoverTop":true,
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTaskTextColorBlack":true,
            "attachments": [],
            "description": ''
        },
        "t104": {
            "id": 't104',
            "title": 'task 4',
            "isCoverTop":true,
            "checklists": [],
            "labels": [],
            "activity": [],
            "date": null,
            "cover": null,
            "isWatched": false,
            "members": [],
            "isCoverTaskTextColorBlack":true,
            "attachments": [],
            "description": ''
        }
    },
    columns: {
        "c101": {
            "id": 'c101',
            "title": 'todo 1',
            "taskIds": ['t101', 't102', 't103', 't104']
        },
        "c102": {
            "id": 'c102',
            "title": 'todo 2',
            "taskIds": []
        },
        "c103": {
            "id": 'c103',
            "title": 'todo 3',
            "taskIds": []
        }
    },
    "columnsOrder": ['c101', 'c102', 'c103'],
    "title": 'New Board',
    "isStared":true,
    "background":{
        "type":'color',
        "cover":'#4bbf6b'
    }
}


export default initialData;
