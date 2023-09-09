# winter_storm_data

## How to run

In terminal, run the following command:

```bash
git clone https://github.com/kangwooc/winter_storm_data.git
cd winter_storm_data
npm install
npm start
```

Additionally, we will utilize **free** geocoding api from [nominatim](https://nominatim.org/release-docs/latest/api/Overview/).
To use this api, you need to create `.env` file to root project folder and set environment variables like below;

```shell
# .env
BASE_URL=https://nominatim.openstreetmap.org/reverse?accept-language=en&format=jsonv2&zoom=10
```

or you could set up your own nominatim api in your local machine with [nominatim-docker](https://github.com/mediagis/nominatim-docker/tree/master).
First you need to download and merge osm data from  [geofabrik](https://download.geofabrik.de/). Please check the [guideline](./osm-maps/data/README.md).
Then with Docker, you could run
```bash
docker compose -f docker-compose.yml up -d --build
```
At last, like above, you need to create `.env` file to root project folder and set environment variables like below;
```shell
# .env
BASE_URL=http://localhost:8080/reverse?accept-language=en&format=jsonv2&zoom=10
```

## Reference
- https://data.caller.com/winter-storm-power-outages/
- https://github.com/mediagis/nominatim-docker/blob/master/4.2/README.md#openstreetmap-data-extracts
