import {
  AuthResponseConfig,
  docInterface,
  docResponse,
  ResponseConfig,
  singleDocResponse,
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
    getMyDocs: builder.query<docResponse, void>({
      query: () => ({
        url: `/docs/get_my_docs`,
      }),
      providesTags: ["docs"],
    }),
    getSingleDoc: builder.query<singleDocResponse, string>({
      query: (docName) => ({
        url: `/docs/get_single_doc?doc_name=${docName}`,
      }),
      providesTags: ["docs"],
    }),
  }),
});

export default docsApis;
export const {
  useDeleteDocMutation,
  useAddDocMutation,
  useGetMyDocsQuery,
  useLazyGetSingleDocQuery,
} = docsApis;
