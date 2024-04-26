export const INITIAL_STATE_WITH_FILTERED_CARS = {
  cars: [
    {
      id: "1",
      make: "TestCars",
      model: "Corolla",
      year: 2020,
      color: "Red",
      engine: "1.8L I4",
      transmission: "Automatic",
      doors: 4,
    },
    {
      id: "2",
      make: "TestCars",
      model: "Camry",
      year: 2020,
      color: "Blue",
      engine: "2.5L I4",
      transmission: "Automatic",
      doors: 4,
    },
  ],
  error: null,
  filteredCars: [
    {
      id: "1",
      make: "TestFilterd",
      model: "Corolla",
      year: 2020,
      color: "Red",
      engine: "1.8L I4",
      transmission: "Automatic",
      doors: 4,
    },
    {
      id: "2",
      make: "TestFilterd",
      model: "Camry",
      year: 2020,
      color: "Blue",
      engine: "2.5L I4",
      transmission: "Automatic",
      doors: 4,
    },
  ],
  loading: true,
  selectedCar: undefined,
};

export const INITIAL_STATE_WITH_INITIAL_CARS = {
  cars: [
    {
      id: "1",
      make: "TestInitialCards",
      model: "Corolla",
      year: 2020,
      color: "Red",
      engine: "1.8L I4",
      transmission: "Automatic",
      doors: 4,
    },
  ],
  error: null,
  filteredCars: null,
  loading: true,
  selectedCar: undefined,
};
