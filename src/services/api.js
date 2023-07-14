import axios from "axios";
import { toast } from "react-hot-toast";

export const authInterceptor = [
    (config) => config,
    (error) => Promise.reject(error),
];

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

api.interceptors.request.use(...authInterceptor);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        toast.error(
            error?.response?.data?.message ??
            error?.response?.data?.error ??
            "Internal server error, Try again later",
            {
                style: {
                    minWidth: 200,
                },
                id: "server_error",
            }
        );

        return Promise.reject(error);
    }
);
