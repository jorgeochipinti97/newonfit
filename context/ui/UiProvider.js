import { FC, useReducer } from "react";
import { uiReducer } from "./uiReducer";
import { UiContext } from "./UiContext";



const UI_INITIAL_STATE = {
  isMenuOpen: false,
};



export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
