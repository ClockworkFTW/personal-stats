const axios = require("axios");
const cheerio = require("cheerio");

const cors = process.env.CORS_PROXY;
const base_url = "https://www.myfitnesspal.com/reports/printable_diary";
const username = process.env.MFP_USERNAME;
const config = { headers: { Origin: "x-requested-with" } };

const getNutrition = async (date) => {
  try {
    const url = `${cors}/${base_url}/${username}?from=${date}&to=${date}`;
    const result = await axios.get(url, config);

    const $ = cheerio.load(result.data);

    var results = {};
    const cols = {};

    // prettier-ignore
    $('#food').find('thead').find('tr').find('td').each((index, element) => {
      let fieldName = $(element).text().toLowerCase();
      if (fieldName === "sugars") { fieldName = "sugar"; } // fixes MFP nutrient field name inconsistency
      if (fieldName === "cholest") { fieldName = "cholesterol"; } // fixes MFP nutrient field name inconsistency
      if (index !== 0) { cols[fieldName] = index; } // ignore first field, which just says "Foods"
    });

    // find row in MFP with nutrient totals
    const $dataRow = $("tfoot").find("tr");

    // store data for each field in results
    for (let field in cols) {
      const col = cols[field] + 1;
      // prettier-ignore
      let mfpData = $dataRow.find("td:nth-child(" + col + ")").first().text();
      mfpData = Number(mfpData.replace(/[^0-9\.]+/g, ""));
      results[field] = mfpData;
    }

    // add date to results object
    results.date = date;

    return results;
  } catch (error) {
    return null;
  }
};

const getWorkouts = async (date) => {
  try {
    const url = `${cors}/${base_url}/${username}?from=${date}&to=${date}`;
    const result = await axios.get(url, config);

    const $ = cheerio.load(result.data);

    var results = [];
    const cols = {};
    const rows = {};

    // prettier-ignore
    $('#excercise').find('thead').find('tr').find('td').each((index, element) => {
      let fieldName = $(element).text().toLowerCase();
      if (index !== 0) { cols[fieldName] = index; } // ignore first field, which just says "Exercises"
    });

    // prettier-ignore
    $('#excercise').find('tbody').find('tr').each((index, element) => {
      let fieldName = $(element).find('.first').text().toLowerCase();
      if (index !== 0 ) { rows[fieldName] = index; } // ignore first field, which just says "Foods"
    });

    // store data for each field in results
    for (let rField in rows) {
      const row = rows[rField] + 1;
      let workout = { type: rField, date };

      for (let cField in cols) {
        const col = cols[cField] + 1;
        // prettier-ignore
        let mfpData = $('#excercise').find('tbody').find("tr:nth-child(" + row + ")").find("td:nth-child(" + col + ")").first().text()
        mfpData = Number(mfpData.replace(/[^0-9\.]+/g, ""));
        workout = { ...workout, [cField]: mfpData };
      }

      if (workout.type !== "mfp ios calorie adjustment") {
        results.push(workout);
      }
    }

    return results;
  } catch (error) {
    return null;
  }
};

module.exports = { getNutrition, getWorkouts };
