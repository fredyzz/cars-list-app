import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Import endpoint and error settings
import { CAR_API_ENDPOINT, ERROR_MESSAGES } from "../settings";

// Import the function to test
import { HTTP } from "../index";

// Import fixtures
import { GET_CARS_ENDPOINT_RESPONSE_FIXTURE } from "../mocks/getCardsEndpointResponse";
import {
  CAR_ID_TO_DELETE,
  DELETE_CAR_EXPECTED,
} from "../mocks/deleteCarExpected";

describe("deleteCar", () => {
  // initialize the server
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

  it("should throw an error if the car ID is not provided", async () => {
    try {
      // @ts-expect-error - Required parameter is missing
      await HTTP.deleteCar();
    } catch (error) {
      expect(error).toEqual(new Error(ERROR_MESSAGES.badParams.id));
    }
  });

  it("should throw an error if the car ID is not a string", async () => {
    try {
      // @ts-expect-error - Invalid parameter type
      await HTTP.deleteCar(1);
    } catch (error) {
      expect(error).toEqual(new Error(ERROR_MESSAGES.badParams.id));
    }
  });

  it("should delete a car", async () => {
    let carList = GET_CARS_ENDPOINT_RESPONSE_FIXTURE;

    server.use(
      http.delete(`${CAR_API_ENDPOINT}/:carID`, async ({ params }) => {
        const { carID } = params;
        carList = carList.filter((car) => car.id !== Number(carID));

        return HttpResponse.json(null, { status: 200 });
      })
    );

    const response = await HTTP.deleteCar(CAR_ID_TO_DELETE);

    expect(response).toBeUndefined();
    expect(carList).toEqual(DELETE_CAR_EXPECTED);
  });

  it("should throw an error if the request fails", async () => {
    server.use(
      http.delete(`${CAR_API_ENDPOINT}/:carID`, async () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(HTTP.deleteCar(CAR_ID_TO_DELETE)).rejects.toThrow(
      ERROR_MESSAGES.notExecuted.notDeleted
    );
  });
});
