import * as XLSX from "xlsx";
import { PromisePool } from '@supercharge/promise-pool'

import { times } from "./times";
import { PowerOutagesJSON } from "./winter-storm";
import { getAddress } from "./api";
import { states } from "./states";
import "dotenv/config";

const features = PowerOutagesJSON.features;

async function getData() {
  let dict = {};
  let idx = 1;
  console.log("starting sheet");

  const addresses = await PromisePool
      .for(features)
      .withConcurrency(50)
      .process(async (feature) => {
          const geometry = feature.geometry;
          const { coordinates } = geometry;
          return getAddress(coordinates);
      });

  for (const feature of features) {
    const properties = feature.properties;
    const { time } = properties;
    const address = addresses[idx - 1];
    if (!dict[times[time]]) {
      dict[times[time]] = [];
    }

    let county = address?.county || "";

    if (county.includes(" ") && county.includes("County")) {
      county = county.replace(" County", "");
    }

    const data = {
      name: properties.name,
      num_outage: properties["num_out"],
      num_total: properties["num_total"],
      pctg_outage: properties["pctg_out"],
      time: times[time],
      state: states[address.state],
      county,
    };
    dict[data.time].push(data);
    console.log(
      `working process: ${data.name}, ${data.state}, ${data.county} ${idx++}/${
        features.length
      }`
    );
  }
  return dict;
}

async function createSheet(data) {
  const wb = XLSX.utils.book_new();
  let idx = 1;
  console.log("adding sheet");
  Object.keys(data).forEach(async (key) => {
    console.log(`working process: ${idx++}/${features.length}`);
    const ws = await XLSX.utils.json_to_sheet(data[key]);
    await XLSX.utils.book_append_sheet(wb, ws, key);
  });
  return wb;
}

async function main() {
  const data = await getData();
  const wb = await createSheet(data);
  await XLSX.writeFile(wb, `./data/${new Date().getTime()}/weather_data.xlsx`);
  console.log("Done!");
}

main();
