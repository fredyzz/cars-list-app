import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Import endpoint and error settings
import { CAR_API_ENDPOINT, ERRORS } from "../settings";

// Import the function to test
import { HTTP } from "../index";

// Import fixtures
import { GET_CARS_ENDPOINT_RESPONSE_FIXTURE } from "../mocks/getCardsEndpointResponse";
import { GET_CARS_EXPECTED } from "../mocks/getCardsExpected";

describe("getCars", () => {
  // mocking an OK server response
  const server = setupServer(
    http.get(CAR_API_ENDPOINT, () => {
      return HttpResponse.json(GET_CARS_ENDPOINT_RESPONSE_FIXTURE, {
        status: 200,
      });
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return a car list", async () => {
    const response = await HTTP.getCars();
    expect(response).toEqual(GET_CARS_EXPECTED);
  });

  it("should return cars with the correct properties", async () => {
    const response = await HTTP.getCars();

    response.forEach((car: unknown) => {
      expect(car).toHaveProperty("id");
      expect(car).toHaveProperty("make");
      expect(car).toHaveProperty("model");
      expect(car).toHaveProperty("year");
      expect(car).toHaveProperty("color");
      expect(car).toHaveProperty("engine");
      expect(car).toHaveProperty("transmission");
      expect(car).toHaveProperty("doors");
    });
  });

  it("should return an error if the request fails", async () => {
    // mocking a server error
    server.use(
      http.get(CAR_API_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(HTTP.getCars()).rejects.toThrow(ERRORS[500]);
  });
});
