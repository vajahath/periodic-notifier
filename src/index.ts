#!/usr/bin/env node

import * as program from 'commander';
import * as notifier from 'node-notifier';
import ms = require('ms');
import { join } from 'path';
import * as packageDetails from '../package.json';

const parseDuration = (val: string): number => {
	return ms(val);
};

const TITLE = 'Periodic Notifier';
const ICON = join(__dirname, '/../images/time.png');

program
	.version(packageDetails.version)
	.option(
		'-I --interval <time>',
		'Interval at which the notification should be fired. To know more about time formats see docs.',
		parseDuration,
	)
	.option('-T --title [title]', 'Title of the message')
	.option('-M --message <message>', 'Actual message')
	.option('-C --icon <icon>', 'absolute path to icon.png')
	.option('-S --sound', 'set this flag to make sound')
	.option('-W --wait', 'set this flag to wait the notification')
	.parse(process.argv); // end with parse to parse through the input

if (!program.interval || !program.message) {
	console.log(
		'both --interval (3h, 2h etc) and --message (\'this is a message!\') options are required',
	);
	process.exit(1);
} else {
	// periodic function
	setInterval(() => {
		notifier.notify(
			{
				icon: program.icon || ICON,
				message: program.message,
				sound: program.sound,
				title: program.title || TITLE,
				wait: program.wait,
			},
			(err, res) => {
				console.error(err);
				console.log('notified at ' + new Date());
			},
		);
	}, program.interval);
}
