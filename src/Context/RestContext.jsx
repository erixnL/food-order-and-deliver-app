import { createContext } from "react"
import { Restaurant_list } from "../Assets/assets"

export const RestContext = createContext(null)

const RestContextProvider = (props) => {

  const contextValue = {
      Restaurant_list
  }

  return (
    <RestContext.Provider value = {contextValue}>
      {props.children}
    </RestContext.Provider>
  )

}

export default RestContextProvider;