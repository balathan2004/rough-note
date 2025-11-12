// baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // adjust as needed
    // no credentials here
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["docs"],
  endpoints: () => ({}),
});
