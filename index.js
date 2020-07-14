const getCoverage = require('./getCoverage');
const data = require('./mock.json');
var fs = require('fs');

(async () => {
  let output = await getCoverage(data, 0, { pages: [] });
  if (output) {
    fs.writeFile('output.json', JSON.stringify(output), 'utf8', function (err) {
      if (err) {
        console.log('Operation Failed. File could not be written.', err);
      } else {
        console.log('Operation Success. See output.json');
      }
    });
  } else { console.log('Operation Failed. File could not be written.'); }
  done();
})();
