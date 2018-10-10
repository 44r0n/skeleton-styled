var elms = document.querySelectorAll('input[type=range]');

elms.forEach(function(elm) {
    var container = elm.parentNode;
    var dataValues = elm.getAttribute('data-values');
    if (dataValues != null) {
        var values = elm.getAttribute('data-values').split(' ');

        values.forEach(function (value, i, values) {
        var rangePart = elm.cloneNode();
        rangePart.type = 'range';
        rangePart.removeAttribute('data-values');
        rangePart.value = value;
        rangePart = container.insertBefore(rangePart, elm);
        });
        
        elm.remove();
    }
});
