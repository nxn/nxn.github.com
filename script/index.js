import * as page from './page.js';

function showMenu(e) {
    e.preventDefault();
    document.querySelector('#links').classList.toggle('hidden');
    return false;
}

function init() {
    page.writeEmail('#links .email');
    page.attach('click', '#menu-btn', showMenu);
    page.randomRotate('.img', 20);
    
    /*document.querySelectorAll('.color-box').forEach(function(e) {
        e.style.backgroundColor = page.randomColor();
    });

    /*page.attach('click', '.box', function(e) {
        let box = e.target.closest('.box');
        let desc = box.querySelector('.description');

        if (desc) {
            document.querySelectorAll('.box').forEach(function(e) {
                if (e !== box) {
                    e.classList.toggle('hidden');
                }
            });
            box.classList.toggle('grid-full-row');
            desc.classList.toggle('hidden');
        }
    });*/
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 1);
} else {
    document.addEventListener("DOMContentLoaded", init);
}