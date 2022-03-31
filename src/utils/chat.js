window.purechatApi = {
    l: [],
    t: [],
    on: function () {
        this.l.push(arguments);
    }
};

(function () {
    var done = false;
    var script = document.createElement('script');
    script.setAttribute("id", "chatScript");
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript';
    document.getElementsByTagName('HEAD').item(0).appendChild(script);
    script.onreadystatechange = script.onload = function (e) {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            var w = new PCWidget({ c: '53730c05-701b-42d9-a15c-28e57599f3fe', f: true });
            done = true;
        }
    };
}
)();
