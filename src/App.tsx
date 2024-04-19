import "./App.css";

import { CarsContextProvider } from "./contexts/CarsContext";
import { useCarsContext } from "./contexts/CarsContext/useCarsContext";

function App() {
  const ExampleComponent = () => {
    const carsContext = useCarsContext();
    console.log(carsContext);

    return <div>ExampleComponent</div>;
  };

  return (
    <CarsContextProvider>
      <ExampleComponent />
    </CarsContextProvider>
  );
}

export default App;
