// Import settings
import { CarList } from "../../interfaces/carList";
import { CAR_API_ENDPOINT, ERRORS, UNKNOWN_ERROR_MESSAGE } from "./settings";

export const getCars = async (): Promise<CarList> => {
  try {
    const response = await fetch(CAR_API_ENDPOINT);

    if (!response.ok) {
      throw new Error(ERRORS[response.status] || UNKNOWN_ERROR_MESSAGE);
    }

    const cars = await response.json();

    return cars;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(UNKNOWN_ERROR_MESSAGE);
    }
  }
};
