import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

export default function LeafletMap({ className = 'h-[360px] md:h-[420px]' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const { lat, lng, full, googleMapsSearchUrl } = companyInfo.principalAddress;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Custom Gold Luxury Pin Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="width: 36px; height: 36px; background-color: #1F1E1D; border: 2px solid #C5A880; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.35);">
            <span style="color: #DFC8A8; font-family: 'Playfair Display', serif; font-size: 13px; font-weight: bold;">SF</span>
          </div>
          <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #C5A880;"></div>
        </div>
      `,
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -42]
    });

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    // Clean OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add Marker & Popup
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    const popupHtml = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
        <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14px; font-weight: 600; color: #1F1E1D; margin: 0 0 4px 0;">SHUBHAM FABRICS</h4>
        <p style="font-size: 11px; color: #555; line-height: 1.4; margin: 0 0 8px 0;">${full}</p>
        <a href="${googleMapsSearchUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #9A7D56; text-decoration: none;">
          Get Directions &rarr;
        </a>
      </div>
    `;

    marker.bindPopup(popupHtml).openPopup();
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, full, googleMapsSearchUrl]);

  return (
    <div className="relative w-full rounded-sm overflow-hidden border border-brand-sand shadow-lg bg-brand-sand/30">
      {/* Map Element */}
      <div ref={mapContainerRef} className={`w-full ${className} z-0`} />

      {/* Floating Directions Action Bar */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-10 bg-brand-ivory/95 backdrop-blur-md p-3.5 rounded-sm border border-brand-sand shadow-lg flex items-center justify-between sm:gap-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-charcoal text-brand-gold-light rounded-sm">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-serif font-medium text-brand-charcoal">
              Sector-57, Noida Showroom
            </p>
            <p className="text-[10px] text-brand-muted">
              Uttar Pradesh - 201301
            </p>
          </div>
        </div>

        <a
          href={googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-charcoal hover:bg-brand-gold-dark text-brand-ivory text-[10px] uppercase tracking-[0.18em] font-semibold rounded-sm transition-colors shrink-0 shadow-sm"
        >
          <Navigation className="w-3.5 h-3.5 text-brand-gold-light" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
}
