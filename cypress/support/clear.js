const rimraf = require('rimraf');

rimraf.sync('report/json/*')
rimraf.sync('report/html/*')
rimraf.sync('report/screenshots/*')