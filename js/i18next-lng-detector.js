!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).i18nextBrowserLanguageDetector=t()}(this,(function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var t=[],o=t.forEach,n=t.slice;function i(e){return o.call(n.call(arguments,1),(function(t){if(t)for(var o in t)void 0===e[o]&&(e[o]=t[o])})),e}var a,r=function(e,t,o,n){var i,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{path:"/"};if(o){var r=new Date;r.setTime(r.getTime()+60*o*1e3),i="; expires="+r.toUTCString()}else i="";n=n?"domain="+n+";":"",a=Object.keys(a).reduce((function(e,t){return e+";"+t.replace(/([A-Z])/g,(function(e){return"-"+e.toLowerCase()}))+"="+a[t]}),""),document.cookie=e+"="+encodeURIComponent(t)+i+";"+n+a},u=function(e){for(var t=e+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var i=o[n];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return null},c={name:"cookie",lookup:function(e){var t;if(e.lookupCookie&&"undefined"!=typeof document){var o=u(e.lookupCookie);o&&(t=o)}return t},cacheUserLanguage:function(e,t){t.lookupCookie&&"undefined"!=typeof document&&r(t.lookupCookie,e,t.cookieMinutes,t.cookieDomain,t.cookieOptions)}},l={name:"querystring",lookup:function(e){var t;if("undefined"!=typeof window)for(var o=window.location.search.substring(1).split("&"),n=0;n<o.length;n++){var i=o[n].indexOf("=");if(i>0)o[n].substring(0,i)===e.lookupQuerystring&&(t=o[n].substring(i+1))}return t}};try{a="undefined"!==window&&null!==window.localStorage;window.localStorage.setItem("i18next.translate.boo","foo"),window.localStorage.removeItem("i18next.translate.boo")}catch(e){a=!1}var s={name:"localStorage",lookup:function(e){var t;if(e.lookupLocalStorage&&a){var o=window.localStorage.getItem(e.lookupLocalStorage);o&&(t=o)}return t},cacheUserLanguage:function(e,t){t.lookupLocalStorage&&a&&window.localStorage.setItem(t.lookupLocalStorage,e)}},f={name:"navigator",lookup:function(e){var t=[];if("undefined"!=typeof navigator){if(navigator.languages)for(var o=0;o<navigator.languages.length;o++)t.push(navigator.languages[o]);navigator.userLanguage&&t.push(navigator.userLanguage),navigator.language&&t.push(navigator.language)}return t.length>0?t:void 0}},g={name:"htmlTag",lookup:function(e){var t,o=e.htmlTag||("undefined"!=typeof document?document.documentElement:null);return o&&"function"==typeof o.getAttribute&&(t=o.getAttribute("lang")),t}},d={name:"path",lookup:function(e){var t;if("undefined"!=typeof window){var o=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(o instanceof Array)if("number"==typeof e.lookupFromPathIndex){if("string"!=typeof o[e.lookupFromPathIndex])return;t=o[e.lookupFromPathIndex].replace("/","")}else t=o[0].replace("/","")}return t}},h={name:"subdomain",lookup:function(e){var t;if("undefined"!=typeof window){var o=window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);o instanceof Array&&(t="number"==typeof e.lookupFromSubdomainIndex?o[e.lookupFromSubdomainIndex].replace("http://","").replace("https://","").replace(".",""):o[0].replace("http://","").replace("https://","").replace(".",""))}return t}};var p=function(){function t(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.type="languageDetector",this.detectors={},this.init(e,o)}var o,n,a;return o=t,(n=[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services=e,this.options=i(t,this.options||{},{order:["querystring","cookie","localStorage","navigator","htmlTag"],lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"],checkWhitelist:!0,checkForSimilarInWhitelist:!1}),this.options.checkForSimilarInWhitelist&&(this.options.checkWhitelist=!0),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=o,this.addDetector(c),this.addDetector(l),this.addDetector(s),this.addDetector(f),this.addDetector(g),this.addDetector(d),this.addDetector(h)}},{key:"addDetector",value:function(e){this.detectors[e.name]=e}},{key:"detect",value:function(e){var t=this;e||(e=this.options.order);var o,n=[];if(e.forEach((function(e){if(t.detectors[e]){var o=t.detectors[e].lookup(t.options);o&&"string"==typeof o&&(o=[o]),o&&(n=n.concat(o))}})),n.forEach((function(e){if(!o){var n=t.services.languageUtils.formatLanguageCode(e);t.options.checkWhitelist&&!t.services.languageUtils.isWhitelisted(n)||(o=n),!o&&t.options.checkForSimilarInWhitelist&&(o=t.getSimilarInWhitelist(n))}})),!o){var i=this.i18nOptions.fallbackLng;"string"==typeof i&&(i=[i]),i||(i=[]),o="[object Array]"===Object.prototype.toString.apply(i)?i[0]:i[0]||i.default&&i.default[0]}return o}},{key:"cacheUserLanguage",value:function(e,t){var o=this;t||(t=this.options.caches),t&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(e)>-1||t.forEach((function(t){o.detectors[t]&&o.detectors[t].cacheUserLanguage(e,o.options)})))}},{key:"getSimilarInWhitelist",value:function(e){var t=this;if(this.i18nOptions.whitelist){if(e.includes("-")){var o=e.split("-")[0],n=this.services.languageUtils.formatLanguageCode(o);if(this.services.languageUtils.isWhitelisted(n))return n;e=n}var i=this.i18nOptions.whitelist.find((function(o){var n=t.services.languageUtils.formatLanguageCode(o);if(n.startsWith(e))return n}));return i||void 0}}}])&&e(o.prototype,n),a&&e(o,a),t}();return p.type="languageDetector",p}));