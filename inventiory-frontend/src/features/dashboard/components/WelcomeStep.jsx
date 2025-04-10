import logo from "../../../assets/img/logo.png"; // ajustá el path si es necesario

const WelcomeStep = () => {
  return (
    <div style={{ textAlign: "center", minWidth:"300px" }}>
      <img src={logo} alt="Logo Inventiory" width="70" style={{ marginBottom: "1rem" }} />
      <h4>¡Bienvenido a Inventiory!</h4>
      <p>
        Te mostraremos los pasos básicos para comenzar con la gestión de tu negocio. 🚀
      </p>
    </div>
  );
};

export default WelcomeStep;
