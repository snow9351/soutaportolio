This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact form (EmailJS)

The **Contact Me** app sends mail through [EmailJS](https://www.emailjs.com/). If you see *“Contact form isn’t configured yet”*, the app is missing environment variables.

1. Sign up at [emailjs.com](https://www.emailjs.com/) and verify your email.
2. **Email Services** → add a service (e.g. Gmail) and note the **Service ID**.
3. **Email Templates** → create a template. The placeholders must **exactly** match what the app sends, for example:
   - `{{title}}` (sender name), `{{email}}`, `{{message}}`, optional `{{subject}}`  
   - Or the older set: `{{from_name}}`, `{{reply_to}}`, `{{from_subject}}`, `{{from_message}}`  
   Set “To email” to your inbox. Save and copy the **Template ID**.
4. **Account** → **General** → copy the **Public Key**.
5. In the project root, create `.env.local` (never commit it):

   ```bash
   cp .env.example .env.local
   ```

   Fill in:

   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — public key  
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` — service ID  
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` — template ID  

6. Restart `npm run dev`. On **Vercel**, add the same three variables under **Project → Settings → Environment Variables** and redeploy.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
