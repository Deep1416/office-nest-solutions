# Send enquiries to a Google Sheet and your inbox

Every enquiry (home page "Send an Enquiry", quote forms) is saved locally and, if configured, also appended as a row to a Google Sheet (open it in Excel via File → Download → .xlsx anytime) and emailed to officematesupport@gmail.com.

## Setup

1. Create a Google Sheet. In row 1 add the headers: `Date | Name | Phone | Email | City | Purpose | Message`.
2. **Extensions → Apps Script**, replace the code with:

   ```js
   var NOTIFY_EMAIL = "officematesupport@gmail.com";

   function doPost(e) {
     var d = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSheet().appendRow([
       new Date(d.createdAt), d.name, d.phone, d.email, d.city, d.purpose, d.message || "",
     ]);
     MailApp.sendEmail({
       to: NOTIFY_EMAIL,
       replyTo: d.email || NOTIFY_EMAIL,
       subject: "New OfficeMate enquiry: " + d.name + (d.city ? " (" + d.city + ")" : ""),
       body: [
         "Name: " + d.name,
         "Phone: " + d.phone,
         "Email: " + d.email,
         "City: " + (d.city || "-"),
         "Purpose: " + (d.purpose || "-"),
         "Message: " + (d.message || "-"),
       ].join("\n"),
     });
     return ContentService.createTextOutput("ok");
   }
   ```

3. The first time you deploy, Google asks you to authorize the script (it needs permission to edit the sheet and send email as you).
4. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*. Copy the web-app URL.
5. Create a `.env` file in the project root:

   ```
   VITE_LEADS_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
   ```

6. Restart `npm run dev` (and set the same variable in your hosting provider's environment for production).

After changing the Apps Script code, publish a **new version** of the deployment.
