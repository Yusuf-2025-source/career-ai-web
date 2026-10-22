// Single place to configure HTTP. Uncomment when your API is ready.
//
// const BASE_URL = import.meta.env.VITE_API_URL;
//
// export async function http(path, { method = "GET", body, token } = {}) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//     credentials: "include",
//   });
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw { status: res.status, ...data };
//   return data;
// }
export {};
