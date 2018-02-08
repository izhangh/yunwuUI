{
    "title": {
    "text": "值班统计(截止2018-02-07)"
},
    "tooltip": {
    "trigger": "axis"
},
    "legend": {
    "data": [
        "签到数",
        "请假数",
        "补假数",
        "缺勤数"
    ]
},
    "toolbox": {
    "show": true,
        "feature": {
        "dataView": {
            "show": true,
                "readOnly": true
        },
        "magicType": {
            "show": true,
                "type": [
                "line",
                "bar",
                "stack",
                "tiled"
            ]
        },
        "restore": {
            "show": true
        },
        "saveAsImage": {
            "show": true
        }
    }
},
    "calculable": true,
    "xAxis": [
    {
        "name": "姓名",
        "type": "category",
        "data": [
            "魏小鹏",
            "刘生鹏",
            "冯晓",
            "梁玉龙",
            "陈永鹏",
            "刘辉",
            "易梦思",
            "王川",
            "李国栋",
            "王佳颖"
        ],
        "axisLabel": {
            "interval": 0,
            "rotate": 30
        }
    }
],
    "yAxis": [
    {
        "type": "value",
        "name": "次数"
    }
],
    "dataZoom": [
    {
        "type": "inside",
        "start": 0,
        "end": 100
    },
    {
        "type": "slider",
        "show": true,
        "xAxisIndex": 0,
        "filterMode": "empty",
        "start": 0,
        "end": 100
    }
],
    "grid": {
    "x": 40,
        "x2": 40,
        "y2": 100
},
    "series": [
    {
        "name": "签到数",
        "type": "bar",
        "data": [
            "57",
            "64",
            "82",
            "56",
            "134",
            "138",
            "137",
            "92",
            "81",
            "38"
        ],
        "markPoint": {
            "data": [
                {
                    "type": "max",
                    "name": "最大值"
                },
                {
                    "type": "min",
                    "name": "最小值"
                }
            ]
        },
        "markLine": {
            "data": [
                {
                    "type": "average",
                    "name": "平均值"
                }
            ]
        }
    },
    {
        "name": "请假数",
        "type": "bar",
        "data": [
            "0",
            "2",
            "0",
            "8",
            "2",
            "2",
            "11",
            "4",
            "3",
            "6"
        ],
        "markPoint": {
            "data": [
                {
                    "type": "max",
                    "name": "最大值"
                },
                {
                    "type": "min",
                    "name": "最小值"
                }
            ]
        },
        "markLine": {
            "data": [
                {
                    "type": "average",
                    "name": "平均值"
                }
            ]
        }
    },
    {
        "name": "补假数",
        "type": "bar",
        "data": [
            "17",
            "17",
            "17",
            "17",
            "17",
            "17",
            "17",
            "17",
            "17",
            "17"
        ],
        "markPoint": {
            "data": [
                {
                    "type": "max",
                    "name": "最大值"
                },
                {
                    "type": "min",
                    "name": "最小值"
                }
            ]
        },
        "markLine": {
            "data": [
                {
                    "type": "average",
                    "name": "平均值"
                }
            ]
        }
    },
    {
        "name": "缺勤数",
        "type": "bar",
        "data": [
            "11",
            "11",
            "46",
            "21",
            "25",
            "21",
            "22",
            "31",
            "36",
            "12"
        ],
        "markPoint": {
            "data": [
                {
                    "type": "max",
                    "name": "最大值"
                },
                {
                    "type": "min",
                    "name": "最小值"
                }
            ]
        },
        "markLine": {
            "data": [
                {
                    "type": "average",
                    "name": "平均值"
                }
            ]
        }
    }
]
}