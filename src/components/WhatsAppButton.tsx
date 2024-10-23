import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hola, me gustaría hacer una consulta",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-500 hover:bg-green-600"
      size="icon"
    >
      <MessageCircle className="h-8 w-8 text-white" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </Button>
  );
}
