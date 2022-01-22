# winter_storm_data

## How to run

In terminal, run the following command:

```bash
cd winter_storm_data
npm install
npm start
```

Additionally, you need to sign up to [nominatim](https://nominatim.openstreetmap.org/reverse)
to use **free** geocoding api.
To use this api, you need to create `.env` file to root project folder and set environment variables like below;

```bash
# .env
BASE_URL=https://nominatim.openstreetmap.org/reverse?accept-language=en&format=jsonv2&zoom=5
```

## Reference

https://data.caller.com/winter-storm-power-outages/
