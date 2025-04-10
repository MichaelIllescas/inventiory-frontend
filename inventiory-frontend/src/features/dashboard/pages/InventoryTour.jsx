import Joyride from "react-joyride";
import { useEffect, useState } from "react";
import WelcomeStep from "../components/WelcomeStep";
import StepProveedor from "../components/StepProveedor.jsx";
import StepProducto from "../components/StepProducto.jsx";
import StepCompra from "../components/StepCompra.jsx";
import StepVenta from "../components/StepVenta.jsx";
import CustomTooltip from "../components/CustomTooltip.jsx";

const InventoryTour = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      target: "body",
      placement: "center",
      content:
      <WelcomeStep />,
    },
    {
      target: "#tour-proveedor",
      placement: "bottom",
      content: <StepProveedor/>,
    },
    {
      target: "#tour-producto",
      placement: "bottom",
      content: <StepProducto/>
    },
    {
      target: "#tour-compra",
      placement: "bottom",
      content: <StepCompra/>
    },
    {
      target: "#tour-venta",
      placement: "bottom",
      content: <StepVenta/>,
    },
  ];

  useEffect(() => {
    setRun(true);
  }, []);

  const dropdownMap = {
    1: "#proveedores-dropdown",
    2: "#dropdown-producto",
    3: "#dropdown-compra",
    4: "#dropdown-venta",
  };

  const closeAllDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
      const menu = dropdown.querySelector(".dropdown-menu");
      const toggle = dropdown.querySelector(".dropdown-toggle");
      if (menu) menu.classList.remove("show");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  };

  const openDropdown = (stepIdx) => {
    const id = dropdownMap[stepIdx];
    if (!id) return;
  
    closeAllDropdowns(); // cerramos todo primero
  
    // 👉 Abrir el menú colapsado si es necesario (modo móvil)
    const navbarCollapse = document.querySelector("#navbarNav");
    const isCollapsed = navbarCollapse?.classList?.contains("collapse") &&
                        !navbarCollapse?.classList?.contains("show");
  
    if (isCollapsed) {
      const toggleButton = document.querySelector(".navbar-toggler");
      if (toggleButton) toggleButton.click();
    }
  
    // Esperar un poco antes de abrir el dropdown (para que el navbar esté desplegado)
    setTimeout(() => {
      const dropdown = document.querySelector(id);
      const menu = dropdown?.querySelector(".dropdown-menu");
      const toggle = dropdown?.querySelector(".dropdown-toggle");
  
      if (dropdown && menu && toggle) {
        dropdown.classList.add("show");
        menu.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
      }
    }, 300); // esperá unos ms por si el colapso necesita animarse
  };
  const closeNavbarMobile = () => {
    const navbarCollapse = document.querySelector("#navbarNav");
    const isMobileOpen = navbarCollapse?.classList?.contains("show");
  
    if (isMobileOpen) {
      const toggleButton = document.querySelector(".navbar-toggler");
      if (toggleButton) toggleButton.click();
    }
  };
  
  

  const waitForVisible = (selector, callback, tries = 0) => {
    const el = document.querySelector(selector);
    if (el && el.offsetParent !== null) {
      callback();
    } else if (tries < 20) {
      setTimeout(() => waitForVisible(selector, callback, tries + 1), 150);
    } else {
      console.warn(`⛔ No se pudo mostrar el elemento ${selector}`);
      callback();
    }
  };

  const handleCallback = ({ type, index, lifecycle, action, status }) => {
    let nextIndex = index;
  
    if (type === "step:after" && lifecycle === "complete") {
      if (action === "prev") {
        nextIndex = index - 1;
      } else if (action === "next") {
        nextIndex = index + 1;
      }
  
      if (dropdownMap[nextIndex]) {
        openDropdown(nextIndex);
        const nextTarget = steps[nextIndex]?.target;
        waitForVisible(nextTarget, () => {
          setStepIndex(nextIndex);
        });
      } else {
        closeAllDropdowns();
        closeNavbarMobile();
        setStepIndex(nextIndex);
      }
    }
  
    // 👇 Manejo cuando el usuario presiona "Saltar" o termina
    if (
      (type === "step:after" && action === "skip") ||
      type === "tour:end" ||
      status === "skipped"
    ) {
      closeAllDropdowns();
      closeNavbarMobile();
    }
  };
  

  return (
   
<Joyride
  steps={steps}
  run={run}
  stepIndex={stepIndex}
  continuous
  callback={handleCallback}
  showSkipButton
  showProgress
  tooltipComponent={CustomTooltip} // 👈 aquí lo usás
  styles={{
    options: {
      zIndex: 9999,
    },
  }}
/>
  );
};

export default InventoryTour;
