// Endpoints and settings for the HTTP service
export const HOST = "http://localhost:8001";
export const CAR_API_ENDPOINT = `${HOST}/cars`;

// Error messages for the HTTP service
export const HTTP_ERRORS: { [key: number]: string } = {
  400: "Bad request.",
  401: "Unauthorized request.",
  500: "Something went wrong with the server.",
};

export const ERROR_MESSAGES = {
  badParams: {
    id: "Received bad ID parameter.",
    noAllRequiredFields: "Not all required fields were received.",
  },
  notExecuted: {
    notDeleted:
      "Something went wrong with the server. The car was not deleted.",
    notSaved: "Something went wrong with the server. The car was not saved.",
  },
};

export const UNKNOWN_ERROR_MESSAGE = "An error occurred.";
