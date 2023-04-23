// call rest api use fetch

export const getExtension = async () => {
  const response = await fetch("/api/extension");
  if (!response.ok) {
    throw new Error("Get extension failed");
  }
  return response.json();
};
export const insertExtension = async ({
  domain,
  webSocket,
  extension,
  password,
}: {
  domain: string;
  webSocket: string;
  extension: string;
  password: string;
}) => {
  const response = await fetch("/api/extension");
  if (!response.ok) {
    throw new Error("Get extension failed");
  }
  const data = {
    domain,
    webSocket,
    extension,
    password,
  };
  try {
    const settings = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const fetchResponse = await fetch(`/api/extension`, settings);
    return await fetchResponse.json();
  } catch (e) {
    return e;
  }
};
