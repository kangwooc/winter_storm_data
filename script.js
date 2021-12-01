import { times } from './times';
import { PowerOutagesJSON } from './winter-storm';
import * as XLSX from 'xlsx';

const features = PowerOutagesJSON.features;
const wb = XLSX.utils.book_new();
let dict = {};

features.forEach((feature) => {
    const properties = feature.properties;
    const { time } = properties;
    if (!dict[times[time]]) {
        dict[times[time]] = [];
    }
    const data = {
        name: properties.name,
        'num_outage': properties['num_out'],
        'num_total': properties['num_total'],
        'pctg_outage': properties['pctg_out'],
        time: times[time]
    }
    dict[times[time]].push(data);
});

Object.keys(dict).forEach(key => {
    const ws = XLSX.utils.json_to_sheet(dict[key]);
    XLSX.utils.book_append_sheet(wb, ws, key);
});

XLSX.writeFile(wb, './data/output.export.xlsx');
