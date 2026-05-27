import axios from "axios";

const API_URL = "http://127.0.0.1:8000/jobs/";

export const createJob = async (data: any) => {

  const response = await axios.post(
    API_URL,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getJobs = async () => {

  const response = await axios.get(API_URL);

  return response.data;
};

export const deleteJob = async (id: number) => {

  const response = await axios.delete(
    `${API_URL}${id}/`
  );

  return response.data;
};