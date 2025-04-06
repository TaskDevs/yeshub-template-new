import React from 'react'

export default function SubProfileDetails({title, children}) {
  return (
    <div className=" flex flex-col items-start w-full">
            <p className='capitalize font-medium'>{title}</p>
            <div className="flex w-full ">
              { children }
            </div>
          </div>
  )
}
