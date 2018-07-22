const Http = require('./http').Http;
const cheerio = require('cheerio');

/**
 * <tr>
 *  <td>1</td>
 *  <td><span class='label label-success'>-700.0&nbsp;&nbsp;<i class='icon-arrow-down'></i></span></td>
 *  <td><a href='https://sh.lianjia.com/ershoufang/107100171068.html' target='_blank'>七期独栋别墅，客厅挑空，南进门南花园，北临张家浜河</a></td>
 *  <td>5室3厅/449.82m²/南/御翠园</td>
 *  <td>117825.0</td>
 *  <td>5300.0</td>
 *  <td>6000.0</td>
 *  <td>2018-06-08</td>
 * </tr>
 */

('use strict');

let http = new Http('https://www.fangjiagou.com');
let itemNames = [
    {
        name: 'index',
        type: 'string'
    },
    {
        name: 'change',
        type: 'float'
    },
    {
        name: 'title',
        type: 'string'
    },
    {
        name: 'desc',
        type: 'string'
    },
    {
        name: 'unit',
        type: 'float'
    },
    {
        name: 'total',
        type: 'float'
    },
    {
        name: 'last',
        type: 'float'
    },
    {
        name: 'date',
        type: 'string'
    }
];

function getDownList(city) {
    return new Promise((resolve, reject) => {
        http.get('/down.php', { city: city }).then(result => {
            let list = [];
            const $ = cheerio.load(result);
            let data = $('tbody tr').each(function(i, elem) {
                let item = {};
                $(this)
                    .find('td')
                    .each(function(i, elem) {
                        if (i == 2) {
                            item['url'] = $(this)
                                .find('a')
                                .attr('href');
                        }
                        let value = $(this)
                            .text()
                            .trim();
                        if (itemNames[i].type === 'float') {
                            item[itemNames[i].name] = parseFloat(value);
                        } else {
                            item[itemNames[i].name] = value;
                        }
                    });
                list[i] = item;
            });

            resolve(list);
        });
    });
}

function getUpList(city) {
    return new Promise((resolve, reject) => {
        http.get('/up.php', { city: city }).then(result => {
            let list = [];
            const $ = cheerio.load(result);
            let data = $('tbody tr').each(function(i, elem) {
                let item = {};
                $(this)
                    .find('td')
                    .each(function(i, elem) {
                        if (i == 2) {
                            item['url'] = $(this)
                                .find('a')
                                .attr('href');
                        }
                        let value = $(this)
                            .text()
                            .trim();
                        if (itemNames[i].type === 'float') {
                            item[itemNames[i].name] = parseFloat(value);
                        } else {
                            item[itemNames[i].name] = value;
                        }
                    });
                list[i] = item;
            });

            resolve(list);
        });
    });
}

module.exports = {
    getDownList,
    getUpList
};
