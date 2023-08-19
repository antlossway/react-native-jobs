import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

import { dummyData } from "./dummy";

const rapidApiKey = RAPID_API_KEY; // maybe prevent some weird problem?

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`, //search, job-detail
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  //   const fetchData = async () => {
  //     setIsLoading(true);

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data);

  //       setData(response.data.data);
  //     } catch (error) {
  //       setError(error);
  //       alert("fetchData has error");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const fetchData = async () => {
    setIsLoading(true);

    await new Promise((resolve, reject) => setTimeout(resolve, 2000)).catch(
      (error) => {
        console.log(error);
      }
    );

    setIsLoading(false);

    if (endpoint === "job-details") {
      const { job_id } = query;
      const job_detail = dummyData.filter((job) => job.job_id === job_id);

      setData(job_detail);
    } else {
      setData(dummyData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
