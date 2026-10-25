import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using backend-only credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Delete an image from Cloudinary using its public ID
export const deleteCloudinaryImage = async (
  publicId: string,
): Promise<void> => {
  const result = await cloudinary.uploader.destroy(publicId);

  // Cloudinary returns "ok" when the image is deleted
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Failed to delete Cloudinary image: ${result.result}`);
  }
};

// Extract the public ID from a stored Cloudinary image URL
export const getCloudinaryPublicId = (imageUrl: string): string | null => {
  try {
    const url = new URL(imageUrl);

    // Only process URLs belonging to Cloudinary
    if (url.hostname !== "res.cloudinary.com") {
      return null;
    }

    const match = url.pathname.match(
      /\/image\/upload\/(?:v\d+\/)?(.+)\.[^/.]+$/,
    );

    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
};
