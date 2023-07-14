export const PUSHER_CREDENTIALS = {
    APP_ID: import.meta.env.VITE_PUSHER_APP_ID,
    APP_CLUSTER: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    ENCRYPTED: Boolean(import.meta.env.VITE_PUSHER_ENCRYPTED),
}