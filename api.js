import fetch from "node-fetch";

export async function getState(cord) {
  let pointCord, long, lat;

  pointCord = cord[0][0][0];
  long = pointCord[0];
  lat = pointCord[1];

  const url = `${process.env.BASE_URL}?access_key=${process.env.API_KEY}&query=${long},${lat}&limit=3&output=json`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.error();
    process.exit(1);
  }

  return data.results && data.results > 0 ? data.results[0].region_code : "NA";
}
