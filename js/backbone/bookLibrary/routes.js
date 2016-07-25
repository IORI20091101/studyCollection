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
    '/', function*(next) {
        yield this.render('index', {});

    });
    router.get( /main/i ,function*(next) {
        console.log('inter idnex');
        yield this.render('index', {});
    });

//首页获取bookLibray列表

    


//-------------------------------------------------------------------
    router.get(
        '/api/books'
        ,function *(next) {
            var self = this;
            yield BookModel.find(function(err, books) {
                self.books = books;
            });
            yield next;
        }, function*(next) {
            this.body = this.books;
        });


    router.get('/api/books/:id', function *(next) {
        var id = this.params.id;
        var self = this;
        yield BookModel.fine({id: ObjectId(id)}, function(err, book) {
            if( err ) {
                console.log("服务器错误!");
                return this.status= 500;
            }
            self.book = book;
        })
        yield next;
    }, function *(next) {
        console.log(this.book);
        this.body = book;
    });


    router.post('/api/books' , function *(next) {

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


    router.put('/api/books/:id', function *(next) {
        console.log(this.params);
        var params = this.params;
        if(id) {
            BookModel.update({_id: ObjectId(id)}, {
                $set: {
                    title: params.title,
                    author: params.author,
                    coverImage: params.coverImage,
                    releaseDate: params.releaseDate,
                    keywords: params.keywords,
                }
            }, function(err) {
                if( err ) {
                    self.body = err;
                }
                var obj = {};
                obj.code = 200;
                obj.msg = "删除成功";
                self.body = obj;
            });
        }

    });

    router.delete(
        '/api/books/:id', function *(next) {
        var id = this.params.id;
        if(id) {
            this.delRes = yield BookModel.remove({_id: id}, function(err) {
                if (err) {
                    console.log('删除失败');
                }
                console.log('数据删除成功');
            });
        } else {
            console.log('id不存在');
        }
        yield next;

    }, function *(next) {
        console.log(this.delRes);
        var obj = {};
        if( this.delRes.result.ok !== 1 ) {
            obj.code = 500;
            obj.msg = "删除失败";
        }

        obj.code = 200;
        obj.msg = "删除成功";
        this.body = obj;

    });

}