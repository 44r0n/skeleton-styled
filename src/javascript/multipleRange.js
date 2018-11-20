function setupMultiRanges(multiRanges) {    
    multiRanges.forEach(setupMultiRange);
}

function setupMultiRange(multiRange) {
    var container = multiRange.parentNode;
    var dataValues = multiRange.getAttribute('data-values');
    if (dataValues != null) {
        var values = multiRange.getAttribute('data-values').split(' ');

        values.forEach(function (value) {
            var rangePart = multiRange.cloneNode();
            rangePart.type = 'range';
            rangePart.removeAttribute('data-values');
            rangePart.value = value;
            rangePart = container.insertBefore(rangePart, multiRange);
        });
        
        multiRange.remove();
    }
}

