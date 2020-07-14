const puppeteer = require('puppeteer');

const bytesFunc = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
  await page.goto(url);
  await page.waitForSelector('title');

  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);

  let totalBytes = 0;

  const calculateUsedBytes = (type, coverage) =>
    coverage.map(({ url, ranges, text }) => {
      let usedBytes = 0;

      ranges.forEach(range => (usedBytes += range.end - range.start - 1));

      totalBytes += text.length;

      return {
        url,
        type,
        usedBytes,
        totalBytes: text.length
      };
    });

  await browser.close();

  return {
    ...calculateUsedBytes('js', jsCoverage),
    ...calculateUsedBytes('css', cssCoverage),
    url,
    totalBytes
  }

};

module.exports = bytesFunc;