// System Variabiles
import { exec } from 'child_process';
// Configs Imports
import { console_gnome_start, onboarding_gnome_start, weather_gnome_start } from './src/server/server_start_strings.js';
import { execErrorHandler } from './src/utils/cmd_exec_command.js';
import { logger } from './src/utils/winston_logger.js';

exec(onboarding_gnome_start, (error) => execErrorHandler('ONBOARDING', error));
// exec(console_gnome_start, (error) => execErrorHandler('CONSOLE', error));
// exec(weather_gnome_start, (error) => execErrorHandler('WEATHER', error));

function initiate_server_start() { }

//#region Keyboard Listener
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
    // ctrl-c ( end of text )
    if (key === '\u0003') {
        logger.info('Exit');
        process.exit(0);
    }
    // write the key to stdout all normal like
    process.stdout.write(key);
});
//#endregion








