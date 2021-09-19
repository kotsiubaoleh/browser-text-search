import * as fs from 'fs/promises';


async function process() {
    const inputFile = await fs.open('./log.txt', 'r');
    const outputFile = await fs.open('./escapedLog.txt', 'w');
    let bytesRead = 0;
    do {
        let result = await inputFile.read();
        bytesRead = result.bytesRead;
        let strBuf = result.buffer.toString('utf8', 0, bytesRead);
        strBuf = strBuf.replace(/(\r\n|\n|\r)/gm, '\\n');
        strBuf = strBuf.replace(/\"/g, '\\"');
        await outputFile.write(strBuf);
    } while(bytesRead)
    
}

process();