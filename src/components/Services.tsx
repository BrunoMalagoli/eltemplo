import { Truck, MapPin, MessageCircle, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ventajas = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Envíos a todo el país",
    description:
      "Llegamos a cada rincón de Argentina con nuestros productos de calidad.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Envío gratuito en CABA y alrededores",
    description:
      "En pedidos a partir de 20 cajas, el envío es totalmente gratis.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: "Atención personalizada por WhatsApp",
    description:
      "Estamos a tu disposición para resolver dudas y tomar pedidos de forma rápida y eficiente.",
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: "Pedidos mayoristas y minoristas",
    description:
      "Adaptamos nuestros servicios a tus necesidades, ya sea para grandes volúmenes o compras individuales.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ventajas de trabajar con nosotros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventajas.map((ventaja, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-col items-center">
                {ventaja.icon}
                <CardTitle className="mt-4 text-xl font-semibold text-center">
                  {ventaja.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {ventaja.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
