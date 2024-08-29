import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Cinematic Universe. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          <a href="#privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="#terms-of-service" className="hover:underline ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
