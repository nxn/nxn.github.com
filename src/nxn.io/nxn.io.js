import '@shared/styles/reset.css';
import '@shared/fonts/fonts.css';
import './nxn.io.css';

import { config as cfg } from '../config';
import { page } from '@shared/scripts/utils';
import { init as viewerInit } from '../viewer/viewer.js';

function writeEmail() {
    const i = '<svg class="icon"><use xlink:href="#icon-mail" /></svg>';
    page.write('<a href="mailto:'+cfg.email+'">'+i+' '+cfg.email+'</a>', '#links .email');
}

export function init() {
    writeEmail();
    viewerInit();
}