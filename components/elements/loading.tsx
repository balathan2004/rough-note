import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useLoadingContext } from "../context/loadingWrapper";

export default function LoadingProgress() {
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <CircularProgress className="loader" />
      </>
    );
  }
}
