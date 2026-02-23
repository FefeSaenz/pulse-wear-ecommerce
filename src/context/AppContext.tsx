import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';

interface AppContextType {
  data: any | null;
  loading: boolean;
  error: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // axios.ts ya tiene la baseURL, así que llamamos a la raíz
        const response = await api.get('/'); 
        setData(response.data.data);
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
    <AppContext.Provider value={{ data, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
};