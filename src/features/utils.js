const selectRandomMovie = (dataArr = [], num) => {
    const newDataArr = [];
    const numns = new Set();
    if (dataArr.length >= num) {
        while (newDataArr.length !== num) {
            const n = Math.floor(Math.random() * dataArr.length);
            if (!numns.has(n)) newDataArr.push(dataArr[n]);
            numns.add(n);
        }
        return newDataArr;
    } else {
        return dataArr
    }
}

export {
    selectRandomMovie
}