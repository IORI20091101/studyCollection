(function($) {
    $(function() {
        var totalCount = 0;
        var ipData = [
            {
                count: 0,
                id: 1,
                name:"甘肃"
            },
            {
                count: 0,
                id: 2,
                name:"青海"
            },
            {
                count: 0,
                id: 3,
                name:"广西"
            },
            {
                count: 0,
                id: 4,
                name:"贵州"
            },
            {
                count: 0,
                id: 5,
                name:"重庆"
            },
            {
                count: 0,
                id: 6,
                name:"北京"
            },
            {
                count: 0,
                id: 7,
                name:"福建"
            },
            {
                count: 0,
                id: 8,
                name:"安徽"
            },
            {
                count:0,
                id: 9,
                name:"广东"
            },
            {
                count: 0,
                id: 10,
                name:"西藏"
            },
            {
                count: 0,
                id: 11,
                name:"新疆"
            },
            {
                count: 0,
                id: 12,
                name:"海南"
            },
            {
                count: 0,
                id: 13,
                name:"宁夏"
            },
            {
                count: 0,
                id: 14,
                name:"陕西"
            },
            {
                count: 0,
                id: 15,
                name:"山西"
            },
            {
                count: 0,
                id: 16,
                name:"湖北"
            },
            {
                count: 0,
                id: 17,
                name:"湖南"
            },
            {
                count: 0,
                id: 18,
                name:"四川"
            },
            {
                count: 0,
                id: 19,
                name:"云南"
            },
            {
                count: 0,
                id: 20,
                name:"河北"
            },
            {
                count: 0,
                id: 21,
                name:"河南"
            },
            {
                count: 0,
                id: 22,
                name:"辽宁"
            },
            {
                count: 0,
                id: 23,
                name:"山东"
            },
            {
                count: 0,
                id: 24,
                name:"天津"
            },
            {
                count: 0,
                id: 25,
                name:"江西"
            },
            {
                count: 0,
                id: 26,
                name:"江苏"
            },
            {
                count: 0,
                id: 27,
                name:"上海"
            },
            {
                count: 0,
                id: 28,
                name:"浙江"
            },
            {
                count: 0,
                id: 29,
                name:"吉林"
            },
            {
                count: 0,
                id: 30,
                name:"内蒙古"
            },
            {
                count: 0,
                id: 31,
                name:"黑龙江"
            },
            {
                count: 0,
                id: 32,
                name:"香港"
            },
            {
                count: 0,
                id: 33,
                name:"澳门"
            },
            {
                count: 0,
                id: 34,
                name:"台湾"
            }
        ];



        function init() {

            var socket = io.connect('http://localhost:3030');
            socket.on('news', function (data) {
                console.log(data);
            });
            socket.emit('news', {"world":"hello"})

            var width  = 1000;
            var height = 1000;

            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(0,0)");

            var projection = d3.geo.mercator()
                                .center([107, 31])
                                .scale(850)
                                .translate([width/2, height/2]);

            var path = d3.geo.path()
                            .projection(projection);


            //var color = d3.scale.category20();
            var color = function(count) {
                if(count == 0) {
                    return "#fff5ee";
                }
                if( count >0 && count <= 50 ) {
                    return "#D2B48C";
                }
                if( count >50 && count <= 100 ) {
                    return "#F4A460";
                }
                if( count >100 && count <= 200 ) {
                    return "#8B4513";
                }
                if( count >200 && count <= 500 ) {
                    return "#A0522D";
                }
                if( count >500 && count <= 1000 ) {
                    return "#734A12";
                }
                if( count > 1000 ) {
                    return "#5E2612";
                }

            }

            var addId="";
            var deFadeIn = _.debounce(function() {
                //console.log(addId);
                _.each(ipData, function(v) {
                    if( v.id == addId ) {
                        $(".name").text(v.name);
                        $(".count").text(v.count);
                    }
                })
                $('.tip').fadeIn(300);
            }, 300);
            var deFadeOut = _.debounce(function() {
                $('.tip').fadeOut(300);
            }, 0);


            d3.json("/china.json", function(error, root) {

                if (error)
                    return console.error(error);
                //console.log(root.features);

               /* _.each(root.features, function(v) {
                    console.log(v.properties.id);
                    console.log(v.properties.name);
                })*/
                svg.selectAll("path")
                    .data( root.features )
                    .enter()
                    .append("path")
                    .attr("stroke","#000")
                    .attr("stroke-width",1)
                    .attr("fill", function(d,i){
                        var name = d.properties.name;
                        var id = d.properties.id;
                        var count  = "#D2B48C";
                //console.log(id);
                        _.each(ipData, function(v) {
                            if( v.id == id ) {
                                //console.log(v.count);
                                count = v.count;
                            }
                        })
    //console.log(color(count));
                        return color(count);
                    })
                    .attr("d", path )
                    .on("mouseover",function(d,i){
                       // console.log(d.properties.name);
                        //console.log(d.properties.id);
                        d3.select(this)
                            .attr("fill","yellow");

                        addId = d.properties.id;
                        deFadeIn();

                    })
                    .on("mouseout",function(d,i){
                        var name = d.properties.name;
                        var id = d.properties.id;
                        var count  = "#D2B48C";
                        _.each(ipData, function(v) {
                            if( v.id == id ) {
                                //console.log(v.count);
                                count = v.count;
                            }
                        });

                        d3.select(this)
                            .attr("fill",color(count));

                        deFadeOut();

                    });

            });
        }


        function parseData(res) {
            _.each(res.data, function(val, key) {
                if( key !== "totalCount" ) {
                    _.each(ipData, function(v, k){
                        if( v.id == key ) {
                            v.count = val.split("-")[0];
                        }
                    });
                }
            });
        }

        $.ajax({
            url:"/getJsonData",
            type:"GET",
            success: function(res) {

                //console.log(ipData);
                parseData(res);
                init();
            }
        })
    });
})(jQuery);