(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"+kg1":function(t,e,n){"use strict";n.r(e),n.d(e,"PostPage",(function(){return v})),n.d(e,"Content",(function(){return O}));var r=n("DZdY"),o=n("q1tI"),i=n.n(o),a=n("A2+M"),c=n("C5yf"),l=n("NFJg"),u=n("AeFk");function s(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function d(t){var e=t.data&&t.data.items,n=null;t.highlight&&e&&e.length>0&&(n=e[0].url);var r=i.a.useState(n),o=r[0],a=r[1];i.a.useLayoutEffect((function(){if(t.highlight&&e&&e.length){var n=3*parseFloat(window.getComputedStyle(window.document.documentElement).fontSize),r=window.document.querySelectorAll(function t(e,n){void 0===n&&(n=[]);for(var r,o=s(e);!(r=o()).done;){var i=r.value;n.push(i.url),i.items&&t(i.items,n)}return n}(e).join(", ")),o=r.length-1,i=!1,c=function(){for(var t=window.scrollY+n,e=0;e<o&&t>r[e+1].offsetTop;)e++;a("#"+r[e].id),i=!1},l=function(){i||(window.requestAnimationFrame(c),i=!0)};return document.addEventListener("scroll",l),function(){document.removeEventListener("scroll",l)}}}),[]);return Object(u.c)("div",{id:t.id,className:t.className},e&&e.length>0&&Object(u.c)(m,{items:e,renderItem:function(t){return Object(u.c)(b,{to:t.url,className:o===t.url?"current":void 0},t.title)}}))}function p(t){return Object(u.c)("ul",{className:t.className},t.items.map((function(e,n){return Object(u.c)("li",{key:n},t.renderItem(e),e.items&&e.items.length>0&&Object(u.c)(p,{items:e.items,renderItem:t.renderItem}))})))}var m=Object(r.a)(p,{target:"elrzn8b3",label:"List"})((function(t){return{fontSize:"0.9rem","& > li > a":{fontWeight:"bold",color:t.theme.palette.accents.light},"& li":{margin:"0.5rem 0"}}}),""),b=Object(r.a)(l.b,{target:"elrzn8b2",label:"ToCLink"})((function(t){var e=t.theme;return{color:e.palette.accents.purple,display:"inline-block",lineHeight:"1.5rem",boxSizing:"border-box",textDecoration:"none",padding:"0.25rem 0rem","&:hover":{color:e.palette.actions.primary.main}}}),""),g=Object(r.a)(d,{target:"elrzn8b1",label:"PageToC"})({name:"1r96n2h",styles:"margin-top:2.5rem;& li li{padding-left:1.5rem;}"}),y=Object(r.a)(d,{target:"elrzn8b0",label:"SideToC"})((function(t){var e=t.theme;return{position:"sticky",top:e.spacing.margins.vertical,overflow:"hidden","& li li":{paddingLeft:"1.0625rem"},"& a":{borderLeft:"0.0625rem solid transparent",paddingLeft:"1.0rem"},"& a.current":{color:e.palette.accents.green,borderLeft:"0.0625rem solid "+e.palette.accents.green}}}),""),h=n("qhky");function v(t){var e=t.data.mdx,n=t.data.site.siteMetadata,r=e.frontmatter.toc,o=(e.frontmatter.style||"").split(" ").find((function(t){return"wide"===t||"narrow"===t}))||"regular";return Object(u.c)(c.b,null,Object(u.c)(h.a,null,e.frontmatter.title&&Object(u.c)("title",null,e.frontmatter.title," · ",n.title),e.fields.summaryText&&Object(u.c)("meta",{name:"description",content:e.fields.summaryText})),Object(u.c)(O,{toc:!!r,width:o},Object(u.c)(j,{className:e.frontmatter.style},Object(u.c)(a.MDXRenderer,{title:e.frontmatter.title,date:e.frontmatter.date,toc:r&&Object(u.c)(g,{id:"page-toc",data:e.tableOfContents})},e.body)),r&&Object(u.c)(y,{id:"side-toc",data:e.tableOfContents,highlight:!0})))}var O=Object(r.a)("div",{target:"ealhtui1",label:"Content"})((function(t){var e,n=t.theme,r=t.toc,o=t.width,i=parseInt(function(t,e){switch(t){case"wide":return e.typography.lineLength.long;case"narrow":return e.typography.lineLength.short;default:return e.typography.lineLength.regular}}(o,n)||"40"),a=n.spacing.margins.standard.additional||.075,c=n.spacing.margins.standard.minHorizontal||2,l=100/(100-300*a)*(i+16-3*(n.breakPoints.standard*a-c));return(e={display:"grid",gridTemplateColumns:"auto",alignItems:"self-start",justifyContent:"center",gap:n.spacing.margins.horizontal,"& #page-toc":{display:r?"block":"none"},"& #side-toc":{display:"none"}})["@media (min-width: "+l+"rem)"]=r&&{gridTemplateColumns:"max-content auto","& #page-toc":{display:"none"},"& #side-toc":{display:"initial"}},e}),""),j=Object(r.a)("div",{target:"ealhtui0",label:"Post"})((function(t){var e=t.theme;return{overflow:"hidden",maxWidth:e.typography.lineLength.regular,minWidth:"18rem","&.centered-title":{"& h1":{textAlign:"center"}},"&.narrow":{maxWidth:e.typography.lineLength.short},"&.wide":{maxWidth:e.typography.lineLength.long}}}),"");e.default=v},"A2+M":function(t,e,n){var r=n("X8hv");t.exports={MDXRenderer:r}},Bnag:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},Ijbi:function(t,e,n){var r=n("WkPL");t.exports=function(t){if(Array.isArray(t))return r(t)}},RIqP:function(t,e,n){var r=n("Ijbi"),o=n("EbDI"),i=n("ZhPi"),a=n("Bnag");t.exports=function(t){return r(t)||o(t)||i(t)||a()}},SksO:function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},WkPL:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},X8hv:function(t,e,n){var r=n("sXyB"),o=n("RIqP"),i=n("lSNA"),a=n("8OQS");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var u=n("q1tI"),s=n("7ljp").mdx,f=n("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,n=t.children,i=a(t,["scope","children"]),c=f(e),d=u.useMemo((function(){if(!n)return null;var t=l({React:u,mdx:s},c),e=Object.keys(t),i=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(o(e),[""+n])).apply(void 0,[{}].concat(o(i)))}),[n,e]);return u.createElement(d,l({},i))}},ZhPi:function(t,e,n){var r=n("WkPL");t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},b48C:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},lSNA:function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},sXyB:function(t,e,n){var r=n("SksO"),o=n("b48C");function i(e,n,a){return o()?t.exports=i=Reflect.construct:t.exports=i=function(t,e,n){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return n&&r(i,n.prototype),i},i.apply(null,arguments)}t.exports=i}}]);
//# sourceMappingURL=component---src-templates-post-tsx-ee8fadee60533694a577.js.map