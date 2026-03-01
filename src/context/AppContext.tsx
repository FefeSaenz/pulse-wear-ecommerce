import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
//import api from '../api/axios';
import { getFrontData } from '../api/axios';
import { FrontConfig, MenuItem } from '../types/api';

interface AppContextType {
  frontConfig: FrontConfig | null;
  menuItems: MenuItem[];
  logoText: string;
  loading: boolean;
  error: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  //const [data, setData] = useState<any | null>(null);
  const [frontConfig, setFrontConfig] = useState<FrontConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Usamos la función que ya conoce el endpoint api.json
        const data = await getFrontData();
        console.log("Data real de la API:", data);
        setFrontConfig(data);
      } catch (err) {
        console.error("Error cargando API en el inicio:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  return (
    <AppContext.Provider value={{ 
      frontConfig,
      menuItems: frontConfig?.menu?.items || [], // Facilitamos el acceso directo
      logoText: frontConfig?.menu?.logo?.text.toUpperCase() || "PULSO WEAR",
      loading, 
      error 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
};