#!/usr/bin/env node

const optionator = require('optionator');
const fangjia = require('../lib');
//const db = require('../lib/collection');
//const Record = db.Record;
const sells = require('../../db/queries/sells');
const records = require('../../db/queries/records');
const result = require('../../db/queries/result');

('use strict');

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
        },
        {
            option: 'list',
            alias: 'l',
            type: 'Boolean',
            description: 'list'
        }
    ]
});

let currentOptions = option.parse(process.argv);
const cities = currentOptions._;

if (currentOptions.version) {
    console.log(`v${require('../package.json').version}`);
} else if (currentOptions.help) {
    console.log(option.generateHelp());
} else if (currentOptions.list) {
    cities.map(async city => {
        let data = await result.getAll(city);
        console.log(data[0]);
    });
} else if (cities.length > 0) {
    cities.map(city => {
        Promise.all([fangjia.getDownList(city), fangjia.getUpList(city)])
            .then(lists => {
                lists.map(list => {
                    list.map(async item => {
                        const sell = {
                            title: item.title,
                            desc: item.desc,
                            url: item.url,
                            city: city
                        };

                        const record = {
                            total: item.total,
                            last: item.last,
                            date: item.date
                        };

                        let data = await sells.find({ url: sell.url }, 'id');

                        let id = data[0] ? data[0].id : null;
                        if (id) {
                            data = await records.find(record, 'id');
                            if (!data[0]) {
                                record.sell_id = id;
                                console.log('add record');
                                await records.add(record);
                            }
                        } else {
                            data = await sells.add(sell);
                            id = data[0].id;

                            if (id) {
                                record.sell_id = id;
                                await records.add(record);
                            }
                        }
                        console.log(sell.url);
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });
    });
} else {
    console.log(option.generateHelp());
}
