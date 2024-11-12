export function fetchCustomers() {
  return fetch(import.meta.env.VITE_API_URL + "customers").then((response) => {
    if (!response.ok)
      throw new Error("Response in fetch : " + response.statusText);
    return response.json();
  });
}

export function fetchTrainings() {
  return fetch(import.meta.env.VITE_API_URL + "trainings").then((response) => {
    if (!response.ok)
      throw new Error("Response in fetch : " + response.statusText);
    return response.json();
  });
}
