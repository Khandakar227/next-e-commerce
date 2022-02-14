import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

const useOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFromFirestore() {
      try {
        if (!auth.currentUser) return
        const query = db.collection('Orders').where('user_id', '==', auth.currentUser.uid); //Get orders of the user
        const { docs } = await query.get();
        const data = docs.map((doc) => ({ ...doc.data(), id: doc.id, date: doc.data().date.toDate() }));  // get the order with data and doc id 
        setData(data);
      } catch (error) {
        setError(error);

      } finally {
        setLoading(false)
      }
    }

    fetchFromFirestore();
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};

export { useOrders };
