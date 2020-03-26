const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
  try {
    const response = await axios.get("https://www.mohfw.gov.in");
    const $ = cheerio.load(response.data);

    let coVidData = [];

    $('table[style*="font-weight:bold"].table-striped > tbody > tr').each(
      function() {
        const covidObj = {
          state: $(this)
            .find("td:nth-child(2)")
            .text(),
          confirmedCases: $(this)
            .find("td:nth-child(3)")
            .text(),
          confirmedCasesForegin: $(this)
            .find("td:nth-child(4)")
            .text(),
          cured: $(this)
            .find("td:nth-child(5)")
            .text(),
          death: $(this)
            .find("td:nth-child(6)")
            .text()
        };
        coVidData.push(covidObj);
      }
    );
    console.log(coVidData);
  } catch (error) {
    console.log(error);
  }
})();
