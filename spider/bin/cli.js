#!/usr/bin/env node

const optionator = require('optionator');
const fangjia = require('../lib');
//const db = require('../lib/collection');
//const Record = db.Record;
const sells = require('../../db/queries/sells');
const records = require('../../db/queries/records');
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
    Promise.resolve(cities).then(all => {
        all.map(async city => {
            let data = await sells.find({ city: city }, 'id');
            console.log(`${city} ${data.length}`);
        });
    });
} else if (cities.length == 1) {
    fangjia
        .getDownList(cities[0])
        .then(list => {
            list.map(async item => {
                const sell = {
                    title: item.title,
                    desc: item.desc,
                    url: item.url,
                    city: cities[0]
                };

                const record = {
                    total: item.total,
                    last: item.last,
                    date: item.date,
                    sell_id: null
                };

                let data = await sells.find({ url: sell.url }, 'id');

                let id = data[0] ? data[0].id : null;
                if (id) {
                    record.sell_id = id;
                    await records.add(record);
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
        })
        .catch(err => {
            console.error(err);
        });
} else {
    console.log(option.generateHelp());
}
