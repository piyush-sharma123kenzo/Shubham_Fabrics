import React, { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | SHUBHAM FABRICS INDIA PRIVATE LIMITED`
      : 'SHUBHAM FABRICS INDIA PRIVATE LIMITED | Premium Textiles & Traditional Women’s Fashion';

    document.title = fullTitle;

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    window.scrollTo(0, 0);
  }, [title, description]);

  return null;
}
