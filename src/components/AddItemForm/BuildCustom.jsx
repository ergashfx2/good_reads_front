function BuildCustom({ fields, setCustomData }) {
  const handleCustom = (e) => {
    const { id, value } = e.target;
    setCustomData((prevValues) => {
      if (prevValues.hasOwnProperty(id)) {
        return {
          ...prevValues,
          [id]: value,
        };
      } else {
        return {
          ...prevValues,
          [id]: value,
        };
      }
    });
  };

  return (
    <div>
      {fields
        ? fields.map((fieldString, index) => {
            const field = JSON.parse(fieldString);
            return (
              <div key={index} className="mb-3">
                <label className="fw-bold">{field.label}</label>
                {field.type === "text" && (
                  <input
                    id={field.label}
                    onChange={handleCustom}
                    type="text"
                    className="form-control"
                    placeholder={`Enter ${field.label}`}
                  />
                )}
                {field.type === "integer" && (
                  <input
                    id={field.label}
                    onChange={handleCustom}
                    type="number"
                    className="form-control"
                    placeholder={`Enter ${field.label}`}
                  />
                )}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default BuildCustom;
