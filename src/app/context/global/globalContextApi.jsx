import React, {createContext, useState, useEffect} from "react"


export const GlobalApiData = createContext()

const GlobalApiDataProvider = (props) => {
const [isLoading, setIsLoading] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [isVisible, setIsVisible] = useState(true)
const [roleOption, setRoleOption] = useState(1)


return (
    <GlobalApiData.Provider
    value = {{
        isLoading, setIsLoading, 
        roleOption, setRoleOption,
        isVisible, setIsVisible,
        isSubmitting, setIsSubmitting
        }}>
        {props.children}
    </GlobalApiData.Provider>
)
}

export default GlobalApiDataProvider