import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Import fixtures
import { GET_CARS_ENDPOINT_RESPONSE_FIXTURE } from "../mocks/getCardsEndpointResponse";
import {
  CAR_TO_SAVE,
  MOCKED_ID,
  SAVE_CAR_EXPECTED,
} from "../mocks/saveCarExpected";

// Mock the uuid module
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue(MOCKED_ID),
}));

// Import endpoint and error settings
import { CAR_API_ENDPOINT, ERROR_MESSAGES } from "../settings";

// Import the function to test
import { HTTP } from "../index";

describe("saveCar", () => {
  // initialize the server
  const server = setupServer(
    http.get(CAR_API_ENDPOINT, () => {
      return HttpResponse.json(GET_CARS_ENDPOINT_RESPONSE_FIXTURE, {
        status: 200,
      });
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  it("should throw an error if all required params are not provided", async () => {
    try {
      await HTTP.saveCar({ make: "Tesla", model: "4" });
    } catch (error) {
      expect(error).toEqual(
        new Error(ERROR_MESSAGES.badParams.noAllRequiredFields)
      );
    }
  });

  it("should return the saved car with the generated ID", async () => {
    server.use(
      http.post(`${CAR_API_ENDPOINT}`, async ({ request }) => {
        const newCar = await request.json();

        return HttpResponse.json(newCar, { status: 200 });
      })
    );

    const response = await HTTP.saveCar(CAR_TO_SAVE);
    expect(response).toEqual(SAVE_CAR_EXPECTED);
  });
});
