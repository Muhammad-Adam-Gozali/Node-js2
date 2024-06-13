import * as fs from 'fs';

const filePath = 'latihan-baca-file.txt';

fs.readFile(filePath, 'utf8', (err: any, data: any) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});
