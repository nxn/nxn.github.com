export const page = {
    attach: function(event, selector, callback) {
        document.querySelectorAll(selector).forEach(function(e) {
            e.addEventListener(event, callback)
        })
    },
    write: function(text, selector) {
        document.querySelector(selector).innerHTML = text;
    },
    ready: function(exec) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(exec, 1);
        } else {
            document.addEventListener("DOMContentLoaded", exec);
        }
    }
}