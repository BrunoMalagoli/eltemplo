import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, ShoppingCart, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropagateLoader } from "react-spinners";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/NavBar";
import { useCachedFetch } from "../../hooks/useCachedFetch";
import CotizacionButton from "@/components/CotizacionButton";
import { Bounce, toast } from "react-toastify";
export default function CotizacionPage() {
    const [cotizacion, setCotizacion] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [productos, setProductos] = useState([]);
    const [filtroBodega, setFiltroBodega] = useState("todas");
    const [productosFiltrados, setProductosFiltrados] = useState(productos);
    const [mostrarAviso, setMostrarAviso] = useState(true);
    const [cotizacionString, setCotizacionString] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    // const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const bodegas = Array.from(new Set(productos.map((p) => {
        return p.bodega;
    })));
    const respuesta = useCachedFetch(`${import.meta.env.VITE_API_URL}/b/6723c54bad19ca34f8c1bf58`, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": `${import.meta.env.VITE_API_KEY}`,
            "X-Access-Key": `${import.meta.env.VITE_ACCESS_KEY}`,
        },
    });
    useEffect(() => {
        if (respuesta.data) {
            setProductos(respuesta.data); // Actualizar el estado de productos
            setLoading(false); // Detener loading
        }
        else if (respuesta.error) {
            // setError(true); // Marcar error
            setLoading(false); // Detener loading
            console.log(respuesta.error);
        }
    }, [respuesta]);
    //Logica de paginacion
    const prodsPorPagina = 30;
    const indexOfLastProducto = paginaActual * prodsPorPagina;
    const indexOfFirstProducto = indexOfLastProducto - prodsPorPagina;
    const productosAMostrar = productosFiltrados.slice(indexOfFirstProducto, indexOfLastProducto);
    const totalPaginas = Math.ceil(productosFiltrados.length / prodsPorPagina);
    useEffect(() => {
        const filtered = productos.filter((producto) => producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
            (filtroBodega === "todas" || producto.bodega === filtroBodega));
        setProductosFiltrados(filtered);
    }, [productos, filtroNombre, filtroBodega]);
    useEffect(() => {
        const cotizacionText = cotizacion
            .map((item) => `${item.nombre} x ${item.cantidad} - $${(item.precioCaja * item.cantidad).toFixed(2)}`)
            .join("\n");
        const total = cotizacion.reduce((sum, item) => sum + item.precioCaja * item.cantidad, 0);
        setCotizacionString(`Mi cotización:\n${cotizacionText}\n\nTotal: $${total.toFixed(2)}`);
    }, [cotizacion]);
    const whatsappLink = `https://wa.me/1167203131?text=${encodeURIComponent(cotizacionString)}`;
    const agregarProducto = (producto, cantidad) => {
        setCotizacion((prev) => {
            const existente = prev.find((item) => item.id === producto.id);
            if (existente) {
                return prev.map((item) => item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + cantidad }
                    : item);
            }
            else {
                return [...prev, { ...producto, cantidad }];
            }
        });
    };
    const eliminarProducto = (id) => {
        setCotizacion((prev) => prev.filter((item) => item.id !== id));
    };
    const actualizarCantidad = (id, cantidad) => {
        setCotizacion((prev) => prev
            .map((item) => item.id === id
            ? { ...item, cantidad: Math.max(0, item.cantidad + cantidad) }
            : item)
            .filter((item) => item.cantidad > 0));
    };
    const totalCotizacion = cotizacion.reduce((total, item) => total + item.precioCaja * item.cantidad, 0);
    return (_jsx(_Fragment, { children: loading ? (_jsx("div", { className: "h-screen w-full flex items-center justify-center", children: _jsx(PropagateLoader, { loading: loading, color: "#F71735" }) })) : (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: "container mx-auto p-4", children: [mostrarAviso && (_jsx(Alert, { className: "bg-alertYellow sticky top-0 z-50 mb-4", children: _jsxs(AlertDescription, { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-bold text-md text-black", children: "MINIMO CAJA CERRADA POR PRODUCTO." }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setMostrarAviso(false), children: _jsx(X, { className: "h-4 w-4" }) })] }) })), _jsx("h1", { className: "text-2xl font-bold mb-6", children: "Reserv\u00E1 tu pedido mayorista / minorista." }), _jsxs("div", { className: "mb-6 space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Search, { className: "w-5 h-5 text-gray-500" }), _jsx(Input, { type: "text", placeholder: "Buscar por nombre", value: filtroNombre, onChange: (e) => setFiltroNombre(e.target.value), className: "flex-grow" })] }), _jsx("div", { className: "flex items-center space-x-4", children: _jsxs(Select, { value: filtroBodega, onValueChange: setFiltroBodega, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Filtrar por bodega" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "todas", children: "Todas las bodegas" }), bodegas.map((bodega) => (_jsx(SelectItem, { value: bodega || "todas", children: bodega }, bodega || "todas")))] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8", children: [productosAMostrar.length > 0 ? (productosAMostrar.map((producto) => (_jsxs(Card, { className: "flex flex-col", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold", children: producto.nombre }) }), _jsx(CardContent, { className: "flex-grow", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-2xl font-semibold text-primary", children: ["$", producto.precioCaja, " ", _jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "x caja" })] }), producto.bodega ? (_jsx(Badge, { variant: "secondary", children: producto.bodega })) : (""), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Precio unitario: $", producto.precioUnitario] })] }) }), _jsxs(CardFooter, { className: "flex justify-between items-center", children: [_jsx(Input, { type: "number", placeholder: "Cantidad", className: "w-20 mr-2", onChange: (e) => {
                                                        const cantidad = parseInt(e.target.value) || 0;
                                                        agregarProducto(producto, cantidad);
                                                    } }), _jsxs(Button, { onClick: () => {
                                                        agregarProducto(producto, 1);
                                                        toast("Producto agregado!", {
                                                            theme: "light",
                                                            transition: Bounce,
                                                            position: "bottom-left",
                                                        });
                                                    }, className: "bg-red-500 hover:bg-red-600 text-white", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Agregar"] })] })] }, producto.id)))) : (_jsx(Alert, { children: "No hay productos disponibles" })), _jsxs("div", { className: "flex justify-between mt-4", children: [_jsx(Button, { disabled: paginaActual === 1, onClick: () => setPaginaActual(paginaActual - 1), children: "Anterior" }), _jsxs("span", { children: ["P\u00E1gina ", paginaActual, " de ", totalPaginas] }), _jsx(Button, { disabled: paginaActual === totalPaginas, onClick: () => setPaginaActual(paginaActual + 1), children: "Siguiente" })] })] }), _jsx(CotizacionButton, {}), _jsxs("div", { id: "cotizacionPG", className: "hidden border border-gray-300 rounded-md p-4 md:block", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Tu Cotizaci\u00F3n" }), cotizacion.map((item) => (_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("span", { children: [item.nombre, " x ", item.cantidad] }), _jsxs("span", { children: ["$", (item.precioCaja * item.cantidad).toFixed(2)] }), _jsxs("div", { children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => {
                                                        actualizarCantidad(item.id, -1);
                                                        toast("Producto agregado!", {
                                                            theme: "light",
                                                            transition: Bounce,
                                                            position: "bottom-left",
                                                        });
                                                    }, children: _jsx(Minus, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => actualizarCantidad(item.id, 1), children: _jsx(Plus, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => eliminarProducto(item.id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }, item.id))), _jsxs("div", { className: "font-bold mt-4", children: ["Total: $", totalCotizacion.toFixed(2)] }), _jsx("a", { target: "__blank", href: whatsappLink, children: _jsx(Button, { className: "mt-4 bg-green-600 w-1/4", children: "Cargar Pedido" }) })] }), _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { className: "fixed text-md p-6 bottom-4 right-4 md:hidden", children: [_jsx(ShoppingCart, { className: "mr-2 h-6 w-6" }), "Ver Cotizaci\u00F3n"] }) }), _jsxs(SheetContent, { side: "bottom", className: "h-[80vh]", children: [_jsx(SheetHeader, { children: _jsx(SheetTitle, { children: "Tu Cotizaci\u00F3n" }) }), _jsxs("div", { className: "mt-4", children: [cotizacion.map((item) => (_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("span", { children: [item.nombre, " x ", item.cantidad] }), _jsxs("span", { children: ["$", (item.precioUnitario * item.cantidad).toFixed(2)] }), _jsxs("div", { children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => actualizarCantidad(item.id, -1), children: _jsx(Minus, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => actualizarCantidad(item.id, 1), children: _jsx(Plus, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => eliminarProducto(item.id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }, item.id))), _jsxs("div", { className: "font-bold mt-4", children: ["Total: $", totalCotizacion.toFixed(2)] }), _jsx("a", { target: "__blank", href: whatsappLink, children: _jsx(Button, { className: "bg-green-600 mt-4 w-full", children: "Cargar Pedido" }) })] })] })] })] })] })) }));
}
