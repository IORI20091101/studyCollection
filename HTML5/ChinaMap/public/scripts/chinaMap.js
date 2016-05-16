(function($) {
    $(function() {




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
            if( count >=0 && count <= 50 ) {
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
            console.log(addId);
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
            console.log(root.features);

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
            console.log(id);
                    _.each(ipData, function(v) {
                        if( v.id == id ) {
                            console.log(v.count);
                            count = v.count;
                        }
                    })
console.log(color(count));
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
                            console.log(v.count);
                            count = v.count;
                        }
                    });

                    d3.select(this)
                        .attr("fill",color(count));

                    deFadeOut();

                });

        });


    });
})(jQuery);