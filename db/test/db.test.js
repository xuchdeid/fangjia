process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const knex = require('../connection');
const sells = require('../queries/sells');
const records = require('../queries/records');

describe('db : test', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback()
            .then(() => {
                return knex.migrate.latest();
            })
            .then(() => {
                return knex.seed.run();
            });
    });

    describe('getAllSells', () => {
        it('should return all sells', done => {
            sells.getAll().then(data => {
                //console.log(data);
                data.length.should.eql(2);
                data[0].should.include.keys(
                    'id',
                    'url',
                    'title',
                    'desc',
                    'city'
                );
                done();
            });
        });
    });

    describe('get sell :id', () => {
        it('should return one sell', done => {
            sells.get('2').then(data => {
                expect(data[0]).to.not.be.null;
                data[0].id.should.eql(2);
                done();
            });
        });
    });

    describe('get sell :url', () => {
        it('should return one sell', done => {
            sells
                .find(
                    {
                        url:
                            'https://cd.lianjia.com/ershoufang/106101225821.html'
                    },
                    'id'
                )
                .then(data => {
                    expect(data[0]).to.not.be.null;
                    data[0].id.should.eql(2);
                    done();
                });
        });
    });

    describe('getAllRecords', () => {
        it('should return all records', done => {
            records.getAll().then(data => {
                //console.log(data);
                data.length.should.eql(1);
                data[0].should.include.keys(
                    'id',
                    'total',
                    'last',
                    'date',
                    'sell_id'
                );
                //should.exist(data[0].sell_id);
                expect(data[0].sell_id).to.not.be.null;
                done();
            });
        });
    });

    describe('get record :id', () => {
        it('should return one record', done => {
            records.get('1').then(data => {
                expect(data[0]).to.not.be.null;
                data[0].id.should.eql(1);
                done();
            });
        });
    });

    it('should throw an error if the sell does not exist', done => {
        sells.get('99999999').then(data => {
            data.length.should.eql(0);
            done();
        });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });
});
