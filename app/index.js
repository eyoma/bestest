import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './routes.js'

if (ON_TEST){
        require('angular-mocks/angular-mocks')
}

const ngModule = angular.module('app', [uirouter])
        .config(routes);

require('./components')(ngModule)
require('./services')(ngModule)
