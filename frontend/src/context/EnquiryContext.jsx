import React, { createContext, useContext, useState } from 'react';

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryContext, setEnquiryContext] = useState({
    item: '',
    type: '',
    initialMessage: ''
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openEnquiry = (options = {}) => {
    setEnquiryContext({
      item: options.item || '',
      type: options.type || 'Product',
      initialMessage: options.initialMessage || (options.item ? `Hello, I would like to enquire about "${options.item}". Could you please provide further details regarding fabric swatch, custom tailoring, or showroom viewing?` : '')
    });
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <EnquiryContext.Provider value={{
      isEnquiryOpen,
      openEnquiry,
      closeEnquiry,
      enquiryContext,
      isSearchOpen,
      openSearch,
      closeSearch
    }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
