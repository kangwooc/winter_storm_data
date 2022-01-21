import "dotenv/config";

async function getState(cord) {
  const pointCord = cord[0][0][0];
  console.log(pointCord);
  const url = `${BASE_URL}/v1/reverse/access_key=${API_KEY}&query=${cord}?limit=1&output=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results[0].region_code;
}

module.exports = getState;
