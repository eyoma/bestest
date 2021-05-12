import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './routes.js'


const ngModule = angular.module('app', [uirouter])
        .config(routes);

require('./components')(ngModule)
require('./services')(ngModule)
