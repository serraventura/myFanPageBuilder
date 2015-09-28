var request = require('request');
var Q = require('q');

var tokenValidation = function(accessToken){

    var deferred = Q.defer();

    var httpOptions = {
        url: 'https://graph.facebook.com/me?access_token=' + accessToken
    };

    request(httpOptions, function(error, response, body) {

        var data;

        try{
            data = JSON.parse(body);
        }catch(err){
            error = err;
            data = error;
        };

        if(!error){

            if (response.statusCode == 200) {
                deferred.resolve(data);
            } else {
                deferred.reject(data);
            }

        }else{
            deferred.reject(data);
        }

    });

    return deferred.promise;

}

exports.tokenValidation = tokenValidation;