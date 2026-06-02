# LUMINOUS Rebranding & Template Guide

This guide details how to rebrand, customize, recolor, and deploy this premium luxury template for a new client in under 10 minutes.

---

## 1. How to Rebrand (10-Minute Client Swap)

### Step 1: Edit the Configuration System
All client-specific texts, numbers, contact data, service menus, and reviews are stored in [src/config/siteConfig.ts](file:///c:/Users/Admin/Desktop/salon/src/config/siteConfig.ts). Open this file and replace the values with your new client's details.

### Step 2: Update the Color System
Open [src/app/globals.css](file:///c:/Users/Admin/Desktop/salon/src/app/globals.css) and customize the CSS custom properties inside the `:root` block to update the site-wide color palette:
- `--color-bg`: Base backdrop color
- `--color-gold` / `--color-gold-light`: Color branding accents
- `--color-burgundy`: Secondary accents / footer background

### Step 3: Replace Brand Images
Next.js images are optimized on build. Replace default background and gallery photos:
1. Save brand assets in `/public/images/` or supply high-resolution CDN links (e.g. Unsplash, Cloudinary).
2. Update image properties (`imageUrl`) inside `siteConfig.gallery` and the Hero section.
3. If using custom domains (e.g., Cloudinary, S3), declare their hostnames inside `remotePatterns` in [next.config.ts](file:///c:/Users/Admin/Desktop/salon/next.config.ts).

### Step 4: Validate SEO Properties
Check [src/app/layout.tsx](file:///c:/Users/Admin/Desktop/salon/src/app/layout.tsx). The Next.js Metadata API dynamically builds search indices. Ensure keywords reflect your client's city and services.

---

## 2. Color Palette Swap Guide

To instantly re-theme the website, replace the color tokens inside `:root` in `src/app/globals.css` with one of these pre-built luxury schemas:

### Option A: Midnight Black + Gold (Current — LUMINOUS)
*Editorial, avant-garde, high-end styling.*
```css
:root {
  --color-bg: #0A0A0A;
  --color-cream: #F5F0E8;
  --color-gold: #C9A84C;
  --color-gold-light: #E8C97A;
  --color-burgundy: #2D0A14;
  --color-charcoal: #1A1A1A;
}
```

### Option B: Ivory + Rose Gold
*Romantic, feminine, premium bridal salon/aesthetic.*
```css
:root {
  --color-bg: #FAFAFA;
  --color-cream: #1A1A1A;     /* Inverse contrast text */
  --color-gold: #E5A99E;      /* Rose gold base */
  --color-gold-light: #F2CFC9;/* Soft pink blush */
  --color-burgundy: #FDFBF7;  /* Off-white footer background */
  --color-charcoal: #FFFFFF;  /* Card base */
}
```

### Option C: Deep Forest + Champagne
*Organic wellness, upscale spa, clean botanical.*
```css
:root {
  --color-bg: #0C1612;      /* Deep forest green */
  --color-cream: #F4F1EA;
  --color-gold: #D2C4A2;      /* Warm champagne */
  --color-gold-light: #E8DFCD;/* Sparkling cream */
  --color-burgundy: #13241D;  /* Rich green accent */
  --color-charcoal: #14211B;  /* Card base */
}
```

---

## 3. Configuration Key Index

The following table lists every property declared in `siteConfig.ts` and the visual element it controls:

| Key | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Brand name. Controls header wordmarks, SEO indexes, and copyright blocks. |
| `tagline` | `string` | Core brand tagline (e.g. "Maison de L'Atelier"). |
| `taglineSub` | `string` | Secondary brand descriptor. |
| `city` | `string` | Local Business City. Configures metadata titles and JSON-LD local SEO schemas. |
| `metaDescription` | `string` | Primary site SEO description (OpenGraph / Twitter). |
| `heroHeadline` | `string[]` | Splitted text lines for the primary Hero headline. |
| `heroSubtitle` | `string` | Subline displayed on the hero section. |
| `phone` | `string` | Business telephone number. Mapped to headers, CTAs, and JSON-LD. |
| `email` | `string` | Concierge address. |
| `address` | `string` | Street address. |
| `bookingUrl` | `string` | Hyperlink targeting the booking application (e.g., Fresha). |
| `bookingCTA` | `string` | Call-to-action button text in the Booking section. |
| `hours` | `HoursItem[]` | Array of opening hours. Controls the footer schedule grid and JSON-LD specifications. |
| `socials` | `SocialItem[]` | Array of social profile links mapping to footer SVG icons. |
| `aboutPullQuote` | `string` | Large editorial quote highlighted on the left side of the About block. |
| `aboutBody` | `string[]` | Three paragraphs mapping to the brand story on the right side of the About block. |
| `aboutStats` | `Object` | Credential counts (`years` and `clients`) triggering scroll count-up numbers. |
| `services` | `Service[]` | Flat list of service catalog cards containing Roman numerals, names, descriptions, pricing, and durations. |
| `gallery` | `GalleryItem[]` | Array of 6 visual portfolio items mapping to the asymmetric magazine grid. |
| `testimonials` | `TestimonialItem[]` | Review cards showing quotation statements, reviewer names, and publishing titles. |

---

## 4. Deployment Checklist

### One-Click Vercel Deploy
This repository is pre-configured for Vercel deployment:
1. Push your rebranded codebase to GitHub/GitLab/Bitbucket.
2. Import the project on the Vercel Dashboard.
3. Vercel will automatically autodetect Next.js configurations and execute standard builds.

### Environment Variables
For bundle sizes analysis on custom build pipelines:
- `ANALYZE` (optional): Set to `true` on build commands to trigger `@next/bundle-analyzer` and inspect outputs.

### Domain Setup
1. In the Vercel project dashboard, navigate to **Settings > Domains**.
2. Add your custom client domain (e.g., `maisonluminous.com`).
3. Update DNS properties (CNAME / A Records) at your registrar based on the directions provided by Vercel.
