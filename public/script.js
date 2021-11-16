let logText;

let utf8decoder = new TextDecoder();
let utf8encoder = new TextEncoder();
const memory = new WebAssembly.Memory({initial: 1});
const memortArr = new Uint8Array(memory.buffer);


const importObj = {
    js:{
        mem: memory
    }
}

const WASM = {};

WebAssembly.instantiateStreaming(
    fetch("main.wasm"),
    importObj
).then((obj) => {
    WASM.add = obj.instance.exports.add;
    WASM.store = obj.instance.exports.store;
    WASM.search = obj.instance.exports.search;

    // memortArr.set(utf8encoder.encode('wwwwwww'));
    // console.log(add(100, 3));
    // console.log('before', utf8decoder.decode(memory.buffer));
    // WASM.store(0, 0x21);
    // console.log('after', utf8decoder.decode(memory.buffer));
})

async function process() {
    const response = await fetch('log.txt');
    logText = await response.text();
}

function printHeapSize() {
    console.log(window.performance.memory.usedJSHeapSize / 1024 / 1024, 'MB');
}

function search(term) {
    const matches = [];
    for (let i = 0; i < logText.length; i++) {
        let match = true;
        for (let j = 0; j < term.length; j++) {
            if (!logText[i + j] || term[j] !== logText[i + j]) {
                match = false;
            }
        }
        if (match) {
            //matches.push(i);
        }
    }

    return matches;
}

function nativeSearch(term) {
    const matches = [];
    let lastMatch = 0;
    while (true) {
        lastMatch = logText.indexOf(term, lastMatch + term.length);
        if (lastMatch >= 0) {
            //matches.push(lastMatch);
        } else {
            break;
        }
    }

    //return matches;
}

function wasmSearch(text, str) {
    const binText = utf8encoder.encode(text);
    memortArr.set(binText);
    const binStr = utf8encoder.encode(str);
    memortArr.set(binStr, binText.length);
    return WASM.search(0, binText.length, binText.length, binStr.length);
}

function bench(callback, timename) {
    console.time(timename);
    callback();
    console.timeEnd(timename);
}

function testSearch(term) {
    bench(() => console.log(search(term)), 'search');
    bench(() => console.log(nativeSearch(term)), 'native search');
}

process();