import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import CarsList from "../components/Cars";

function Home() {
  const { state } = useCarsContext();
  const { cars, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cars) {
    return null;
  }

  return (
    <div>
      <h1>Cars</h1>
      <CarsList cars={cars} />
    </div>
  );
}

export default Home;
