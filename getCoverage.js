const coverageFunc = require('./coverageFunc');

const getCoverage = async (data, itemIndex, output) => {
  return new Promise(async (resolve, reject) => {
    if (itemIndex < data.length) {
      const result = await coverageFunc(data[itemIndex]);
      if (!result) reject();
      output.pages.push({
        url: result.url,
        bytes: result.totalBytes
      });
      return resolve(getCoverage(data, itemIndex + 1, output));
    } else {
      return resolve(output);
    }
  })
}

module.exports = getCoverage;