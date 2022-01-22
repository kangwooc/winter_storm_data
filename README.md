# winter_storm_data

## How to run

In terminal, run the following command:

```bash
cd winter_storm_data
npm install
npm start
```

Additionally, we will utilize **free** geocoding api from [nominatim](https://nominatim.org/release-docs/latest/api/Overview/).
To use this api, you need to create `.env` file to root project folder and set environment variables like below;

```bash
# .env
BASE_URL=https://nominatim.openstreetmap.org/reverse?accept-language=en&format=jsonv2&zoom=10
```

## Reference

https://data.caller.com/winter-storm-power-outages/
