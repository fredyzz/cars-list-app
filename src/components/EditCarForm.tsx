import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Car } from "../interfaces/car";

import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import { HTTP } from "../services/http/index";

import styles from "./AddCarForm.module.css";

function AddCarForm({ initialState }: { initialState: Car }) {
  const navigate = useNavigate();
  const { actions, dispatch } = useCarsContext();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | undefined>(
    undefined
  );

  const carId = initialState?.id || "";

  const [make, setMake] = useState(initialState.make || "");
  const [model, setModel] = useState(initialState.model || "");
  const [year, setYear] = useState(initialState.year || 0);
  const [color, setColor] = useState(initialState.color || "");
  const [engine, setEngine] = useState(initialState.engine || "");
  const [transmission, setTransmission] = useState(
    initialState.transmission || ""
  );
  const [doors, setDoors] = useState(initialState?.doors || 0);

  const editCar = async (newCar: Car): Promise<Car | undefined> => {
    try {
      setIsSubmitting(true);
      const editedCar = await HTTP.editCar(newCar);
      setIsSubmitting(false);

      return editedCar;
    } catch (error) {
      if (error instanceof Error) {
        setNotification(error.message);
      }
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newCar = {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: Number(formData.get("year")),
      color: formData.get("color") as string,
      engine: formData.get("engine") as string,
      transmission: formData.get("transmission") as string,
      doors: Number(formData.get("doors")),
    };

    if (
      make !== "" &&
      model !== "" &&
      year !== 0 &&
      color !== "" &&
      engine !== "" &&
      transmission !== "" &&
      doors !== 0
    ) {
      const carWithNewValues: Car = { id: carId, ...newCar };
      await editCar(carWithNewValues);

      dispatch({
        type: actions.EDIT_CAR,
        payload: carWithNewValues,
      });

      form.reset();
      navigate("/");
    }
  };

  return (
    <section className={styles.AddCarForm}>
      <form
        onSubmit={handleOnSubmit}
        className={styles.form}
        aria-label="Add Car Form"
      >
        <div className={styles.field}>
          <label htmlFor="make">Make</label>
          <input
            type="text"
            id="make"
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            aria-label="Make"
            aria-required="true"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            aria-label="Model"
            aria-required="true"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            aria-label="Year"
            aria-required="true"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Color"
            aria-required="true"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="engine">Engine</label>
          <input
            type="text"
            id="engine"
            name="engine"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            aria-label="Engine"
            aria-required="true"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="transmission">Transmission</label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            aria-label="Transmission"
            aria-required="true"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="doors">Doors</label>
          <input
            type="number"
            id="doors"
            name="doors"
            value={doors}
            onChange={(e) => setDoors(Number(e.target.value))}
            aria-label="Doors"
            aria-required="true"
            required
          />
        </div>
        {Boolean(notification) && (
          <p className={styles.notification}>{notification}</p>
        )}
        <button
          type="submit"
          role="button"
          className={styles.submitButton}
          disabled={isSubmitting}
          aria-label="Save Car"
        >
          Edit Car
        </button>
      </form>
    </section>
  );
}

export default AddCarForm;
