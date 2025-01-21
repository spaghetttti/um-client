import { UserDTO } from "@/types/userDTO";

const httpClient = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  currentUser?: UserDTO | null,
  headers: Record<string, string> = {}
) => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Add the Role header for POST, PUT, and DELETE requests
  if (["POST", "PUT", "DELETE"].includes(method)) {
    if (!currentUser || !currentUser.role) {
      throw new Error("Unauthorized: User role is required for this action");
    }
    defaultHeaders["Role"] = currentUser.role;
    // defaultHeaders["Role"] = 'fake';

  }

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Request failed");
  }

  return response.json();
};

export default httpClient;
