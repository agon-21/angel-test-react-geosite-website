import development from './development.js'
import local from './local'

let configuration = {};

switch (process.env.NODE_ENV) {
    case 'development':
        configuration = development;
        break;
    case 'local':
    default:
        configuration = local;
        break;
}

module.exports = configuration;