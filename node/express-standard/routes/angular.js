/**
 * Created by sundongzhi on 15/11/13.
 */
var express = require('express');
var router = express.Router();




//curl http://sdz001:123456@127.0.0.1:3030/api/user/1 -v
//curl -d  "title=sundongzhi&body=swuosdowef" http://sdz001:123456@127.0.0.1:3030/api/entry -v
//curl http://sdz001:123456@127.0.0.1:3030/api/entries/1 -v
// curl -i -H 'Accept: application/xml' http://sdz001:123456@127.0.0.1:3030/api/entries/1

router.get('/system/users', function(req, res, next){
    res.json([
        {
            "id": 14,
            "userName": "yangbing",
            "enable": 1,
            "lastIp": "127.0.0.1",
            "roleId": 1,
            "realName": "杨查理",
            "phone": "18607927127",
            "email": null,
            "avatar": "",
            "lastTime": null
        },
        {
            "id": 38,
            "userName": "sundongzhi",
            "enable": 1,
            "lastIp": null,
            "roleId": 1,
            "realName": "孙东芝",
            "phone": "15010547818",
            "email": null,
            "avatar": "",
            "lastTime": null
        },
        {
            "id": 39,
            "userName": "linchaojian",
            "enable": 1,
            "lastIp": null,
            "roleId": 1,
            "realName": "林朝建",
            "phone": "15259187871",
            "email": null,
            "avatar": "",
            "lastTime": null
        },
        {
            "id": 46,
            "userName": "test_81273458",
            "enable": 1,
            "lastIp": null,
            "roleId": 1,
            "realName": "test_81273458",
            "phone": "12245258853",
            "email": null,
            "avatar": "",
            "lastTime": null
        },
        {
            "id": 47,
            "userName": "test_75145263",
            "enable": 1,
            "lastIp": null,
            "roleId": 1,
            "realName": "test_75145263",
            "phone": "12269550300",
            "email": null,
            "avatar": "",
            "lastTime": null
        },
        {
            "id": 48,
            "userName": "test_62866835",
            "enable": 1,
            "lastIp": null,
            "roleId": 1,
            "realName": "test_62866835",
            "phone": "12245325524",
            "email": null,
            "avatar": "",
            "lastTime": null
        },
        {
            "id": 49,
            "userName": "test_87802880",
            "enable": 1,
            "lastIp": null,
            "roleId": 1,
            "realName": "test_87802880",
            "phone": "12207994669",
            "email": null,
            "avatar": "",
            "lastTime": null
        }
    ]);
})

router.get('/menu/get', function(req, res, next) {

    res.json([
        {
            "name": "仪表盘",
            "url": "dashboard",
            "personid": 0,
            "note": "首页",
            "icon": "fa-dashboard",
            "child": false,
            "childMenus": null,
            "id": 1
        },
        {
            "name": "借款管理",
            "url": "loan",
            "personid": 0,
            "note": "借款管理",
            "icon": "fa-list",
            "child": false,
            "childMenus": null,
            "id": 2
        },
        {
            "name": "资金管理",
            "url": "capital",
            "personid": 0,
            "note": "资金管理",
            "icon": "fa-rmb",
            "child": false,
            "childMenus": null,
            "id": 3
        },
        {
            "name": "运营管理",
            "url": "operate",
            "personid": 0,
            "note": "运营管理",
            "icon": "fa-ambulance",
            "child": false,
            "childMenus": null,
            "id": 4
        },
        {
            "name": "用户管理",
            "url": "user",
            "personid": 0,
            "note": "用户管理",
            "icon": "fa-users",
            "child": true,
            "childMenus": [
                {
                    "name": "用户列表",
                    "url": "list",
                    "personid": 5,
                    "note": "用户列表 user/list",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 12
                }
            ],
            "id": 5
        },
        {
            "name": "统计管理",
            "url": "statistics",
            "personid": 0,
            "note": "统计管理",
            "icon": "fa-bar-chart-o",
            "child": false,
            "childMenus": null,
            "id": 6
        },
        {
            "name": "系统设置",
            "url": "system",
            "personid": 0,
            "note": "系统设置",
            "icon": "fa-cogs",
            "child": true,
            "childMenus": [
                {
                    "name": "权限管理",
                    "url": "permission",
                    "personid": 7,
                    "note": "权限管理  system/permission",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 11
                },
                {
                    "name": "管理员",
                    "url": "admin",
                    "personid": 7,
                    "note": "管理员管理  system/admin",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 8
                }
            ],
            "id": 7
        },
        {
            "name": "龙贷债权",
            "url": "credit",
            "personid": 0,
            "note": "龙贷债权",
            "icon": "fa-money",
            "child": true,
            "childMenus": [
                {
                    "name": "借款管理",
                    "url": "loan",
                    "personid": 16,
                    "note": "龙贷债权-借款管理 credit/loan",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 18
                },
                {
                    "name": "还款管理",
                    "url": "repayment",
                    "personid": 16,
                    "note": "龙贷债权-还款管理 credit/repayment",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 19
                }
            ],
            "id": 16
        },
        {
            "name": "原始债权",
            "url": "oricredit",
            "personid": 0,
            "note": "原始债权",
            "icon": "fa-dollar",
            "child": true,
            "childMenus": [
                {
                    "name": "借款管理",
                    "url": "loan",
                    "personid": 17,
                    "note": "原始债权-借款管理 oricredit/loan",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 20
                },
                {
                    "name": "还款管理",
                    "url": "repayment",
                    "personid": 17,
                    "note": "原始债权-还款管理 oricredit/repayment",
                    "icon": null,
                    "child": false,
                    "childMenus": null,
                    "id": 21
                }
            ],
            "id": 17
        }
    ]);
})


module.exports = router;
