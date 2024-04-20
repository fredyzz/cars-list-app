import styles from "./CarListEmpty.module.css";

const SETTINGS = {
  figCaptionText: "No cars found, sorry",
  imageAlt: "sad cat image, because no cars were found",
  imageHeight: 200,
  imageSrc:
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOThwajMxeGozYXgzYTBweTgzcjdudWIyemFwNWwwdWo4MTEyMGc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CM1rHbKDMH2BW/giphy.gif",
  imageWidth: 300,
  visuallyHiddenText: "This is a car list, we haven't found any car",
};

function CarListEmpty() {
  return (
    <figure className={styles.CarListEmpty}>
      <img
        alt={SETTINGS.imageAlt}
        className={styles.image}
        height={SETTINGS.imageHeight}
        src={SETTINGS.imageSrc}
        width={SETTINGS.imageWidth}
      />
      <figcaption className={styles.figcaption}>
        {SETTINGS.figCaptionText}
      </figcaption>
      <p className={styles.visuallyHiddenForAccesibilty}>
        {SETTINGS.visuallyHiddenText}
      </p>
    </figure>
  );
}

CarListEmpty.settings = SETTINGS;

export default CarListEmpty;
