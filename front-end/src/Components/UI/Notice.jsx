export const Notice = ({ adminDetail }) => {
  return (
    <div className="accordion" id="accordionExample">
      <div
        className="accordion-item"
        style={{
          backgroundColor: "rgb(255, 193, 7)",
          margin: 0,
          fontSize: "16px",
          boxShadow: "5px 5px 5px orange",
        }}
      >
        <p className="accordion-header">
          <button
            className="accordion-button fs-3 focus-ring focus-ring-light"
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Important Notice Before Using Online Store!(Tap Here To Close/Open)
          </button>
        </p>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{adminDetail.notice}</div>
        </div>
      </div>
    </div>
  );
};
