import { config as cfg } from '@shared/base.js';
import { page } from '@shared/scripts/utils';
import './resume.css';

export function init() {
    const i = '<svg class="icon"><use xlink:href="#icon-mail" /></svg>';
    page.write('<a href="mailto:'+cfg.email+'">'+i+' '+cfg.email+'</a>', '#contact .email');
}