// System Variabiles
import { exec as cmdExecScript } from 'child_process';
// Configs Imports
import { console_gnome_start, onboarding_gnome_start, weather_gnome_start } from './src/configs/server_start_strings.js';
import { execErrorHandler } from './src/utils/cmd_exec_command.js';

cmdExecScript(onboarding_gnome_start, (error) => execErrorHandler('ONBOARDING', error));
cmdExecScript(console_gnome_start, (error) => execErrorHandler('CONSOLE', error));
cmdExecScript(weather_gnome_start, (error) => execErrorHandler('WEATHER', error));

function initiate_server_start() { }
