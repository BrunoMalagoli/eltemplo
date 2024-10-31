import { useState, useEffect } from "react";

type CacheEntry<T> = {
  data: T; // Tipo genérico para el cache
  timestamp: number;
};

const CACHE_DURATION = 5 * 60 * 1000;

function saveToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage<T>(key: string): T | null {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

interface UseCachedFetchOptions {
  headers?: Record<string, string>;
}

type Producto = {
  Código: number;
  Descripcion: string;
  Rubro: string;
  "Precio Unitario": number;
  "Precio Caja": number;
  Unidades: number;
};

type FormatProduct = {
  id: number;
  nombre: string;
  precioUnitario: number;
  precioCaja: number;
  bodega: string;
  unidades: number;
};

export function useCachedFetch(
  url: string,
  options?: UseCachedFetchOptions
): {
  data: FormatProduct[] | null; // Devuelve un array de FormatProduct
  error: Error | null;
} {
  const [data, setData] = useState<FormatProduct[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `cache_products`;
      const cachedData: CacheEntry<FormatProduct[]> | null =
        getFromLocalStorage(cacheKey);

      // Verificar si hay datos cacheados y si no ha expirado
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        setData(cachedData.data); // Acceder al data del cache
        return;
      }

      // Si no hay datos cacheados o han expirado, hacer la petición
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: options?.headers,
        });

        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }

        const jsonData = await response.json();
        const productos: Producto[] = jsonData.record.productos;

        const dataArray: FormatProduct[] = productos.map((producto) => {
          return {
            id: producto.Código,
            nombre: producto.Descripcion,
            bodega: producto.Rubro,
            precioUnitario: producto["Precio Unitario"],
            precioCaja: producto["Precio Caja"],
            unidades: producto.Unidades,
          };
        });

        // Almacenar en cache con `timestamp` actualizado
        const newCacheEntry: CacheEntry<FormatProduct[]> = {
          data: dataArray, // Usar 'dataArray' directamente
          timestamp: Date.now(),
        };

        saveToLocalStorage(cacheKey, newCacheEntry);
        setData(dataArray);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
}
