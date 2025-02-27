import AppRouter from "./router/AppRouter";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App;
