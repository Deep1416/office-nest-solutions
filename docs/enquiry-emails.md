# Email enquiries to the support inbox

Every enquiry — the home page "Send an Enquiry" form, the quote forms and the "Request a callback" popup — is saved locally in the browser and, if configured, emailed to officematesupport@gmail.com. No Google Sheet is involved.

## Setup

1. Sign in to the Google account that should send the emails (e.g. officematesupport@gmail.com) and open [script.google.com](https://script.google.com) → **New project**.
2. Replace the code with:

   ```js
   var NOTIFY_EMAIL = "officematesupport@gmail.com";

   function esc(v) {
     return String(v == null || v === "" ? "-" : v)
       .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
   }

   function row(label, raw) {
     var value = esc(raw);
     return '<tr><td style="padding:10px 16px;color:#6b7280;width:130px;border-bottom:1px solid #eef0f4">' + label +
       '</td><td style="padding:10px 16px;color:#0b1f44;font-weight:600;border-bottom:1px solid #eef0f4">' + value + "</td></tr>";
   }

   function button(href, label, bg) {
     return '<a href="' + href + '" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:8px;' +
       "background:" + bg + ';color:#ffffff;text-decoration:none;font-weight:600;font-size:14px">' + label + "</a>";
   }

   function doPost(e) {
     var d = JSON.parse(e.postData.contents);
     var isCallback = d.kind === "callback";
     var digits = String(d.phone || "").replace(/\D/g, "");
     if (digits.length === 10) digits = "91" + digits;
     var when = Utilities.formatDate(new Date(d.createdAt), "Asia/Kolkata", "dd MMM yyyy, hh:mm a") + " IST";

     var rows = isCallback
       ? [["Name", d.name], ["Phone", d.phone], ["Preferred time", d.when], ["Message", d.message]]
       : [["Name", d.name], ["Phone", d.phone], ["Email", d.email], ["City", d.city],
          ["Purpose", d.purpose], ["Message", d.message]];

     var buttons = button("tel:+" + digits, "Call now", "#0b1f44") +
       button("https://wa.me/" + digits + "?text=" + encodeURIComponent("Hi " + (d.name || "") + ", this is OfficeMate. Thanks for your enquiry!"), "WhatsApp", "#25d366") +
       (d.email ? button("mailto:" + d.email, "Reply by email", "#f97316") : "");

     var html =
       '<div style="background:#f5f7fb;padding:24px;font-family:Arial,Helvetica,sans-serif">' +
       '<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e8ef">' +
       '<div style="background:#0b1f44;padding:20px 24px"><div style="color:#ffffff;font-size:20px;font-weight:700">Office<span style="color:#f59e0b">Mate</span></div>' +
       '<div style="color:#c7d2e8;font-size:13px;margin-top:4px">' + (isCallback ? "New callback request" : "New website enquiry") + "</div></div>" +
       '<table style="width:100%;border-collapse:collapse;font-size:14px">' +
       rows.map(function (r) { return row(r[0], r[1]); }).join("") + "</table>" +
       '<div style="padding:18px 16px 10px">' + buttons + "</div>" +
       '<div style="padding:0 24px 20px;color:#9aa3b5;font-size:12px">Received ' + when + " via officemate.co.in</div>" +
       "</div></div>";

     var text = rows.map(function (r) { return r[0] + ": " + (r[1] || "-"); }).join("\n") + "\n\nReceived: " + when;

     MailApp.sendEmail({
       to: NOTIFY_EMAIL,
       replyTo: d.email || NOTIFY_EMAIL,
       name: "OfficeMate Website",
       subject: (isCallback ? "Callback request: " : "New enquiry: ") + d.name +
         (!isCallback && d.purpose ? " — " + d.purpose : "") + (d.city ? " (" + d.city + ")" : ""),
       body: text,
       htmlBody: html,
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

After changing the Apps Script code, update the existing deployment instead of creating a new one, so the URL stays the same: **Deploy → Manage deployments → ✏️ (edit) → Version: New version → Deploy**. Apps Script limits free Gmail accounts to about 100 emails per day.
