import {RegisterFormData} from "./app/(auth)/register/page";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  console.log("this is the url hittesd", process.env.NEXT_PUBLIC_BASE_URL);

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
