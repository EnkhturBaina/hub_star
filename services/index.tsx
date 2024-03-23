import { ApiError } from "@/types/apiError";
import { CustomerType } from "@/types/customerType";
import { Feature } from "@/types/feature";
import axios from "axios";

interface Response {
  logo: string;
  name: string;
  id: number;
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
    return data;
  } catch (error) {
    return {
      message: error.message,
      status: error.response.status,
    };
  }
};

export const getFeatures = async (): Promise<CustomerType | null> => {
  try {
    const { data } = await axios.get<CustomerType>(
      process.env.PUBLIC_URL + "reference/category",
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY,
        },
      },
    );
    return data;
  } catch (error) {
    return error;
  }
};
