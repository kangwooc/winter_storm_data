import { times } from "./times";
import { PowerOutagesJSON } from "./winter-storm";
import * as XLSX from "xlsx";
import { getState } from "./api";
import "dotenv/config";

const features = PowerOutagesJSON.features;

async function getData() {
  let dict = {};
  let idx = 1;
  for (const feature of features) {
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
    console.log(`working process: ${idx++}/${features.length}`);
  }
  return dict;
}

async function createSheet(data) {
  const wb = XLSX.utils.book_new();
  Object.keys(data).forEach(async (key) => {
    console.log("adding sheet");
    const ws = await XLSX.utils.json_to_sheet(dict[key]);
    await XLSX.utils.book_append_sheet(wb, ws, key);
  });
  return wb;
}

async function main() {
  const data = await getData();
  const wb = await createSheet(data);
  await XLSX.writeFile(wb, "./data/weather_data.xlsx");
  console.log("Done!");
}

main();
