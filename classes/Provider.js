/**
 * This is the base Provider class.
 */
function Provider() {
    this.name = 'defaultProvider';
    this.unit = 'defaultUnit';
    this.displayName = 'defaultDisplayName';
}
/**
 * Creates API Urls for AJAX calls
 * @param string url Input url to process 
 * @returns DeferredObj call to the API
 */
Provider.prototype.createAPICall = function (url) {
    return url;
};
/**
 * Loops through the results and apply parseResults to each
 * @param array results  Results returned from providers API
 * @param array pageUrls Requested urls to process
 * @returns {} parsed results object
 */
Provider.prototype.processResults = function(results, pageUrls){
    var _results = {};
    for (var i = 0, len = pageUrls.length; i < len; i++) {
        var _pageUrl = pageUrls[i],
            _result = results[i];
        this.parseResults(_results,_result,_pageUrl);
    }
    return _results;
};
/**
 * API results parser
 * @param {} results store
 * @param {} result single API response
 * @param string pageUrl input url
 * @returns {{count: number, raw_obj: {}}}
 */
Provider.prototype.parseResults = function (results, result, pageUrl) {
    return results[pageUrl] = {
        'count': 0,
        'raw_obj': result
    };
};
/**
 * Creates object structure for Providers object
 * @param {} results parsed results
 * @returns {{name: *, unit: *, displayName: *, results: *}}
 */
Provider.prototype.createResultObj = function (results) {
    return {
        name: this.name,
        unit: this.unit,
        displayName: this.displayName,
        results: results
    };
};
/**
 * Sets all the pages to get counts for them and starts processing by providers
 * @param pageUrls
 * @returns {*}
 */
Provider.prototype.setPages = function (pageUrls) {
    var _that = this;
    //If single page — create array
    var _pageUrls = $.isArray(pageUrls) ? pageUrls : [pageUrls],
        _ajaxes = [];
    //Create AJAX calls per page
    for (var i = 0, len = _pageUrls.length; i < len; i++) {
        var _pageUrl = $.trim(_pageUrls[i]);
        _ajaxes.push(this.createAPICall(_pageUrl));
    }
    var _dfd = $.Deferred();
    var _results = {};
    //Run all the AJAX calls
    $.when.apply(undefined, _ajaxes).done(function () {
        var args = Array.prototype.slice.call(arguments);
        if (_ajaxes.length === 1) args = [args];
        _results = _that.processResults(args, _pageUrls);
        _dfd.resolve(_that.createResultObj(_results));
    });
    return _dfd.promise();
};