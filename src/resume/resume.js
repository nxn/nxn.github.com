import '@shared/styles/reset.css';
import '@shared/fonts/fonts.css';
import './resume.css';
import pdf from './ewieczorek.pdf';

import { config as cfg } from '../config';
import { page } from '@shared/scripts/utils';

export function init() {
    const i = '<svg class="icon"><use xlink:href="#icon-mail" /></svg>';
    page.write('<a href="mailto:'+cfg.email+'">'+i+' '+cfg.email+'</a>', '#contact .email');
}