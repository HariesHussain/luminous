import React from "react";
import { siteConfig } from "@/config/siteConfig";

export const JsonLd: React.FC = () => {
  const websiteUrl = siteConfig.websiteUrl;
  const name = siteConfig.name;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${websiteUrl}/#organization`,
        "name": name,
        "url": websiteUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${websiteUrl}/#logo`,
          "url": siteConfig.logoUrl,
          "caption": name
        },
        "image": {
          "@id": `${websiteUrl}/#logo`
        },
        "sameAs": siteConfig.socials.map((social) => social.url)
      },
      {
        "@type": "WebSite",
        "@id": `${websiteUrl}/#website`,
        "url": websiteUrl,
        "name": name,
        "publisher": {
          "@id": `${websiteUrl}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${websiteUrl}/#webpage`,
        "url": websiteUrl,
        "name": `${name} | Luxury Hair Salon in ${siteConfig.city}`,
        "isPartOf": {
          "@id": `${websiteUrl}/#website`
        },
        "about": {
          "@id": `${websiteUrl}/#organization`
        },
        "description": siteConfig.metaDescription,
        "breadcrumb": {
          "@id": `${websiteUrl}/#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${websiteUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": websiteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "The Maison",
            "item": `${websiteUrl}/#about`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Services",
            "item": `${websiteUrl}/#services`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Gallery",
            "item": `${websiteUrl}/#gallery`
          }
        ]
      },
      {
        "@type": "BeautySalon",
        "@id": `${websiteUrl}/#salon`,
        "name": name,
        "image": siteConfig.logoUrl,
        "url": websiteUrl,
        "telephone": siteConfig.phone,
        "email": siteConfig.email,
        "priceRange": siteConfig.priceRange,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteConfig.address,
          "addressLocality": siteConfig.city,
          "addressCountry": siteConfig.countryCode
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.geo.latitude,
          "longitude": siteConfig.geo.longitude
        },
        "openingHoursSpecification": siteConfig.schemaHours.map((hour) => ({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": hour.dayOfWeek,
          "opens": hour.opens,
          "closes": hour.closes
        })),
        "sameAs": siteConfig.socials.map((social) => social.url),
        "memberOf": {
          "@id": `${websiteUrl}/#organization`
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${websiteUrl}/#faq`,
        "mainEntity": siteConfig.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
};

export default JsonLd;
