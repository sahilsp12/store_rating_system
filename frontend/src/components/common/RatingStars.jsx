const RatingStars = ({
  rating = 0,
  editable = false,
  onChange,
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          role={editable ? "button" : undefined}
          style={{
            cursor: editable
              ? "pointer"
              : "default",
            color:
              star <= rating
                ? "#ffc107"
                : "#dee2e6",
            fontSize: "1.4rem",
          }}
          onClick={() =>
            editable &&
            onChange &&
            onChange(star)
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;