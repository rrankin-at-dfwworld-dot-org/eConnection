var fs = require('fs');

var filename = process.argv[2];

var story =   {
    "title": "",
    "body": [],
    "layout": "left",
    "caption": [],
    "url": "https://www.dfwworld.org/Events"
  };

var stories = [];

fs.readFile(filename, function( err, data ) {
    if (err) throw err;
    var lines = data.toString().split("\n");
    var isBlankLine = /^\s*$/;
    var recordCount = 0;

    function isUpperCase( str ) {
        return str === str.toUpperCase();
    }

    for ( line in lines ) {
        var current = lines[line];

        // Skip blank lines
        if( ! isBlankLine.test( current ) ){
            // capture uppercase lines as titles
            if ( isUpperCase( current ) ){
                if ( recordCount > 0 && story.title !== "" ){
                    stories.push( story );
                    story.body = [];
                }
                story.title = current;
            } else {
                // capture non-uppercase lines as body paragraphs
                story.body.push( current );
            }
        }
        recordCount = recordCount + 1;
        console.log(recordCount + " : " + current);
    }
    //console.log( JSON.stringify( stories ) );
});

//console.log(story);