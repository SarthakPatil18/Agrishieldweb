# AGRISHIELD INDUSTRIES – WEBSITE SETUP GUIDE

## FOLDER STRUCTURE
```
agrishield/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All animations & form logic
├── images/                 ← DROP ALL YOUR IMAGES HERE
│   ├── logo1.jpeg
│   ├── Banner-1.jpg
│   ├── banner-2.webp
│   ├── Banner-3.webp
│   ├── WhatsApp-Image-2024-09-01-at-1.22.45-PM.webp
│   ├── ... (all product images)
│   └── gallery/            ← Gallery images go here
└── pages/
    ├── about.html
    ├── contact.html        ← Has map + EmailJS form
    ├── organic-biostimulants.html
    ├── micronutrients.html
    ├── water-soluble-fertilizers.html
    ├── insecticides.html
    ├── adjuvants.html
    ├── organic-bio-fertilizers.html
    └── gallery.html
```

---

## STEP 1 – Add Your Images
Put ALL images inside the `images/` folder with the EXACT filenames from the original site.
For gallery: create `images/gallery/` subfolder and put gallery photos there.

---

## STEP 2 – Set Up EmailJS (FREE – no backend needed)
This makes the contact form send emails directly to info.agrishield@gmail.com

### A) Create account
1. Go to https://www.emailjs.com
2. Sign up FREE (200 emails/month free)
3. Click "Add New Service" → choose Gmail → connect info.agrishield@gmail.com

### B) Get your Service ID
- After connecting Gmail, copy the **Service ID** (looks like: service_xxxxxxx)

### C) Create Email Template
1. Go to "Email Templates" → "Create New Template"
2. Paste this template:

**Subject:** New Enquiry from {{from_name}} – Agrishield Website

**Body:**
```
New website enquiry received:

Name: {{from_name}}
Phone: {{from_phone}}
Email: {{from_email}}
Product Interest: {{product}}

Message:
{{message}}
```
3. Set "To Email" = info.agrishield@gmail.com
4. Save → copy the **Template ID** (looks like: template_xxxxxxx)

### D) Get Public Key
- Go to Account → General → copy **Public Key**

### E) Update the website files
In BOTH `index.html` and `pages/contact.html`, find these 2 lines and replace:

```html
<script>emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');</script>
```
→ Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual Public Key

In `js/main.js`, find this line:
```js
emailjs.send('service_agrishield', 'template_agrishield', params)
```
→ Replace `service_agrishield` with your Service ID
→ Replace `template_agrishield` with your Template ID

---

## STEP 3 – Google Map (Contact Page)
The map is already embedded showing Kuruli, Khed, Pune area.
To get a more precise pin:
1. Go to Google Maps → search your exact address
2. Click Share → Embed a map → Copy the iframe src URL
3. In `pages/contact.html`, replace the iframe `src="..."` with your copied URL

---

## STEP 4 – Gallery
When you have gallery images ready:
1. Put them in `images/gallery/` folder
2. Open `pages/gallery.html`
3. Replace the placeholder divs with:
```html
<div class="gallery-item" onclick="openLightbox(0)">
  <img src="../images/gallery/your-image.jpg" alt="Gallery">
  <div class="overlay"></div>
</div>
```
(increase the number in openLightbox for each new image: 0, 1, 2, 3...)

---

## STEP 5 – Upload to Web Hosting
Upload the ENTIRE `agrishield/` folder to your web hosting (Hostinger, GoDaddy, etc.)
Make sure `index.html` is in the root of your domain folder.

---
Need help? All pages are fully linked and working. Just add images + EmailJS keys!
