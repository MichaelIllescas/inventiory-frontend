import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProfitabilityPage = () => {
  const [profitData, setProfitData] = useState({
    quarterlyProfit: [12000, 15000, 17000, 6000], // Rentabilidad trimestral
    annualProfit: 65000, // Rentabilidad anual
  });

  // Calcular la rentabilidad trimestral en porcentaje respecto al total anual
  const calculateQuarterlyProfitPercentage = (quarterlyProfit, annualProfit) => {
    return quarterlyProfit.map((profit) => ((profit / annualProfit) * 100).toFixed(2));
  };

  const quarterlyProfitPercentage = calculateQuarterlyProfitPercentage(
    profitData.quarterlyProfit,
    profitData.annualProfit
  );

  // Datos para el gráfico de rentabilidad trimestral en porcentaje
  const quarterlyChartData = quarterlyProfitPercentage.map((percentage, index) => ({
    quarter: `Trimestre ${index + 1}`,
    percentage: parseFloat(percentage),
    profit: profitData.quarterlyProfit[index], // Rentabilidad en valor absoluto
  }));

  // Datos para el gráfico de rentabilidad anual en porcentaje (100%)
  const annualChartData = [
    {
      year: "Rentabilidad Anual",
      percentage: 100, // La rentabilidad anual siempre será 100%
      profit: profitData.annualProfit, // Rentabilidad en valor absoluto
    },
  ];

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Rentabilidad del Negocio</h5>
        </div>
        <div className="card-body">
          {/* Gráfico de Rentabilidad Trimestral (gráfico de líneas) */}
          <div className="chart-container mb-4" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyChartData}>
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#28a745" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Información debajo de cada trimestre */}
          <div className="row text-center">
            {quarterlyChartData.map((data, index) => (
              <div className="col-3" key={index}>
                <p><strong>{data.quarter}</strong></p>
                <p>Rentabilidad: ${data.profit.toLocaleString()}</p>
                <p>Rentabilidad %: {data.percentage}%</p>
              </div>
            ))}
          </div>

          {/* Gráfico de Rentabilidad Anual (gráfico de líneas) */}
          <div className="chart-container mb-4" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={annualChartData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#15317E" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Información de Rentabilidad Anual */}
          <div className="text-center">
            <p><strong>Rentabilidad Anual</strong></p>
            <p>Rentabilidad: ${profitData.annualProfit.toLocaleString()}</p>
            <p>Rentabilidad %: 100%</p>
          </div>

          {/* Resumen de Rentabilidad */}
          <div>
            <h3>Resumen de Rentabilidad</h3>
            <p>
              <strong>Ingresos por Ventas:</strong> ${profitData.annualProfit.toLocaleString()}
            </p>
            <p>
              <strong>Rentabilidad Trimestral:</strong>{" "}
              {profitData.quarterlyProfit.reduce((a, b) => a + b, 0).toLocaleString()}
            </p>
            <p>
              <strong>Rentabilidad Anual:</strong> ${profitData.annualProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityPage;
