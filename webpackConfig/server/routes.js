/**
 * Created by sundongzhi on 16/7/4.
 */
'use strict';

const fs = require('fs');

const render = require('koa-ejs');

const path = require('path');

const proxy = require('koa-proxy');

const list = require('../mock/list');

module.exports = (router, app, staticDir) => {
    router.get('/mock/api/list', function*() {
        let query = this.query || {};
        let offset = query.offset || 0;
        let limit = query.limit || 10;
        let diff = limit - list.length;

        if( diff <= 0 ) {
            this.body = {
                code:0,
                data: list.slice(0, limit)
            }
        } else {
            let arr = list.slice(0, list.length);
            let i = 0;

            while(diff--) arr.push(arr[i++])

            this.body = {
                code: 0,
                data: arr
            }
        }
    });


    router.get('/api/list', proxy({host: 'http://localhost:3010/'}));

    render(app, {
        root: __dirname,
        layout: false,
        viewExt: 'html',
        cache: false,
        debug: true
    });

    router.get('/', function*() {
        let pages = fs.readdirSync( path.join(staticDir ,'views'));
        pages = pages.filter((page) => {
            return /\.html$/.test(page);
        })

        console.log(pages);

        yield this.render('home', {pages: pages|| []});
    })


}