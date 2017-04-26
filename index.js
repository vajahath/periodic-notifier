var program = require('commander');
var lme = require('lme');
var ms = require('ms');
var notifier = require('node-notifier');
var path = require('path');

var parseDuration = function(val) {
	return ms(val);
}

var TITLE = 'Periodic Notifier';
var ICON = path.join(__dirname, 'time.jpg');

lme.h(ICON);

program
	.version('1.0.0')
	.option('-I --interval <time>', 'Interval at which the notification should be fired.', parseDuration)
	.option('-T --title [title]', 'Title of the message')
	.option('-M --message <message>', 'Actual message')
	.option('-IC --icon <icon>', 'absolute path to icon.png')
	.option('-S --sound', 'set this flag to make sound')
	.option('-W --wait', 'set this flag to wait the notification')
	.parse(process.argv); // end with parse to parse through the input

if (!program.interval ||
	!program.message) {
	lme.e("both --interval (3h, 2h etc) and --message ('this is a message!') options are required")
	process.exit(1);
} else {
	lme.w(program.sound);
	// periodic function
	setInterval(function() {
		notifier.notify({
			title: program.title || TITLE,
			message: program.message,
			icon: program.icon || ICON,
			sound: program.sound,
			wait: program.wait
		}, function(err, res) {
			lme.e(err);
			lme.s('notified at ' + new Date());
		});
	}, program.interval);

}
