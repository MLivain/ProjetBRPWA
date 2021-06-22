export default function config() {
  if (process.env.NODE_ENV === 'development') {
    return { apiUrl: 'https://localhost:44383' };
  } else {
    return { apiUrl: '' };
  }
}
