const TotalEarningsCard = () => {
  const totalGanancias = 12500;

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4>💰 Ganancias Totales</h4>
      <h2 className="fw-bold">${totalGanancias.toLocaleString()}</h2>
    </div>
  );
};

export default TotalEarningsCard;
