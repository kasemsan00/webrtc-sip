// call rest api use fetch

export const getExtension = async () => {
  const response = await fetch("/api/extension");
  if (!response.ok) {
    throw new Error("Get extension failed");
  }
  return response.json();
};
