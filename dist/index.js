#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var notifier = require("node-notifier");
var ms = require("ms");
var parseDuration = function (val) {
    return ms(val);
};
var TITLE = 'Periodic Notifier';
var ICON = '../images/time.png';
program
    .version('1.0.0')
    .option('-I --interval <time>', 'Interval at which the notification should be fired.', parseDuration)
    .option('-T --title [title]', 'Title of the message')
    .option('-M --message <message>', 'Actual message')
    .option('-IC --icon <icon>', 'absolute path to icon.png')
    .option('-S --sound', 'set this flag to make sound')
    .option('-W --wait', 'set this flag to wait the notification')
    .parse(process.argv); // end with parse to parse through the input
if (!program.interval || !program.message) {
    console.log('both --interval (3h, 2h etc) and --message (\'this is a message!\') options are required');
    process.exit(1);
}
else {
    // periodic function
    setInterval(function () {
        notifier.notify({
            icon: program.icon || ICON,
            message: program.message,
            sound: program.sound,
            title: program.title || TITLE,
            wait: program.wait,
        }, function (err, res) {
            console.error(err);
            console.log('notified at ' + new Date());
        });
    }, program.interval);
}
//# sourceMappingURL=index.js.map