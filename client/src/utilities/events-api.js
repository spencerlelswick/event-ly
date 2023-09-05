const BASE_URL = import.meta.env.VITE_BASE_URL
const EVENTS_URL = BASE_URL + "/events"

export async function index(data) {

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({coordinates: data}),
  };

  const res = await fetch(EVENTS_URL, config);
 
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}

export async function create(data) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(EVENTS_URL, config);

  console.log(res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function show(id) {
  const URL = `${EVENTS_URL}/${id}`;
  const config = {
    method: "GET",
  };
  const res = await fetch(URL, config);

  console.log(res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function update(id, data) {

  const URL = `${EVENTS_URL}/${id}`;

  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(URL, config);

  console.log("update response", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function destroy(id) {
  const URL = `${EVENTS_URL}/${id}`;
  const config = {
    method: "DELETE",
  };
  const res = await fetch(URL, config);

  console.log(res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}