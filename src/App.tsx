import { CarsContextProvider } from "./contexts/CarsContext";

import Home from "./pages/Home";

function App() {
  return (
    <CarsContextProvider>
      <Home />
    </CarsContextProvider>
  );
}

export default App;
