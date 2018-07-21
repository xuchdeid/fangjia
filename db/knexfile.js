const path = require('path');

const BASE_PATH = path.join(__dirname);

module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://app:app@localhost:5432/fangjia_test',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://app:app@localhost:5432/fangjia',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};
