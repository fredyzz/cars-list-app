import { CarsContextProvider } from "./contexts/CarsContext";

import { Router } from "./components/Router";

function App() {
  return (
    <CarsContextProvider>
      <Router />
    </CarsContextProvider>
  );
}

export default App;
