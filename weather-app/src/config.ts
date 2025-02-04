const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("No database configuration provided");
}

const config = {
    MONGODB_URI
}

export default config;
