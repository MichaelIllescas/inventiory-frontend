import { useState } from "react";
import axios from "axios";

const useCancelPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelPurchase = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`/api/purchases/cancel/${id}`);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { cancelPurchase, loading, error };
};

export default useCancelPurchase;
