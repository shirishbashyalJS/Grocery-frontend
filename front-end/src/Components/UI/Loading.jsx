export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border"
        style={{
          width: "3rem",
          marginTop: "17rem",
          marginBottom: "5rem",
          height: "3rem",
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
