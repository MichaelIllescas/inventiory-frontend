import React from "react";

const MonthlyEarningsCard = () => {
  const gananciasMes = 85000;

  return (
    <div className="card bg-primary text-white p-3 text-center">
      <h4>📆 Ganancias del Mes</h4>
      <h2 className="fw-bold">${gananciasMes.toLocaleString()}</h2>
    </div>
  );
};

export default MonthlyEarningsCard;
