import { times } from "./times";
import { PowerOutagesJSON } from "./winter-storm";
import * as XLSX from "xlsx";
import { getState } from "./api";
import 'dotenv/config';

const features = PowerOutagesJSON.features;
const wb = XLSX.utils.book_new();

async function getData() {
  let dict = {};
  features.forEach(async (feature) => {
    const properties = feature.properties;
    const geometry = feature.geometry;
    const { time } = properties;
    const { coordinates } = geometry;
    const state = await getState(coordinates);
    if (!dict[times[time]]) {
      dict[times[time]] = [];
    }
  
    const data = {
      name: properties.name,
      num_outage: properties["num_out"],
      num_total: properties["num_total"],
      pctg_outage: properties["pctg_out"],
      time: times[time],
      state,
    };
    dict[times[time]].push(data);
  }); 
  return dict;
}

async function createSheet(data) {
  Object.keys(data).forEach(async (key) => {
    const ws = await XLSX.utils.json_to_sheet(dict[key]);
    await XLSX.utils.book_append_sheet(wb, ws, key);
  });
  await XLSX.writeFile(wb, "./data/weather_data.xlsx");
}




const data = await getData();
createSheet(data);
