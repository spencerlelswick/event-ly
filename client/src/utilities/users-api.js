const BASE_URL = import.meta.env.VITE_BASE_URL
const USERS_URL = BASE_URL+"/users"

export async function index() {
  const res = await fetch(USERS_URL, {
    method: "GET",
  });
  
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}

export async function show(id) {
  const URL = `${USERS_URL}/${id}`;
  const config = {
    method: "GET",
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function update(id, data) {
  const URL = `${USERS_URL}/${id}`;
  
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function create(data) {
  const URL = USERS_URL;
  
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}