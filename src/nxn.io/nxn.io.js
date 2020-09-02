import { page, config } from '@shared/base.js';
import graphics from '@shared/images/graphics.svg';
import './nxn.io.css';

import { init as viewerInit } from '../viewer/viewer.js';

function writeEmail() {
    const i = '<svg class="icon"><use href="' + graphics + '#icon-mail" /></svg>';
    page.write('<a href="mailto:' + config.email + '">' + i + ' ' + config.email + '</a>', '#links .email');
}

function init() {
    writeEmail();
    if (document.querySelector('a.viewer')) {
        viewerInit();
    }
}

page.ready(init);