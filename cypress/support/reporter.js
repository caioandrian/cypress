const report = require('multiple-cucumber-html-reporter')

report.generate({
    jsonDir: 'report/json',
    reportPath: 'report/html'
})
