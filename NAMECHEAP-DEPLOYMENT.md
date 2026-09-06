# Deploy NeuraXAI to Namecheap Shared Hosting

This package is for Namecheap cPanel's **Setup Node.js App** feature. Do not
extract it directly into `public_html`, and do not upload `.env.local`.

## 1. Create the Node.js application

1. Sign in to Namecheap and open **cPanel**.
2. Open **Setup Node.js App** and select **Create Application**.
3. Choose **Node.js 22** and **Production** mode.
4. Set the application root to a new folder such as `neuraxai-app`.
5. Select `neuraxai.co.uk` as the application URL.
6. Set the startup file to `server.js`, then create the application.

## 2. Upload the package

1. In cPanel, open **File Manager** and enter the application-root folder.
2. Upload `neuraxai-namecheap.zip` into that folder.
3. Extract it there. The application root should then directly contain
   `server.js`, `package.json`, `package-lock.json`, plus the `dist` and
   `public` folders.
4. Delete the uploaded ZIP from the server after extraction.

## 3. Add environment variables

If cPanel reports that it cannot find `.htaccess`, open **File Manager**, enter
the exact application-root folder, enable **Show Hidden Files (dotfiles)** in
Settings, and create a new empty file named `.htaccess`. Do not add a port,
proxy, or redirect rule to this file; cPanel's Node.js application manager
maintains its own configuration.

In **Setup Node.js App**, add these variables. Copy the values from the local
`.env.local` file; do not upload that file.

- `NODE_ENV` = `production`
- `RESEND_API_KEY` = the private Resend API key
- `RESEND_FROM_EMAIL` = `NeuraX Website <onboarding@resend.dev>` for now, or
  `NeuraX Website <enquiries@neuraxai.co.uk>` after verifying the domain in
  Resend. In cPanel, enter the value without surrounding quote marks.
- `CONTACT_RECIPIENT` = `chandibloom@gmail.com`
- `NEXT_PUBLIC_GA_ID` = `G-KE1T5QTDDN`
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = `447443797893`
- `NEXT_PUBLIC_SHOW_FOUNDING_OFFER` = `true`
- `GOOGLE_SITE_VERIFICATION` = the Search Console token, when available

Do not create a `PORT` variable. cPanel manages the application port.

## 4. Install and start

1. Select **Run NPM Install** in the Node.js application screen.
2. When installation finishes, select **Restart Application**.
3. Open `https://neuraxai.co.uk` in a private browser window.

Test the homepage, one project page, the favicon, and one enquiry submission.
The enquiry should arrive at `chandibloom@gmail.com`.

## Updating the website later

On the development computer, run:

```powershell
npm run build
npm run package:namecheap
```

Upload and extract the new ZIP into the same cPanel application root, replacing
the old application files, then restart the Node.js application.

## Domain and HTTPS

If the domain is not already connected to this Namecheap hosting account, use
the server IP from the Namecheap hosting welcome email or cPanel to update the
domain's A record. Preserve all mail, Resend verification, SPF, DKIM, and DMARC
records when changing DNS. Enable Namecheap's SSL for both `neuraxai.co.uk` and
`www.neuraxai.co.uk` before advertising the site.
