var URL = require("url");

var myUrl = "http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash";

var parsedUrl = URL.parse(myUrl);

console.log(parsedUrl);