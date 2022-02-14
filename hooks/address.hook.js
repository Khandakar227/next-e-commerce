import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

const useAddresses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFromFirestore() {
      try {
        if (!auth.currentUser) return //If not logged in return null
        //Make firebase query
        const query = db.collection('Addresses').where('user_id', '==', auth.currentUser.uid);
        const { docs } = await query.get();
        const data = docs.map((doc) => ({ ...doc.data(), id: doc.id }));  // get the address with data and doc id 
        setData(data);
      } catch (error) {
        console.log(error);
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

const useAddress = (user_id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFromFirestore() {
      try {
        if (!auth.currentUser) return
        const query = db.collection('Addresses').where('user_id', '==', user_id);
        const { docs } = await query.get({ source: 'cache' });
        setData({ ...docs[0].data(), id: docs[0].id })

      } catch (error) {
        console.log(error);
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

export { useAddresses, useAddress };
