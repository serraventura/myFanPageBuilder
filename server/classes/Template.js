var CronJob = require('cron').CronJob;
var fs = require('fs');
var path = require('path');
var Template = require('../models/templates').templateSchema;

var getNewTemplates = function () {

    var job = new CronJob({
        cronTime: '00 00 07 * * 1-7',
        onTick: function() {

            var folder = path.join(__dirname, '../_engine/myFanPage/dist/src/webcontent/views/templates');

            fs.readdir(folder, function (err, files) {

                for (var i = 0; i < files.length; i++) {
                    insertTemplate(files[i]);
                }

            });

        },
        start: false//,
        //timeZone: 'America/Los_Angeles'
    });

    return job;

}

var insertTemplate = function (name) {

    var query  = Template.where({name: name});
    query.findOne(function(err, template){

        if(err) console.error('Error querying template: ', err);

        if(!template){

            var template = new Template({name: name});

            template.save(function(err) {

                if (err) {
                    console.error('Error saving template: ', err);
                }else{
                    console.log('template saved');
                }

            });

        }else{
            console.log('template already exist.');
        }

    })

}

exports.getNewTemplates = getNewTemplates;