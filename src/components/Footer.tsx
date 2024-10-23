const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <p>Email: info@ejemplo.com</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Enlaces rápidos</h3>
          <ul>
            <li>
              <a href="#sobre-nosotros" className="hover:text-gray-300">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-gray-300">
                Servicios
              </a>
            </li>
            <li>
              <a href="/cotizar" className="hover:text-gray-300">
                Arma tu pedido
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-300">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 El Templo Bebidas. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
