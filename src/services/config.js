export default function config() {
  if (process.env.NODE_ENV === "development") {
    return { apiUrl: "https://localhost:5000" };
  } else {
    return { apiUrl: "https://brpwaback.azurewebsites.net" };
  }
}
