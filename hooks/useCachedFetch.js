import { useState, useEffect } from "react";
const CACHE_DURATION = 5 * 60 * 1000;
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getFromLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}
export function useCachedFetch(url, options) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const cacheKey = `cache_products`;
            const cachedData = getFromLocalStorage(cacheKey);
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
                const productos = jsonData.record.productos;
                const dataArray = productos.map((producto) => {
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
                const newCacheEntry = {
                    data: dataArray, // Usar 'dataArray' directamente
                    timestamp: Date.now(),
                };
                saveToLocalStorage(cacheKey, newCacheEntry);
                setData(dataArray);
            }
            catch (err) {
                setError(err);
            }
        };
        fetchData();
    }, []);
    return { data, error };
}
