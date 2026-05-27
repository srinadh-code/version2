import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000/candidates/";

const NOTES_URL =
  "http://127.0.0.1:8000/notes/";

// ================= CANDIDATES =================

export const getCandidates =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;
};

export const deleteCandidate =
  async (id: number) => {

    await axios.delete(
      `${API_URL}${id}/`
    );
};

export const updateCandidate =
  async (
    id: number,
    data: any
  ) => {

    const response =
      await axios.patch(

        `${API_URL}${id}/`,

        data
      );

    return response.data;
};

// ================= TRIAGE STATUS =================

export const updateCandidateStatus =
  async (
    id: number,
    status: string
  ) => {

    const response =
      await axios.patch(

        `${API_URL}${id}/update-status/`,

        {
          status,
        }
      );

    return response.data;
};

// ================= NOTES =================

export const getNotes =
  async () => {

    const response =
      await axios.get(
        NOTES_URL
      );

    return response.data;
};

export const addNote =
  async (data: any) => {

    const response =
      await axios.post(

        NOTES_URL,

        data
      );

    return response.data;
};