
function myFunction() {

  //Reset the memory of processed files if you want all files to be loaded everytime
  PropertiesService.getScriptProperties().deleteProperty("processedFileIds");
  Logger.log("✅ Cleared processed files memory.");


  var folderId = "XXXXXXXXXXXXXXXXXXXXXXX"; // 🔁 Replace this with your actual folder ID
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var scriptProperties = PropertiesService.getScriptProperties();
  var processedFiles = JSON.parse(scriptProperties.getProperty("processedFileIds") || "[]");

  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    var fileName = file.getName();

    if (!fileName.toLowerCase().endsWith(".csv") || processedFiles.includes(fileId)) {
      Logger.log("Skipping file: " + fileName);
      continue;
    }

    var csvText = file.getBlob().getDataAsString();
    if (!csvText) continue;

    var csvData = Utilities.parseCsv(csvText, ";");
    if (csvData.length < 2) continue;

    var headers = csvData[0];
    var idIndex = 0;
    var dateIndex = 1;

    var groupedByDate = {};

    for (var i = 1; i < csvData.length; i++) {
      var rawRow = csvData[i];
      if (!rawRow || rawRow.length < headers.length) continue;

      // Replace empty cells with "N/A"
      var row = rawRow.map(cell => (cell && cell.trim() !== "") ? cell.trim() : "N/A");

      var dateTime = row[dateIndex];
      if (!dateTime || dateTime === "N/A") continue;

      var dateOnly = dateTime.split(" ")[0];
      var [mm, dd, yyyy] = dateOnly.split("/");

      if (!mm || !dd || !yyyy) continue;

      var sheetName = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
      if (!groupedByDate[sheetName]) groupedByDate[sheetName] = [];
      groupedByDate[sheetName].push(row);
    }

    for (var date in groupedByDate) {
      var rows = groupedByDate[date];
      var sheet = spreadsheet.getSheetByName(date);

      if (!sheet) {
        sheet = spreadsheet.insertSheet(date);
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length).setHorizontalAlignment("left");
      }

      // Load existing Ids into a Set
      var existingIds = new Set();
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        var idValues = sheet.getRange(2, idIndex + 1, lastRow - 1, 1).getValues();
        idValues.forEach(function(row) {
          if (row[0] && row[0].toString().trim() !== "") {
            existingIds.add(row[0].toString().trim());
          }
        });
      }

      // Filter rows:
      // - If Id is present and already exists → skip
      // - If Id is N/A or empty → include
      var newRows = rows.filter(function(row) {
        var rowId = row[idIndex].toString().trim();
        if (rowId === "N/A" || rowId === "") return true; // keep
        return !existingIds.has(rowId);
      });

      if (newRows.length > 0) {
        var startRow = sheet.getLastRow() + 1;
        sheet.getRange(startRow, 1, newRows.length, headers.length).setValues(newRows);
        sheet.getRange(startRow, 1, newRows.length, headers.length).setHorizontalAlignment("left");
        //sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, headers.length).setValues(newRows);
        Logger.log(`✅ Appended ${newRows.length} rows to '${date}'`);
      } else {
        Logger.log(`⚠️ No new rows to append for '${date}'`);
      }
    }

    // Track processed file
    processedFiles.push(fileId);
    scriptProperties.setProperty("processedFileIds", JSON.stringify(processedFiles));
  }

  Logger.log("✅ All files processed.");
}






