import React, { useState, useEffect } from "react";

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      console.log("setting initial state")
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      console.log(e)
      return defaultValue
    }
  })
  useEffect(() => {
    try {
      console.log("running effect")
      console.log(state)
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch(e) {
      console.error("Error setting state to localStorage:", error);
    }
  }, [key, state])

  return [state, setState];
}

export default useLocalStorageState;