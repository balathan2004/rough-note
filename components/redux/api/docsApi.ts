import {
  AuthResponseConfig,
  docInterface,
  docResponse,
  ResponseConfig,
} from "@/components/utils/interfaces";
import { baseApi } from "./baseApi";

const docsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDoc: builder.mutation<ResponseConfig, docInterface>({
      query: (payload) => ({
        url: "/docs/add_doc",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["docs"],
    }),
    deleteDoc: builder.mutation<
      ResponseConfig,
      { uid: string; doc_id: string }
    >({
      query: (payload) => ({
        url: "/docs/delete_doc",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["docs"],
    }),
    getAllDocs: builder.query<docResponse, string>({
      query: (uid) => ({
        url: `/docs/get_docs?uid=${uid}`,
      }),
      providesTags: ["docs"],
    }),
   
  }),
});

export default docsApis;
export const { useDeleteDocMutation, useAddDocMutation, useGetAllDocsQuery } =
  docsApis;
