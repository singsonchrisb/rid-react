import { useEffect, useState } from "react";
import axios from "axios";
import { decryptPWord } from "../functions/ChrisFunctions";

const useFetch = (url,gAccessToken) => {
  // let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
            headers: {'access-token': gAccessToken}
            });
        // setData(res.data);
        if (res.data?.data) {
            setData(res.data.data);
        } else {
            setData(res.data);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
      headers: {'access-token': gAccessToken}
      })
      if (res.data?.data) {
        setData(res.data.data);
    } else {
        setData(res.data);
    }    
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
