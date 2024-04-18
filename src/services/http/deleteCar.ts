// Import settings
import {
  CAR_API_ENDPOINT,
  ERROR_MESSAGES,
  UNKNOWN_ERROR_MESSAGE,
} from "./settings";

export const deleteCar = async (id: string): Promise<void> => {
  if (!id || typeof id !== "string")
    throw new Error(ERROR_MESSAGES.badParams.id);

  try {
    const response = await fetch(`${CAR_API_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.notExecuted.notDeleted);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(UNKNOWN_ERROR_MESSAGE);
    }
  }
};
