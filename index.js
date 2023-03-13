var fs = require('fs');
var data = fs.readFileSync('./countries.txt', { encoding: 'utf8', flag: 'r' });
var regexNum = /[0-9,]/;
var regexComma = /,/g;
var calcDensity = function (arr, index) {
    var population = 0;
    var area = 0;
    population = Number(arr[index].replace(regexComma, ''));
    if (arr[index + 1].match(regexNum)) {
        area = Number(arr[index + 1].replace(regexComma, ''));
        return (population / area).toFixed(2);
    }
    else {
        return 'No density because there is no enough data';
    }
};
var convertToCsv = function (fileParsed) {
    var ret = [];
    var j = 0;
    for (var i = 0; i < fileParsed.length; i += 2) {
        ret[j] = fileParsed[i] + ',' + fileParsed[i + 1];
        j++;
    }
    return ret.join('\n');
};
var parseData = function (data) {
    var arr = data.split(/[ \n]/);
    var ret = [];
    var retIndex = 0;
    for (var i = 3; i < arr.length; i++) {
        if (arr[i].match(regexNum) && !arr[i - 1].match(regexNum)) {
            ret[retIndex] = calcDensity(arr, i);
            if (!(ret[retIndex] === 'No density because there is no enough data'))
                i++;
        }
        else {
            ret[retIndex] = arr[i];
            while (!arr[i + 1].match(regexNum)) {
                ret[retIndex] = ret[retIndex].concat(" ".concat(arr[i + 1]));
                i++;
            }
        }
        retIndex++;
    }
    return convertToCsv(ret);
};
fs.writeFileSync('paises.csv', parseData(data));
