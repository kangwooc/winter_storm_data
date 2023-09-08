import fetch from "node-fetch";

export async function getAddress(cord) {
  let pointCord, lon, lat;

  pointCord = cord[0][0][0];
  lon = pointCord[0];
  lat = pointCord[1];

  const url = `${process.env.BASE_URL}&lat=${lat}&lon=${lon}`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  return data && data.address ? data.address : {};
}
