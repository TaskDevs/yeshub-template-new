import React from 'react'
import { RatingStars } from '../../../../common/RatingStars';

export const TalentCard = ({ talent }) => {
   return (
      <div className="border rounded p-4 flex flex-col justify-start w-full">
         <div className="flex justify-between mb-3 w-full">
            <div className="flex justify-start w-full">
               <img
                  src={talent?.image}
                  alt={talent?.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
               />
            </div>
            <div className="text-right">
               <p className="font-bold">${talent?.hourlyRate}/hr</p>
               <p className="text-sm text-gray-600">{talent?.location}</p>
            </div>
         </div>

         <div className="flex flex-col items-start justify-start w-full gap-1">
            <div className='flex flex-row items-center gap-2'>
               <h3 className="text-base font-bold">{talent?.name}</h3>
               |
               <h4 className="text-base text-gray-800 font-medium">{talent?.role}</h4></div>
            <p className="text-sm text-gray-600">{talent?.experience} | {talent?.badge}</p>
            <div className="flex items-center justify-start gap-2 mt-1">
               <RatingStars rating={talent?.rating} />
               <span className="ml-1 text-sm">{talent?.rating} ({talent?.reviews} reviews)</span>
            </div>
            <p className="my-1">{talent?.description}</p>
         </div>


         <div className="flex justify-start flex-wrap gap-2 w-full">
            {talent?.skills.map((skill, index) => (
               <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
                  {skill}
               </span>
            ))}
         </div>
      </div>
   )
}
