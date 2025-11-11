import {
  AuthResponseConfig,
  docInterface,
  ResponseConfig,
} from "@/components/utils/interfaces";
import { baseApi } from "./baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login: builder.mutation<
    //   ResponseConfig,
    //   { email: string; password: string }
    // >({
    //   query: (payload) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: payload
    //   }),
    // }),
    deleteDoc: builder.mutation<
      ResponseConfig,
      { uid: string; doc_id: string }
    >({
      query: (payload) => ({
        url: "/docs/delete_doc",
        method: "POST",
        body: payload,
      }),
    }),
    updateDoc: builder.mutation<ResponseConfig, docInterface>({
      query: (payload) => ({
        url: "/docs/update_doc",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export default postApi;
export const { useDeleteDocMutation, useUpdateDocMutation } = postApi;
