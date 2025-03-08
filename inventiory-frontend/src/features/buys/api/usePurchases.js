import { useState, useEffect } from "react";
import axios from "axios";

const usePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPurchases = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/purchases");
      setPurchases(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return { purchases, loading, error, fetchPurchases };
};

export default usePurchases;
