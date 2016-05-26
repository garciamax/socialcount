function FacebookProvider() {
    Provider.call(this);
    this.name = 'FacebookProvider';
    this.displayName = 'Facebook';
    this.unit = 'Likes';
}
FacebookProvider.prototype = Object.create(Provider.prototype);
FacebookProvider.prototype.createAPICall = function (url) {
    return $.getJSON('http://api.facebook.com/restserver.php?' +
        'format=json' +
        '&method=links.getStats' +
        '&urls=' + encodeURIComponent(url));
};
FacebookProvider.prototype.parseResults = function (results, result, pageUrl) {
    var _result = result[0][0];
    return results[pageUrl] = {
        'count': _result.like_count
//                ,'raw_obj': _result
    };
};
