import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Import fixtures
import { GET_CARS_ENDPOINT_RESPONSE_FIXTURE } from "../mocks/getCardsEndpointResponse";
import { CAR_TO_EDIT, MOCKED_ID } from "../mocks/editCarExpected";

// Import endpoint and error settings
import { CAR_API_ENDPOINT, ERROR_MESSAGES } from "../settings";

// Import the function to test
import { HTTP } from "../index";

describe("editCar", () => {
  // initialize the server
  const server = setupServer(
    http.get(`${CAR_API_ENDPOINT}/${MOCKED_ID}`, () => {
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
      // @ts-expect-error ignore the error to test the function
      await HTTP.editCar({ make: "Tesla", model: "4" });
    } catch (error) {
      expect(error).toEqual(
        new Error(ERROR_MESSAGES.badParams.noAllRequiredFields)
      );
    }
  });

  it("should return the edited car with the generated ID", async () => {
    server.use(
      http.post(`${CAR_API_ENDPOINT}/${MOCKED_ID}`, async ({ request }) => {
        const newCar = await request.json();

        return HttpResponse.json(newCar, { status: 200 });
      })
    );

    const response = await HTTP.editCar(CAR_TO_EDIT);
    expect(response).toEqual(CAR_TO_EDIT);
  });
});
