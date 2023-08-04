import { useEffect, useState } from "react";
import { InfluxDB, flux } from "@influxdata/influxdb-client";
import getConfig from "next/config";

export async function fetchAccelerationData() {
    const { publicRuntimeConfig } = getConfig();
    const url = publicRuntimeConfig.INFLUX_URL;
    const token = publicRuntimeConfig.INFLUX_TOKEN;
    const org = publicRuntimeConfig.INFLUX_ORG;
    const bucket = publicRuntimeConfig.INFLUX_BUCKET;

    const client = new InfluxDB({ url, token });
    const queryApi = client.getQueryApi(org);

    const fetchData = async (field) => {
        const query = flux`from(bucket: "${bucket}") |> range(start: -1s) |> filter(fn: (r) => r._measurement == "acceleration" and r._field == "${field}")`;
        const results = await queryApi.collectRows(query);
        return results;
    };

    const fields = ["x", "y", "z"];
    const allPromises = fields.map(fetchData);

    const allData = await Promise.all(allPromises);

    const timeMap = {};

    allData.forEach((fieldData, index) => {
        fieldData.forEach((data) => {
            const time = data._time;
            if (!timeMap[time]) {
                timeMap[time] = { _time: time };
            }
            timeMap[time][fields[index]] = data._value;
        });
    });

    const combinedData = Object.values(timeMap);
    combinedData.sort((a, b) => new Date(a._time) - new Date(b._time));

    return combinedData;
}

export default function Acceleration() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const newData = await fetchAccelerationData();
            setData(newData);
        };

        fetchAllData();

        const intervalId = setInterval(fetchAllData, 100);

        return () => clearInterval(intervalId);
    }, []);
}
