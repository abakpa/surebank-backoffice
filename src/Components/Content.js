import React from 'react';
import homeImage from '../images/surebankimage1.jpg';

const Content = () => {
  return (
    <div className="flex items-center h-screen justify-center bg-gray-100">
      {/* The image container */}
      <div className="w-full h-full">
        <img 
          src={homeImage} 
          alt="dispatch rider" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Content;
