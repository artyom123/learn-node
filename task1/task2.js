import * as fs from "fs";
import { csv } from "csvtojson";

const csvFilePath = './csv/file.csv';
const txtFile = 'file.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFile);

readStream
    .pipe(csv({ downstreamFormat: "json" }))
    .pipe(writeStream)
    .on('error', (error) => {
        console.log(error);
    });

readStream.on('error', (error) => {
    console.log(error);
});
writeStream.on('error', (error) => {
    console.log(error);
});
