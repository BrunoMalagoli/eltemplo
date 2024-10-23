import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  Sheet,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => (
  <nav className="bg-white shadow-md">
    <div className="container h-20 mx-auto px-6 py-3 flex justify-between items-center">
      <a href="/" className="font-bold text-xl">
        Logo
      </a>
      <div className="hidden md:flex space-x-8">
        <a href="#marcas" className=" p-4 hover:text-primaryRed">
          Servicios
        </a>
        <a href="#sobre-nosotros" className="p-4 hover:text-primaryRed">
          Sobre Nosotros
        </a>
        <a
          href="/cotizar"
          className="bg-softRed border-2 rounded-full p-4 text-white hover:text-black "
        >
          Reserva tu pedido
        </a>
      </div>
      <Sheet>
        <SheetTrigger className="md:hidden bg-softRed text-white rounded-full hover:bg-primaryRed p-4 px-8">
          Menú
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription>
              <div className="container h-auto p-6 flex flex-wrap gap-5">
                <a
                  href="#marcas"
                  className=" text-black p-4 w-full hover:text-primaryRed"
                >
                  Servicios
                </a>
                <a
                  href="#sobre-nosotros"
                  className=" text-blackp-4  w-full hover:text-primaryRed"
                >
                  Sobre Nosotros
                </a>
                <a
                  href="/cotizar"
                  className="bg-softRed  w-full border-2 rounded-full p-4 text-white hover:text-black "
                >
                  Reserva tu pedido
                </a>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </nav>
);

export default Navbar;
