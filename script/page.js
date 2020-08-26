const cfg = {
    domain: 'nxn.io',
    user: (!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]],
    get email() { return cfg.user + '&#64;' + cfg.domain }
}

export function writeEmail(selector) {
    const i = '<svg class="icon"><use xlink:href="#mail" /></svg>';
    document.querySelector(selector).innerHTML = '<a href="mailto:'+cfg.email+'">'+i+' '+cfg.email+'</a>';
}

export function randomRotate(selector, maxDegrees) {
    let max = typeof maxDegrees === "number" ? maxDegrees : 15.0;

    document.querySelectorAll(selector).forEach(function(e) {
        e.classList.add('no-transition');
        e.style.setProperty('transform', 'rotate(' + (Math.random() * max - (max/2) | 0) + 'deg)'); 
        e.offsetHeight;
        e.classList.remove('no-transition');
    });
}

export function attach(event, selector, callback) {
    document.querySelectorAll(selector).forEach(function(e) {
        e.addEventListener(event, callback)
    });
}

export function toggleClass(element, className) {
    console.log(className, element);
    // toggle class
}

export function randomColor() {
    let r = (Math.random() * 255 | 0).toString(16),
        g = (Math.random() * 255 | 0).toString(16),
        b = (Math.random() * 255 | 0).toString(16);
    
    r = r.length < 2 ? '0' + r : r;
    g = g.length < 2 ? '0' + g : g;
    b = b.length < 2 ? '0' + b : b;

    let color = '#' + r + g + b;
    return color;
}