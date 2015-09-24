(function (excludedFiles) {

    // include a third-party async loader library
    /*!
     * $script.js v1.3
     * https://github.com/ded/script.js
     * Copyright: @ded & @fat - Dustin Diaz, Jacob Thornton 2011
     * Follow our software http://twitter.com/dedfat
     * License: MIT
     */
    !function(a,b,c){function t(a,c){var e=b.createElement("script"),f=j;e.onload=e.onerror=e[o]=function(){e[m]&&!/^c|loade/.test(e[m])||f||(e.onload=e[o]=null,f=1,c())},e.async=1,e.src=a,d.insertBefore(e,d.firstChild)}function q(a,b){p(a,function(a){return!b(a)})}var d=b.getElementsByTagName("head")[0],e={},f={},g={},h={},i="string",j=!1,k="push",l="DOMContentLoaded",m="readyState",n="addEventListener",o="onreadystatechange",p=function(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c]))return j;return 1};!b[m]&&b[n]&&(b[n](l,function r(){b.removeEventListener(l,r,j),b[m]="complete"},j),b[m]="loading");var s=function(a,b,d){function o(){if(!--m){e[l]=1,j&&j();for(var a in g)p(a.split("|"),n)&&!q(g[a],n)&&(g[a]=[])}}function n(a){return a.call?a():e[a]}a=a[k]?a:[a];var i=b&&b.call,j=i?b:d,l=i?a.join(""):b,m=a.length;c(function(){q(a,function(a){h[a]?(l&&(f[l]=1),o()):(h[a]=1,l&&(f[l]=1),t(s.path?s.path+a+".js":a,o))})},0);return s};s.get=t,s.ready=function(a,b,c){a=a[k]?a:[a];var d=[];!q(a,function(a){e[a]||d[k](a)})&&p(a,function(a){return e[a]})?b():!function(a){g[a]=g[a]||[],g[a][k](b),c&&c(d)}(a.join("|"));return s};var u=a.$script;s.noConflict=function(){a.$script=u;return this},typeof module!="undefined"&&module.exports?module.exports=s:a.$script=s}(this,document,setTimeout)

    function hasDuplicatesArray(array) {
        var valuesSoFar = {};
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
    };

    function loadCSS(files){

        var fileHref;

        for (var i = 0; i < files.length; i++) {

            fileHref = document.createElement('link');
            fileHref.setAttribute('rel', 'stylesheet');
            fileHref.setAttribute('type', 'text/css');
            fileHref.setAttribute('href', files[i]);
            document.body.appendChild(fileHref);

        };

    };

    function parseHTML() {

        $.ajax({
            url: '/index.html',
            success: function (data) {

                var scriptArr = [];
                var cssIncludeArr = [];
                var res = $('<html />').html(data);
                var scripts = res.find('script');
                var styles = res.find('link[type="text/css"]');

                for (var i = 0; i < styles.length; i++) {
                    cssIncludeArr.push(styles[i].href.replace(location.origin + '/', ''));
                }

                if (hasDuplicatesArray(cssIncludeArr)) {
                    alert('There are styles being included twice. Check your index.html.');
                }

                for (var i = 0; i < scripts.length; i++) {
                    scriptArr.push(scripts[i].src.replace(location.origin + '/', ''));
                }

                if (hasDuplicatesArray(scriptArr)) {
                    alert('There are scripts being included twice. Check your index.html.');
                }

                excludedFiles = excludedFiles || [];
                if (excludedFiles.length > 0) {

                    var idx;
                    for (var i = 0; i < excludedFiles.length; i++) {

                        idx = scriptArr.indexOf(excludedFiles[i]);
                        if (idx != -1) {
                            scriptArr.splice(idx, 1);
                        }

                        idx = cssIncludeArr.indexOf(excludedFiles[i]);
                        if (idx != -1) {
                            cssIncludeArr.splice(idx, 1);
                        }
                    }

                }
                
                loadCSS(cssIncludeArr);

                scriptArr.push('//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js');

                $script(scriptArr, function() {
                    // when all is done, execute bootstrap angular application
                    angular.bootstrap(document, ['BuilderApp']);
                });

            }
        });

    };

    if(typeof(jQuery) == 'undefined') {
        window.jQuery = 'loading';
        var jq = document.createElement('script');
        jq.type = 'text/javascript';
        jq.src = '//cdn.fnkr.net/jquery/jquery-2.0.3.js';
        jq.onload = function() {
            console.log('jQuery ' + jQuery.fn.jquery + ' loaded successfully.');
            parseHTML();
        };
        jq.onerror = function () {
            delete jQuery;
            console.log('Error while loading jQuery!');
        };
        document.getElementsByTagName('head')[0].appendChild(jq);
    } else {
        if (typeof (jQuery) == 'function') {
            console.log('jQuery (' + jQuery.fn.jquery + ') is already loaded!');
        } else {
            console.log('jQuery is already loading...');
        }
    };

})([
    'scripts/loader.js'
]);