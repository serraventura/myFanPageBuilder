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

    function loadCSS(){

    };

    function loadJS(){

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
            parseHTML();
        };
        jq.onerror = function () {
            delete jQuery;
            alert('Error while loading jQuery!');
        };
        document.getElementsByTagName('head')[0].appendChild(jq);
    } else {
        if (typeof (jQuery) == 'function') {
            alert('jQuery (' + jQuery.fn.jquery + ') is already loaded!');
        } else {
            alert('jQuery is already loading...');
        }
    };


})([
    ''
]);