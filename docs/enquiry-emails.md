# Email enquiries to the support inbox

Every enquiry — the home page "Send an Enquiry" form, the quote forms and the "Request a callback" popup — is saved locally in the browser and, if configured, emailed to officematesupport@gmail.com. No Google Sheet is involved.

## Setup

1. Sign in to the Google account that should send the emails (e.g. officematesupport@gmail.com) and open [script.google.com](https://script.google.com) → **New project**.
2. Replace the code with:

   ```js
   var NOTIFY_EMAIL = "officematesupport@gmail.com";

   function doPost(e) {
     var d = JSON.parse(e.postData.contents);
     var isCallback = d.kind === "callback";
     var lines = isCallback
       ? ["Name: " + d.name, "Phone: " + d.phone, "Preferred time: " + (d.when || "-"), "Message: " + (d.message || "-")]
       : ["Name: " + d.name, "Phone: " + d.phone, "Email: " + d.email, "City: " + (d.city || "-"),
          "Purpose: " + (d.purpose || "-"), "Message: " + (d.message || "-")];
     MailApp.sendEmail({
       to: NOTIFY_EMAIL,
       replyTo: d.email || NOTIFY_EMAIL,
       subject: (isCallback ? "Callback request: " : "New enquiry: ") + d.name + (d.city ? " (" + d.city + ")" : ""),
       body: lines.join("\n") + "\n\nReceived: " + d.createdAt,
     });
     return ContentService.createTextOutput("ok");
   }
   ```

3. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*. Click **Authorize access** and allow sending email. Copy the web-app URL.
4. For local development, create a `.env` file in the project root:

   ```
   VITE_ENQUIRY_EMAIL_URL=https://script.google.com/macros/s/XXXX/exec
   ```

   Then restart `npm run dev`.
5. For production, add the same `VITE_ENQUIRY_EMAIL_URL` variable in Vercel (Project → Settings → Environment Variables) and redeploy.

After changing the Apps Script code, publish a **new version** of the deployment. Apps Script limits free Gmail accounts to about 100 emails per day.
