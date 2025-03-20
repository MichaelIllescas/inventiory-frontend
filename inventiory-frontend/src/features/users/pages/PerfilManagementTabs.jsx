import { useState } from "react";
import UserPerfilData from "./UserPerfilData";

const ProfileManagementTabs = () => {
  const [activeTab, setActiveTab] = useState("user-profile");

  const handleTabChange = (tab) => {
    console.log(`Cambiando a tab: ${tab}`);
    setActiveTab(tab);
  };

  return (
    <div className="mt-3 pt-2">
      <div className="container mt-5 pt-3 card col-sm-12 col-md-8 col-lg-8">
        {/* Tabs de navegación */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "user-profile" ? "active" : ""}`}
              onClick={() => handleTabChange("user-profile")}
            >
              Perfil de Usuario
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "company-profile" ? "active" : ""}`}
              onClick={() => handleTabChange("company-profile")}
            >
              Perfil de Empresa
            </button>
          </li>
        </ul>

        {/* Contenido de los tabs */}
        <div className="tab-content mt-3">
          {activeTab === "user-profile" && 
            <UserPerfilData/>
          }
          {activeTab === "company-profile" && <p>Hola empresa</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagementTabs;
