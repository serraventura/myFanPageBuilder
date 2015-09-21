(function (excludedFiles) {

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

    function loadAngular(){

        if(typeof(angular) == 'undefined') {
            var a = document.createElement('script');
            a.type = 'text/javascript';
            a.src = '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js';
            a.onload = function() {
                console.log('angular ' + angular.version.full + ' loaded successfully.');
                parseHTML();
            };
            a.onerror = function () {
                delete angular;
                console.log('Error while loading angular!');
            };
            document.getElementsByTagName('head')[0].appendChild(a);
        } else {
            if (typeof (angular) == 'function') {
                console.log('angular (' + angular.version.full + ') is already loaded!');
            } else {
                console.log('angular is already loading...');
            }
        };

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

    function loadJS(files){

        var js;

        for (var i = 0; i < files.length; i++) {

            js = document.createElement('script');
            js.type = 'text/javascript';
            js.src = files[i];
            document.body.appendChild(js);

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

                loadJS(scriptArr);
                loadCSS(cssIncludeArr);

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
            loadAngular();
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