// const storedBaseUrl = localStorage.getItem("baseUrl");
// const baseUrl = JSON.parse(storedBaseUrl);
// export const BaseURL1 = baseUrl?.value;

import { BaseURL } from "../../Constants";

export const BaseURL1 = localStorage.getItem("BaseUrl") || BaseURL;
