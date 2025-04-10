import React from 'react'
import { FaStar } from 'react-icons/fa';

// Component for rating display
export const RatingStars = ({ rating }) => {
   const fullStars = Math.floor(rating);
   const emptyStars = 5 - fullStars;
   return (
      <div className="flex gap-0">
         {[...Array(fullStars)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
         ))}
         {[...Array(emptyStars)].map((_, i) => (
            <FaStar key={i + fullStars} className="text-gray-200" />
         ))}
      </div>
   );
};
