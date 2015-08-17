(function($) {
    $(function() {
        /*$("#container1").zingchart({
            "data":{
                "type": "line",
                "legend":{

                },
                "scale-x":{
                    "zooming":true,
                    "values":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
                },
                "series": [
                    {
                        "text":"apple",
                        "values": [1,2,5,3,9,4,5,74,100,0,54,11]
                    },
                     {
                        "text":"Peaches",
                        "values":[7,2,5,1,4,3,8,0,6,0,54,11]
                    }
                ]
            }
        });

        $("#container2").zingchart({
            "data": {
                "type": "bar",
                "series": [
                    {
                        "values": [3,7,9,2]
                    }
                ]
            }
        });

        var myData = {
            "type": "bar",
            "series": [
                {
                    "values": [3,7,9,2]
                }
            ]
        };

        $("#container3").zingchart({data: myData});


        $("#container4").set3dView({"y-angle":10}).resizeChart({"width":600,"height":400});*/

        $.ajax({
            url: "/zingChartJsonData",
            success: function(data) {
                console.log(data);
                $("#container1").zingchart({
                    "data":data
                });
            }
        })
    });
})(jQuery);