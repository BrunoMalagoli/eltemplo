import React from "react";

import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, ShoppingCart, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/NavBar";

type Producto = {
  id: number;
  nombre: string;
  precioUnitario: number;
  precioCaja: number;
  bodega: string;
  enStock: boolean;
};

type ItemCotizacion = Producto & {
  cantidad: number;
};

// Lista de productos (esto podría venir de una API en una aplicación real)
const productos: Producto[] = [
  {
    id: 1,
    nombre: "Cerveza Lager",
    precioUnitario: 2.5,
    precioCaja: 55,
    bodega: "Cervecería Nacional",
    enStock: true,
  },
  {
    id: 2,
    nombre: "Vino Tinto",
    precioUnitario: 15,
    precioCaja: 160,
    bodega: "Viña del Valle",
    enStock: true,
  },
  {
    id: 3,
    nombre: "Whisky",
    precioUnitario: 40,
    precioCaja: 430,
    bodega: "Destilería Escocesa",
    enStock: false,
  },
  {
    id: 4,
    nombre: "Vodka",
    precioUnitario: 20,
    precioCaja: 220,
    bodega: "Destilería Rusa",
    enStock: true,
  },
  {
    id: 5,
    nombre: "Gin",
    precioUnitario: 30,
    precioCaja: 320,
    bodega: "Destilería Inglesa",
    enStock: false,
  },
];

export default function CotizacionPage() {
  const [cotizacion, setCotizacion] = useState<ItemCotizacion[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroBodega, setFiltroBodega] = useState("todas");
  const [filtroStock, setFiltroStock] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [mostrarAviso, setMostrarAviso] = useState(true);
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  const bodegas = Array.from(new Set(productos.map((p) => p.bodega)));

  useEffect(() => {
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
        (filtroBodega === "todas" || producto.bodega === filtroBodega) &&
        (!filtroStock || producto.enStock)
    );
    setProductosFiltrados(filtered);
  }, [filtroNombre, filtroBodega, filtroStock]);

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
      <Navbar />
      <div className="container mx-auto p-4">
        {mostrarAlerta && (
          <Alert className="bg-softRed sticky top-0 z-50 mb-4">
            <AlertDescription className="flex items-center justify-between">
              <span className="font-bold text-lg text-white">
                ¡Atención! El pedido mínimo es de 5 cajas.
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMostrarAlerta(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {mostrarAviso && (
          <Alert className="bg-alertYellow sticky top-0 z-50 mb-4">
            <AlertDescription className="flex items-center justify-between">
              <span className="font-bold text-md text-black">
                Si su pedido supera las 20 cajas y la dirección de envio está en
                CABA o alrededores, su pedido puede ser enviado sin cargo. Una
                vez realizado el pedido, se le otorgará un número de pedido y se
                deberá coordinar los detalles del envio vía WhatsApp con uno de
                nuestros vendedores.
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
                  <SelectItem key={bodega} value={bodega}>
                    {bodega}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stock"
                checked={filtroStock}
                onCheckedChange={(checked) =>
                  setFiltroStock(checked as boolean)
                }
              />
              <Label htmlFor="stock">Solo en stock</Label>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {productosFiltrados.map((producto) => (
            <Card key={producto.id}>
              <CardHeader>
                <CardTitle>{producto.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Precio unitario: ${producto.precioUnitario}</p>
                <p>Precio por caja: ${producto.precioCaja}</p>
                <p>Bodega: {producto.bodega}</p>
                <p>{producto.enStock ? "En stock" : "Sin stock"}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
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
                  disabled={!producto.enStock}
                  className="bg-softRed"
                >
                  <Plus className="mr-2 h-4 w-4" /> Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
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
          <Button className="mt-4">Cargar Pedido</Button>
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
              <Button className="bg-softRed mt-4 w-full">Cargar Pedido</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
