import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

export default function CotizacionButton() {
  const scrollToCotizacion = () => {
    const cotizacionElement = document.getElementById("cotizacionPG");
    if (cotizacionElement) {
      cotizacionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={scrollToCotizacion}
      className="fixed bottom-4 right-4 hidden md:flex p-6"
      size="icon"
      variant="destructive"
      color="#F71735"
    >
      <ShoppingBasket />
      <span className="sr-only">Ir a cotización</span>
    </Button>
  );
}
