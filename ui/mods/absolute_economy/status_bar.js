(function() {
    console.log('run', location)
    loadTemplate = function ($element, url, model) {
        $element.load(url, function () {
            console.log("Loading html " + url, arguments);
            ko.applyBindings(model, $element[0]);
        });
    };

    loadTemplate($('.div_status_bar_cont'), 'coui://ui/mods/absolute_economy/status_bar.html', model);
})()
