import { useState } from "react";
import { toast } from "sonner";

const useFetch = (callback) => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(undefined);

    const fn =async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await callback(...args);
            setData(result);
            setError(null);
        } catch (error) {
            setError(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { fn, loading, error, data, setData};
};

export default useFetch;