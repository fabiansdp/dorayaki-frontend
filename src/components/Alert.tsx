import React, { useEffect, useState } from "react";
import "../styles/style.css";

interface Props {
  error: string | null;
  setError: (newValue: string | null) => void;
  color?: string;
  closable?: boolean;
}

const Alert: React.FC<Props> = ({
  error,
  setError,
  color = "#ff5252",
  closable = true
}) => {
  const [close, setClose] = useState(false);

  useEffect(() => {
    setClose(false);
  }, [error]);

  if (close || !error) {
    return <></>;
  } else {
    return (
      <>
        <div id="alert-body" style={{backgroundColor: color}}>
          <p>{error}</p>
          <div
            className={closable ? "" : "d-none"}
            id="close-btn"
            onClick={() => {
              setClose(true);
              setError(null);
            }}
          >
            X
          </div>
        </div>
      </>
    );
  }
};

export default Alert;