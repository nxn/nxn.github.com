import { page, config } from '@shared/base.js';
import graphics from '@shared/images/graphics.svg';
import './resume.css';

function init() {
    const i = '<svg class="icon"><use href="' + graphics + '#icon-mail" /></svg>';
    page.write('<a href="mailto:' + config.email + '">' + i + ' ' + config.email+'</a>', '#contact .email');
}

page.ready(init);