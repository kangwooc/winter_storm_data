# How to merge osm data
## Instruction
1. Download osm data from [geofabrik](https://download.geofabrik.de/) and extract it to `osm-maps/data` folder.
2. Install [osmium](https://osmcode.org/osmium-tool/manual.html) to your system.
    ```bash
    ## if you're using macOS
    brew install osmium-tool
    ```
3. Run the following command to merge osm data.
    ```bash
    ## example
    osmium merge ./osm-maps/data/north-america-latest.osm.pbf ./osm-maps/data/texas-latest.osm.pbf -o ./osm-maps/data/merged.osm.pbf
    ```
4. Done!

## Reference
- https://gis.stackexchange.com/questions/242704/merging-osm-pbf-files
