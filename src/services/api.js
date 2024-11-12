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

export function saveCustomer(newCustomer) {
  return fetch(import.meta.env.VITE_API_URL + "customers", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newCustomer),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);
    return response.json();
  });
}

export function updateCustomer(url, updatedCustomer) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updatedCustomer),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in updating: " + response.statusText);
    return response.json();
  });
}

export function deleteCustomer(url) {
  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete : " + response.statusText);
    return response.json();
  });
}

export function saveTraining(newTraining) {
  return fetch(import.meta.env.VITE_API_URL + "trainings", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTraining),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);
    return response.json();
  });
}

export function deleteTraining(url) {
  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete : " + response.statusText);
    return response.json();
  });
}
