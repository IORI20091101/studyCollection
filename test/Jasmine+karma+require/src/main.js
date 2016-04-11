/**
 * Created by sundongzhi on 16/1/27.
 */

requirejs.config({
    baseUrl:'./',
    paths:{
        'jquery':'lib/jquery/dist/jquery',
        'underscore':'lib/underscore/underscore-min',
        'app':'src/app',
        'a':'src/a'
    }
});


require(['app'],function(angular) {
    'use strict';

   console.log("init");


});