  /**
 * function to calculate based on monthly 
 * Reduces daily data into monthly averages.
 * @param {Array} dataArray - array of daily values
 * @param {Array} mthDays - array of days per month (e.g., [31, 28, 31...]).
 * @returns {Array} array of 12 monthly averages.
 */
 function calculateMonthlyAverages(dataArray, mthDays) {
  let startIndex = 0;
  return mthDays.map(days => {
    //Slice the  data for the specific month
    const mthSlice = dataArray.slice(startIndex, startIndex + days);

    //move to the next iteratio
    startIndex += days;

    //Calculate Average if data exists, otherwise return null
    if (mthSlice.length === 0) return null;

    const sum = mthSlice.reduce((a, b) => a + b, 0);
    const avg = (sum / mthSlice.length).toFixed(2);

    return parseFloat(avg);
  });
}

//load csv and convert to text
async function loadCSV(filePath) {
  try {
    // Fetch the file 
    const response = await fetch(filePath); 
    
    // Convert the response csv to plain text
    const csvText = await response.text();
    return csvText;
    
  } catch (error) {
      console.error("Could not load the CSV file:", error);
      return null;
  }
}

//convert the csv loaded onto json array
 function readCSVToJson(csv) {
  const csvLines = csv.trim().split(/\r?\n/); // Split into rows and remove empty lines
  const csvHeaders = csvLines[0].split(","); // Get the headers from the first row

  // Map the remaining rows into objects
  return csvLines.slice(1).map(line => {
      const data = line.split(",");
      const jsonObj = {};

      // looking the array
      csvHeaders.forEach((header, index) => {
        // Assign the data to the header key, or null if empty
        jsonObj[header.trim()] = data[index] ? data[index].trim() : null;
      });

      return jsonObj;
  });
}

export default {
    calculateMonthlyAverages,
    loadCSV,
    readCSVToJson
};