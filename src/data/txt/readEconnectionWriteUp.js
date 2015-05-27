#!/usr/bin/env node

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    This program parses a text file line by line treating lines with all uppercase letters as titles and
//     all other text lines as body paragraphs.  Lines with no text are discarded. 
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var fs = require('fs');

//var filename = process.argv[2];
var line;


function isUpperCase(str) {
    return str === str.toUpperCase();
}

function print(s) {
    console.log(JSON.stringify(s));
}

function process(c, callback) {
    var isBlankLine = /^\s*$/;
    var stories = [];

    function entityFix(s) {
        var fixed = s
            .replace(/\-\-/gi, "–")
            .replace(/\.\.\.|\.\s\.\s\.\s|\…/gi, "&hellip;")
            .replace(/\”|\"$/gi, "\"")
            .replace(/(The\ New\ York\ Times|The\ Economist|The\ New\ Yorker|KERA|The\ Last\ Gentleman|David\ and\ Goliath:\ Underdogs,\ Misfits\ and\ the\ Art\ of\ Battling\ Giants|The\ Dallas\ Morning\ News)/gi, "<em>$1</em>")
            .replace(/jbowden\@dfwworld.org/gi, "<a href='mailto:jbowden@dfwworld.org' target='_blank'>jbowden@dfwworld.org</a>")
            .replace(/International\ Visitor\ Program/gi, "<a href='https://www.dfwworld.org/IVP' target='_blank'>International Visitor Program</a>")
            .replace(/International\ Education\ Program/gi, "<a href='https://www.dfwworld.org/IEP' target='_blank'>International Education Program</a>")
            .replace(/Academic\ WorldQuest/gi, "<a href='https://www.dfwworld.org/IEP/WQ' target='_blank'>Academic WorldQuest</a>")
            .replace(/Meridian\:\ Global\ Young\ Professionals/gi, "<a href='https://www.dfwworld.org/Meridian' target='_blank'>Meridian: Global Young Professionals</a>")
            .replace(/Focus\ on\ Intelligence/gi, "<a href='https://www.dfwworld.org/Intelligence' target='_blank'>Focus on Intelligence</a>");
        return fixed;
    }

    for (var i = 0, j = 0; i < c.length - 1; i++) {
        var current = c[i].trim();

        if (isUpperCase(current)) {
            current = entityFix(current);
            stories.push({
                "title": current,
                "layout": "center",
                "caption": [],
                "url": "https://www.dfwworld.org/Events",
                "body": []
            });
            j++;
        } else if (!isUpperCase(current)) {
            var entityEncoded = entityFix(current);
            stories[j - 1].body.push(entityEncoded);
        }
    };
    callback(stories);
}

fs.readFile("./src/data/txt/econnection-20150226.txt", function(err, data) {
    if (err) throw err;

    line = data.toString().trim();

    makeArray(line, process);
});

function makeArray(d, callback) {
    var current = d.split("\n");

    callback(current, print);
}