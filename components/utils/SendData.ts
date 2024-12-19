import { ResponseConfig } from "./utils/interfaces";

interface Props {
  data: object;
  route: string;
}

export default async function SendData({ data, route }: Props) {
  const requestConfig: RequestInit = {
    body: JSON.stringify(data),
    method:"POST",
    headers: {
      "content-type": "application/json",
    },
  };

  const response = await fetch(route, requestConfig);

  const responseJson: ResponseConfig = await response.json();

  return responseJson;
}
