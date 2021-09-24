let logText;

loader.instantiate(
    fetch("optimized.wasm")
).then(({ exports }) => {
    console.log(exports.add);
    console.log(exports.add(1, 5));
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