# Send enquiries to a Google Sheet

Every enquiry (home page "Send an Enquiry", quote forms) is saved locally and, if configured, also appended as a row to a Google Sheet (open it in Excel via File → Download → .xlsx anytime).

## Setup

1. Create a Google Sheet. In row 1 add the headers: `Date | Name | Phone | Email | City | Purpose | Message`.
2. **Extensions → Apps Script**, replace the code with:

   ```js
   function doPost(e) {
     var d = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSheet().appendRow([
       new Date(d.createdAt), d.name, d.phone, d.email, d.city, d.purpose, d.message || "",
     ]);
     return ContentService.createTextOutput("ok");
   }
   ```

3. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*. Copy the web-app URL.
4. Create a `.env` file in the project root:

   ```
   VITE_LEADS_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
   ```

5. Restart `bun dev` (and set the same variable in your hosting provider's environment for production).

After changing the Apps Script code, publish a **new version** of the deployment.
