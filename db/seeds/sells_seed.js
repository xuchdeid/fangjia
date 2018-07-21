exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('sell')
        .del()
        .then(() => {
            return knex('record').del();
        })
        .then(() => {
            // Inserts seed entries
            return knex('sell').insert({
                url: 'https://cd.lianjia.com/ershoufang/106101225822.html',
                title: '保利金香槟 顶跃带花园 套四三卫 已经装修',
                desc: '4室2厅/163m²/南/保利金香槟',
                city: 'cd'
            });
        })
        .then(() => {
            // Inserts seed entries
            return knex('sell')
                .insert({
                    url: 'https://cd.lianjia.com/ershoufang/106101225821.html',
                    title: '保利金香槟 顶跃带花园 套四三卫 已经装修',
                    desc: '4室2厅/163m²/南/保利金香槟',
                    city: 'cd'
                })
                .returning('id');
        })
        .then(id => {
            return knex('record').insert({
                total: 520.0,
                last: 620.0,
                date: '2018-07-14',
                sell_id: parseInt(id)
            });
        });
};
