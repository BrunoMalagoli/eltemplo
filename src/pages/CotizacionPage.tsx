import React from "react";

import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, ShoppingCart, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/NavBar";
import { useCachedFetch } from "../../hooks/useCachedFetch";
type Producto = {
  id: number;
  nombre: string;
  precioUnitario: number;
  precioCaja: number;
  bodega: string;
  unidades: number;
};

type ItemCotizacion = Producto & {
  cantidad: number;
};

export default function CotizacionPage() {
  const [cotizacion, setCotizacion] = useState<ItemCotizacion[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtroBodega, setFiltroBodega] = useState("todas");
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [mostrarAviso, setMostrarAviso] = useState(true);
  const [cotizacionString, setCotizacionString] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const bodegas = Array.from(
    new Set(
      productos.map((p) => {
        return p.bodega;
      })
    )
  );
  let respuesta = useCachedFetch(
    `${import.meta.env.VITE_API_URL}/b/6723c54bad19ca34f8c1bf58`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": `${import.meta.env.VITE_API_KEY}`,
        "X-Access-Key": `${import.meta.env.VITE_ACCESS_KEY}`,
      },
    }
  );
  useEffect(() => {
    if (respuesta.data) {
      setProductos(respuesta.data); // Actualizar el estado de productos
      setLoading(false); // Detener loading
    } else if (respuesta.error) {
      setError(true); // Marcar error
      setLoading(false); // Detener loading
      console.log(respuesta.error);
    }
  }, [respuesta]);
  //Logica de paginacion
  const prodsPorPagina = 30;
  const indexOfLastProducto = paginaActual * prodsPorPagina;
  const indexOfFirstProducto = indexOfLastProducto - prodsPorPagina;
  const productosAMostrar = productosFiltrados.slice(
    indexOfFirstProducto,
    indexOfLastProducto
  );
  const totalPaginas = Math.ceil(productosFiltrados.length / prodsPorPagina);
  useEffect(() => {
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
        (filtroBodega === "todas" || producto.bodega === filtroBodega)
    );
    setProductosFiltrados(filtered);
  }, [productos, filtroNombre, filtroBodega]);
  useEffect(() => {
    const cotizacionText = cotizacion
      .map(
        (item) =>
          `${item.nombre} x ${item.cantidad} - $${(
            item.precioCaja * item.cantidad
          ).toFixed(2)}`
      )
      .join("\n");
    const total = cotizacion.reduce(
      (sum, item) => sum + item.precioCaja * item.cantidad,
      0
    );
    setCotizacionString(
      `Mi cotización:\n${cotizacionText}\n\nTotal: $${total.toFixed(2)}`
    );
  }, [cotizacion]);

  const whatsappLink = `https://wa.me/1167203131?text=${encodeURIComponent(
    cotizacionString
  )}`;

  const agregarProducto = (producto: Producto, cantidad: number) => {
    setCotizacion((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  const eliminarProducto = (id: number) => {
    setCotizacion((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    setCotizacion((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(0, item.cantidad + cantidad) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const totalCotizacion = cotizacion.reduce(
    (total, item) => total + item.precioCaja * item.cantidad,
    0
  );

  return (
    <>
      {loading ? (
        <div>"CARGANDO"</div>
      ) : (
        <>
          <Navbar />
          <div className="container mx-auto p-4">
            {mostrarAviso && (
              <Alert className="bg-alertYellow sticky top-0 z-50 mb-4">
                <AlertDescription className="flex items-center justify-between">
                  <span className="font-bold text-md text-black">
                    MINIMO CAJA CERRADA POR PRODUCTO.
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMostrarAviso(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <h1 className="text-2xl font-bold mb-6">
              Reservá tu pedido mayorista / minorista.
            </h1>

            {/* Sección de filtros */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Select value={filtroBodega} onValueChange={setFiltroBodega}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por bodega" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las bodegas</SelectItem>
                    {bodegas.map((bodega) => (
                      <SelectItem
                        key={bodega || "todas"}
                        value={bodega || "todas"}
                      >
                        {bodega}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {productosAMostrar.length > 0 ? (
                productosAMostrar.map((producto) => (
                  <Card key={producto.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">
                        {producto.nombre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-2">
                        <p className="text-2xl font-semibold text-primary">
                          ${producto.precioCaja}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            x caja
                          </span>
                        </p>
                        {producto.bodega ? (
                          <Badge variant="secondary">{producto.bodega}</Badge>
                        ) : (
                          ""
                        )}
                        <p className="text-sm text-muted-foreground">
                          Precio unitario: ${producto.precioUnitario}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Input
                        type="number"
                        placeholder="Cantidad"
                        className="w-20 mr-2"
                        onChange={(e) => {
                          const cantidad = parseInt(e.target.value) || 0;
                          agregarProducto(producto, cantidad);
                        }}
                      />
                      <Button
                        onClick={() => agregarProducto(producto, 1)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Alert>No hay productos disponibles</Alert>
              )}
              {/* Controles de paginación */}
              <div className="flex justify-between mt-4">
                <Button
                  disabled={paginaActual === 1}
                  onClick={() => setPaginaActual(paginaActual - 1)}
                >
                  Anterior
                </Button>
                <span>
                  Página {paginaActual} de {totalPaginas}
                </span>
                <Button
                  disabled={paginaActual === totalPaginas}
                  onClick={() => setPaginaActual(paginaActual + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>

            {/* Cotización en pantalla grande */}
            <div className="hidden md:block">
              <h2 className="text-xl font-semibold mb-4">Tu Cotización</h2>
              {cotizacion.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {item.nombre} x {item.cantidad}
                  </span>
                  <span>${(item.precioCaja * item.cantidad).toFixed(2)}</span>
                  <div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => actualizarCantidad(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => actualizarCantidad(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="font-bold mt-4">
                Total: ${totalCotizacion.toFixed(2)}
              </div>
              <Button className="mt-4">
                <a target="__blank" href={whatsappLink}>
                  Cargar Pedido
                </a>
              </Button>
            </div>

            {/* Menú inferior desplegable para móviles */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="fixed text-md p-6 bottom-4 right-4 md:hidden">
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Ver Cotización
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Tu Cotización</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  {cotizacion.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {item.nombre} x {item.cantidad}
                      </span>
                      <span>
                        ${(item.precioUnitario * item.cantidad).toFixed(2)}
                      </span>
                      <div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => actualizarCantidad(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => actualizarCantidad(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => eliminarProducto(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="font-bold mt-4">
                    Total: ${totalCotizacion.toFixed(2)}
                  </div>
                  <Button className="bg-green-600 mt-4 w-full">
                    <a target="__blank" href={whatsappLink}>
                      Cargar Pedido
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </>
  );
}
