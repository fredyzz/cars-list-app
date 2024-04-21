import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Car } from "../interfaces/car";

import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import { HTTP } from "../services/http/index";

import styles from "./AddCarForm.module.css";

function AddCarForm() {
  // ToDo: Review and improve this
  const navigate = useNavigate();
  const { actions, dispatch } = useCarsContext();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | undefined>(
    undefined
  );

  const [make, setMake] = useState<string | undefined>(undefined);
  const [model, setModel] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [engine, setEngine] = useState<string | undefined>(undefined);
  const [transmission, setTransmission] = useState<string | undefined>(
    undefined
  );
  const [doors, setDoors] = useState<number | undefined>(undefined);

  const addCar = async (newCar: Partial<Car>): Promise<Car | undefined> => {
    try {
      setIsSubmitting(true);
      const savedCar = await HTTP.saveCar(newCar);
      setIsSubmitting(false);

      return savedCar;
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

    const newCar: Partial<Car> = {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: Number(formData.get("year")),
      color: formData.get("color") as string,
      engine: formData.get("engine") as string,
      transmission: formData.get("transmission") as string,
      doors: Number(formData.get("doors")),
    };

    const savedCar = await addCar(newCar);

    if (savedCar) dispatch({ type: actions.ADD_CAR, payload: savedCar });

    form.reset();
    navigate("/");
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
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Save Car
        </button>
      </form>
    </section>
  );
}

export default AddCarForm;
