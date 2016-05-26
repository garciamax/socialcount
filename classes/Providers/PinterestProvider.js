function PinterestProvider() {
    Provider.call(this);
    this.name = 'PinterestProvider';
    this.displayName = 'Pinterest';
    this.unit = 'Pins';
}
PinterestProvider.prototype = Object.create(Provider.prototype);
PinterestProvider.prototype.createAPICall = function (url) {
    return $.getJSON('http://api.pinterest.com/v1/urls/count.json?callback=?',
        {url: url});
};
PinterestProvider.prototype.parseResults = function (results, result, pageUrl) {
    var _result = result[0];
    return results[_result.url] = {
        'count': _result.count
//                ,'raw_obj': _result
    };
};
