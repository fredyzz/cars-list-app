// Endpoints and settings for the HTTP service
export const HOST = "http://localhost:8001";
export const CAR_API_ENDPOINT = `${HOST}/cars`;

// Error messages for the HTTP service
export const ERRORS: { [key: number]: string } = {
  400: "Bad request.",
  401: "Unauthorized request.",
  500: "An error occurred while fetching the cars.",
};

export const UNKNOWN_ERROR_MESSAGE = "An error occurred.";
