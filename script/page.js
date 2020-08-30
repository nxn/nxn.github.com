const cfg = {
    domain: 'nxn.io',
    user: (!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]],
    get email() { return cfg.user + '&#64;' + cfg.domain }
}

export function writeEmail(selector) {
    const i = '<svg class="icon"><use xlink:href="#icon-mail" /></svg>';
    document.querySelector(selector).innerHTML = '<a href="mailto:'+cfg.email+'">'+i+' '+cfg.email+'</a>';
}

export function attach(event, selector, callback) {
    document.querySelectorAll(selector).forEach(function(e) {
        e.addEventListener(event, callback)
    });
}
