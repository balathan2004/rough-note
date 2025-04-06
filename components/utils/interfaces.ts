export interface ResponseConfig {
  status: 200 | 300 | 400;
  message: string;
}

export interface userInterface {
  display_name: string;
  email: string;
  profile_url: string;
  uid: string;
  createdAt: number;
}

export interface docInterface {
  doc_id: string;
  doc_text: string;
  doc_name: string;
  uid: string;
  doc_created: number;
}

export interface UserCredResponse extends ResponseConfig {
  credentials: userInterface | null;
}

export interface docResponse extends ResponseConfig {
  docData: wholeDoc | null;
}

export interface wholeDoc {
  data: docInterface[];
  metadata: {
    lastUpdated: number;
  };
}

export interface singleDocResponse extends ResponseConfig {
  docData: docInterface | null;
}
