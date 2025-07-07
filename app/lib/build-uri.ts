export default function buildUri(path: string, backendUri = import.meta.env.VITE_BACKEND_URI) {
  if (!backendUri) {
    throw new Error("VITE_BACKEND_URI is not set");
  }
  
  const normalizedPath = path.replace(/\/+$/, "");

  return new URL(normalizedPath, backendUri).toString();
}
