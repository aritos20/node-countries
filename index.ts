const fs = require('fs');

const data: string = fs.readFileSync('./countries.txt', {encoding: 'utf8', flag: 'r'});
const regexNum = /[0-9,]/;
const regexComma = /,/g;

const calcDensity = (arr: Array<string>, index: number): string => {
    let population: number = 0;
    let area: number = 0;

    population = Number(arr[index].replace(regexComma, ''))
    if (arr[index + 1].match(regexNum)) {
        area = Number(arr[index + 1].replace(regexComma, ''));
        return (population / area).toFixed(2);
    } else {
        return 'No density because there is no enough data';
    }
}


const convertToCsv = (fileParsed: Array<string>): string => {
    let ret: Array<string> = [];
    let j: number = 0;

    for (let i: number = 0; i < fileParsed.length; i += 2) {
        ret[j] = fileParsed[i] + ',' + fileParsed[i + 1];
        j++;
    }
    return ret.join('\n');
}

const parseData = (data: string): string => {
    let arr: Array<string> = data.split(/[ \n]/);
    let ret: Array<string> = [];
    let retIndex: number = 0;

    for (let i: number = 3; i < arr.length; i++) {
        if (arr[i].match(regexNum) && !arr[i - 1].match(regexNum)) {
            ret[retIndex] = calcDensity(arr, i);
            if (!(ret[retIndex] === 'No density because there is no enough data'))
                i++;
        } else {
            ret[retIndex] = arr[i];
            while (!arr[i + 1].match(regexNum)) {
                ret[retIndex] = ret[retIndex].concat(` ${arr[i + 1]}`);
                i++;
            }
        }
        retIndex++;
    }
    return convertToCsv(ret);
}

fs.writeFileSync('paises.csv', parseData(data));
