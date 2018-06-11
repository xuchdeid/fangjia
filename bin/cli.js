#!/usr/bin/env node

const optionator = require('optionator');
const fangjia = require('../lib');
const db = require('../lib/collection');
const Record = db.Record;

'use strict';

let option = optionator({
    prepend: 'fangjia sh',
    defaults: {
        concatRepeatedArrays: false,
        mergeRepeatedObjects: false
    },
    options: [
        {
            option: 'version',
            alias: 'v',
            type: 'Boolean',
            description: 'Output the version number'
        },
        {
            option: 'help',
            alias: 'h',
            type: 'Boolean',
            description: 'Show help'
        }
    ]
});

let currentOptions = option.parse(process.argv);
const cities = currentOptions._;

if (currentOptions.version) {
    console.log(`v${require('../package.json').version}`);
} else if (currentOptions.help) {
    console.log(option.generateHelp());
} else if (cities.length == 1) {
    db.init()
        .then(db => {
            return fangjia.getDownList(cities[0]);
        })
        .then(list => {
            list.map(item => {
                let data = new Record({
                    title: item.title,
                    desc: item.desc,
                    url: item.url,
                    city: cities[0],
                    unit: item.unit,
                    total: item.total,
                    last: item.last,
                    date: item.date
                });

                data.save(function(error, data) {
                    if (error) throw error;
                });
            });
            console.log('fetch success!');
            //process.exit(0);
        })
        .catch(e => {
            console.log(e);
        });
} else {
    console.log(option.generateHelp());
}
