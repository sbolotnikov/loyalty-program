import { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
const DimensionsContext = createContext({});

export const DimensionsProvider = ({ children }) => {
    const screen = Dimensions.get('screen');
    const [dimensions, setDimensions] = useState({ screen });
  
    useEffect(() => {
      const subscription = Dimensions.addEventListener('change', ({ screen }) => {
        setDimensions({ screen });
      });
      return () => subscription?.remove();
    });
    const value = {
         dimensions
      };
    
      return (
        <DimensionsContext.Provider value={value}>
          { children}
        </DimensionsContext.Provider>
      );
    };
    
    export default function useDimensions() {
      return useContext(DimensionsContext);
    }