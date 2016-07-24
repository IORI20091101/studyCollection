/**
 * Created by toshiba on 16/7/23.
 */
const fs = require('fs');
const path = require("path");
const proxy = require("koa-proxy");
var render = require('koa-ejs');

var BookModel = require("./bookModel");

module.exports = (router, app, staticDir) => {
    "use strict";

    render(app, {
        root: path.resolve(staticDir, "views"),
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: true
    });


    router.get(
        '/', function *(next) {
            var self = this;
            yield BookModel.find(function(err, books) {
                console.log(books);
                self.books = books;
            });
            yield next;
        }, function*(next) {
            console.log(this.books);
            yield this.render('index', {
                books: this.books
            });

        });



    router.post(
        '/add', function *(next) {

            if (this.request.method == 'POST') {
                console.log(this.request.body);
            }
            var book = new BookModel(this.request.body);

            this.addResult = yield book.save(function(err) {
                if (err) {
                    console.log('保存失败')
                }
                console.log('数据保存成功')

            });

            yield next;
        }, function *(next) {

            if(this.addResult && this.addResult.errors == undefined ) {
                var obj = {};
                if (this.addResult.errors) {
                    obj.code = 500;
                    obj.msg = "保存失败";
                    console.log('保存失败')
                }

                obj.code = 200;
                obj.msg = "数据保存成功";


                this.body = obj;
            }

        });


}