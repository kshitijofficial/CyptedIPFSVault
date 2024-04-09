const MAX_FILE_SIZE_MB = 10; // Maximum allowed file size in megabytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"]; // Allowed file types
export const validateFile = (file) => {
    if (!file) {
        throw new Error("Please select a file.");
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        throw new Error(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error("Invalid file type. Only JPEG and PNG files are allowed.");
    }
};