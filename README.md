# winter_storm_data

## How to run

In terminal, run the following command:

```bash
cd winter_storm_data
npm install
npm start
```

Additionally, you need to sign up to [positionstack](http://positionstack.com/)
to use **free** geocoding api up to 25,000 requests to get region code.
To use this api, you need to create `.env` file to root project folder and set environment variables like below;

```bash
# .env
BASE_URL=http://api.positionstack.com/v1/reverse
API_KEY=YOUR_API_KEY
```

## Reference

https://data.caller.com/winter-storm-power-outages/
