// Import settings
import {
  CAR_API_ENDPOINT,
  UNKNOWN_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "./settings";

import { Car } from "../../interfaces/car";

export const editCar = async (car: Car): Promise<Car | undefined> => {
  if (
    !car.id ||
    !car.make ||
    !car.model ||
    !car.year ||
    !car.color ||
    !car.engine ||
    !car.transmission ||
    !car.doors
  ) {
    throw new Error(ERROR_MESSAGES.badParams.noAllRequiredFields);
  }

  try {
    const response = await fetch(`${CAR_API_ENDPOINT}/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.notExecuted.notSaved);
    }

    const data: Car = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(UNKNOWN_ERROR_MESSAGE);
    }
  }
};
