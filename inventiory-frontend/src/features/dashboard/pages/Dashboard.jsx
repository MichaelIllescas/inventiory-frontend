import BestSellingProductsTable from "./BestSellingProductsTable";
import LowStockProductsTable from "./LowStockProductsTable";
import DailyEarningsChart from "./DailyEarningsChart";
import QuarterlyEarningsChart from "./QuarterlyEarningsChart";
import MonthlyEarningsCard from "./MonthlyEarningsCard";
import TotalEarningsCard from "./TotalEarningsCard";
import ProfitabilityCard from "./ProfitabilityCard";
import TopCustomersTable from "./TopCustomersTable";
import TotalCustomersCard from "./TotalCustomersCard"; // Nuevo
import TotalProductsCard from "./TotalProductsCard"; // Nuevo
import TotalInvestmentCard from "./TotalInvestmentCard"; // Nuevo

const Dashboard = () => {
  return (
    <div className="container mt-5 pt-4" data-aos="fade-in">
      <h1 className="mb-4 text-center" data-aos="fade-down">
        📊 Dashboard de Inventiory
      </h1>

      {/* Contenedor de métricas */}
      <div className="row text-center">
        <div className="col-md-4 col-12 mb-3" data-aos="flip-left">
          <TotalEarningsCard />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="flip-left" data-aos-delay="200">
          <MonthlyEarningsCard />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="flip-left" data-aos-delay="400">
          <ProfitabilityCard />
        </div>
      </div>

      {/* Sección de tablas */}
      <div className="row">
        <div className="col-lg-6 col-12 mb-3" data-aos="fade-right">
          <BestSellingProductsTable />
        </div>
        <div className="col-lg-6 col-12 mb-3" data-aos="fade-left">
          <LowStockProductsTable />
        </div>
      </div>

      {/* Sección de gráficos */}
      <div className="row">
        <div className="col-lg-6 col-12 mb-3" data-aos="zoom-in">
          <DailyEarningsChart />
        </div>
        <div className="col-lg-6 col-12 mb-3" data-aos="zoom-in" data-aos-delay="300">
          <QuarterlyEarningsChart />
        </div>
      </div>

      {/* Sección de ranking de clientes */}
      <div className="row">
        <div className="col-12" data-aos="fade-up">
          <TopCustomersTable />
        </div>
      </div>

      {/* 🚀 Nueva Sección de Métricas */}
      <div className="row text-center mt-4">
        <div className="col-md-4 col-12 mb-3" data-aos="fade-up">
          <TotalCustomersCard />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="fade-up" data-aos-delay="200">
          <TotalProductsCard />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="fade-up" data-aos-delay="400">
          <TotalInvestmentCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
