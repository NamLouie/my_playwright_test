const { test, expect } = require('@playwright/test');
const ExcelJs = require("exceljs");

async function writeExcelTest(searchText,replaceText, change , filePath) {

  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet,searchText);
  
  const cell = worksheet.getCell(output.row,output.column+change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet,searchText){
  let output = {row:-1, column: -1};
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {

      if(cell.value === searchText){
        output.row = rowNumber;
        output.column = colNumber;
      }

    })

  })
  return output;
}

// writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:\\Users\\ROMMEL LOUIE SUMANDE\\Downloads\\excelTest.xlsx");

test("Upload download excel validation", async ({page}) => {

  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
   const searchText = "Mango";
    const updateValue = '300';
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("#downloadButton").click(),
    ]);
    const downloadPath = 'C:\\Users\\ROMMEL LOUIE SUMANDE\\Downloads\\download.xlsx';
    await download.saveAs(downloadPath);
    writeExcelTest(searchText, updateValue, { rowChange: 0, colChange: 2 }, "C:\\Users\\ROMMEL LOUIE SUMANDE\\Downloads\\download.xlsx");
    await page.waitForTimeout(1000);
    await page.locator("#fileinput").setInputFiles("C:\\Users\\ROMMEL LOUIE SUMANDE\\Downloads\\download.xlsx");
    const textLocator = await page.getByText(searchText);
    const desiredRow = await (page.getByRole("row").filter({ has: textLocator }).locator("#cell-4-undefined")).textContent();
    console.log(desiredRow);
    await expect(desiredRow).toEqual(updateValue);

})

//C:\\Users\\ROMMEL LOUIE SUMANDE\\Downloads\\download.xlsx"