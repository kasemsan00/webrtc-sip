export const getTurn = async () => {
  const response = await fetch("/api/turn");
  if (!response.ok) {
    throw new Error("Get turn failed");
  }
  return response.json();
};
export const addTurn = async (data: any) => {
  const settings = {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const fetchResponse = await fetch("/api/turn", settings);
  return await fetchResponse.json();
};
export const updateTurn = async ({
  id,
  url,
  username,
  credential,
}: {
  id: string;
  url: string;
  username: string;
  credential: string;
}) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify({
      id,
      url,
      username,
      credential,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const fetchResponse = await fetch("/api/turn", settings);
  return await fetchResponse.json();
};
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
    throw new Error("Insert extension failed");
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
export const updateExtension = async ({
  id,
  domain,
  webSocket,
  extension,
  password,
}: {
  id: number;
  domain: string;
  webSocket: string;
  extension: string;
  password: string;
}) => {
  const response = await fetch("/api/extension");
  if (!response.ok) {
    throw new Error("Update extension failed");
  }
  const data = {
    id,
    domain,
    websocket: webSocket,
    extension,
    password,
  };
  console.log(data);
  try {
    const settings = {
      method: "PUT",
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
export const deleteExtension = async (id: number | undefined) => {
  if (id === undefined) return;
  const response = await fetch(`/api/delete?id=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Delete extension failed");
  }
  return await response.json();
};
export const getSetting = async () => {
  const response = await fetch(`/api/setting`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Get Setting failed");
  }
  return await response.json();
};
export const updateSetting = async ({ name, value }: { name: string; value: string }) => {
  const settings = {
    method: "POST",
    body: JSON.stringify({
      name,
      value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const fetchResponse = await fetch("/api/setting", settings);
  return await fetchResponse.json();
};
