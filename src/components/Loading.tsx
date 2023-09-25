import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("rgb(54, 55, 214)");
  return (
    <div className="w-full flex justify-center items-center">
      <ClipLoader
        color={color}
        loading={loading}
        size={120}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
