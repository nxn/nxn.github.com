import * as page from './page.js';

function init() {
    page.writeEmail('#contact .email');
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 1);
} else {
    document.addEventListener("DOMContentLoaded", init);
}