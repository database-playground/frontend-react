export default function buildUri(path: string) {
    return new URL(path, import.meta.env.VITE_BACKEND_URI).toString();
}
