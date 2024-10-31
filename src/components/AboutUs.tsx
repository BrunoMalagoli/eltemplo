const basePath = import.meta.env.MODE === "development" ? "" : "/eltemplo/";

const AboutUs = () => (
  <section id="sobre-nosotros" className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Sobre Nosotros</h2>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            height={"400px"}
            width={"600px"}
            src={`${basePath}/about-us-img.jpg`}
            alt="Sobre nosotros"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-lg mb-4">
            Somos una empresa líder en la distribución de bebidas alcohólicas,
            con años de experiencia en el mercado mayorista y minorista.
          </p>
          <p className="text-lg mb-4">
            Nuestro compromiso es ofrecer productos de alta calidad y un
            servicio excepcional a nuestros clientes.
          </p>
          <p className="text-lg">
            Contamos con un amplio catálogo de marcas reconocidas y trabajamos
            constantemente para expandir nuestra oferta y satisfacer las
            necesidades de nuestros clientes.
          </p>
        </div>
      </div>
    </div>
  </section>
);
export default AboutUs;
