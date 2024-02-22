import axios from "axios";

interface Response {
  logo: string;
  name: string;
  id: number;
}
interface ApiError {
  message: string;
  status: number;
}

export const getQuotes = async (): Promise<Response | ApiError> => {
  try {
    const { data } = await axios.get<Response>(
      process.env.PUBLIC_URL + "reference/main-direction",
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY,
        },
      },
    );
    console.log("data", data);
    return data;
  } catch (error) {
    return {
      message: error.message,
      status: error.response.status,
    };
  }
};
