(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{ujfY:function(t,e,n){"use strict";n.d(e,"a",(function(){return L}));var r=n("wx14"),i=n("KQm4"),a=n("rePB"),o=n("zLVn");function c(t,e){return e||(e=t.slice(0)),t.raw=e,t}var u=n("DZdY"),s=n("q1tI"),l=n.n(s),f=n("GN+H"),v=n("AeFk");function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){Object(a.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(){var t=c(["",""]);return d=function(){return t},t}function p(){var t=c(["This value must be in increments of ",""]);return p=function(){return t},t}function O(){var t=c(["This value is not a valid "," address"]);return O=function(){return t},t}function h(){var t=c(["This value cannot be converted to a ",""]);return h=function(){return t},t}function y(){var t=c(["This value is too small, minimum size: ",""]);return y=function(){return t},t}function g(){var t=c(["This value is too large, maximum size: ",""]);return g=function(){return t},t}function j(){var t=c(["This value is too short, minimum length: ",""]);return j=function(){return t},t}function w(){var t=c(["This value is too long, maximum length: ",""]);return w=function(){return t},t}function x(){var t=c(["This field cannot be blank or empty"]);return x=function(){return t},t}var M={valueMissing:Object(f.c)(x()),tooLong:Object(f.c)(w(),"maxLength"),tooShort:Object(f.c)(j(),"minLength"),rangeOverflow:Object(f.c)(g(),"max"),rangeUnderflow:Object(f.c)(y(),"min"),badInput:Object(f.c)(h(),"type"),typeMismatch:Object(f.c)(O(),"type"),stepMismatch:Object(f.c)(p(),"step"),patternMismatch:Object(f.c)(d(),"title")};function L(t){var e=t.multiline,n=t.deferValidation,a=t.errors,c=t.onInvalid,u=Object(o.a)(t,["multiline","deferValidation","errors","onInvalid"]),s=e?P:T,f=b(b({},M),a),m=l.a.useRef(null);l.a.useEffect((function(){if(m.current){var t=m.current;!function(t,e){var n="",r=(t.type||"").toLowerCase();t.required&&(t.validity.valueMissing||""===t.value.trim())?n=e.valueMissing(t):t.pattern&&t.validity.patternMismatch?n=e.patternMismatch(t):t.maxLength&&t.validity.tooLong?n=e.tooLong(t):t.minLength&&t.validity.tooShort?n=e.tooShort(t):t.max&&t.validity.rangeOverflow?n=e.rangeOverflow(t):t.min&&t.validity.rangeUnderflow?n=e.rangeUnderflow(t):t.step&&t.validity.stepMismatch?n=e.stepMismatch(t):"email"!==r&&"url"!==r||!t.validity.typeMismatch?t.validity.badInput&&(n=e.badInput(t)):n=e.typeMismatch(t);t.setCustomValidity(n)}(t,f),!n&&t.reportValidity()&&t.classList.remove("invalid")}}),[m.current,m.current&&m.current.value,n].concat(Object(i.a)(Object.values(f))));return Object(v.c)(s,Object(r.a)({ref:m,onInvalid:function(t){c&&c(t),m.current&&m.current.classList.add("invalid")}},u))}var T=Object(u.a)("input",{target:"e1nh71zd1",label:"TextInputField"})((function(t){return t.theme.styles.controls.textbox}),""),P=Object(u.a)("textarea",{target:"e1nh71zd0",label:"TextAreaField"})((function(t){return t.theme.styles.controls.textbox}),"")}}]);
//# sourceMappingURL=bd73a8745c80610a3eb2227d6d47e80b775bdada-88148fc9f4e6c24234e2.js.map