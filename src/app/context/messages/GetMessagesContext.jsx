

import React, { createContext } from 'react'

export const GetMessagesContext = createContext(null);

export function GetMessagesProvider ({ children }) {
  return (
    <GetMessagesContext.Provider>
        { children }
    </GetMessagesContext.Provider>
  )
}

