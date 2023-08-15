const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    MONGO_CONNECTED_STRING,
} = process.env

console.log(MONGO_CONNECTED_STRING)
export const mongoDb = {
    url:
        MONGO_CONNECTED_STRING ??
        `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
}