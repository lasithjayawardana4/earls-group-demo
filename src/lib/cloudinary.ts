/**
 * Utility to dynamically optimize Cloudinary video URLs by injecting transformation parameters.
 * E.g., setting f_auto (auto format/codec selection), q_auto:eco (automatic quality/compression optimization),
 * and resizing the video width to limit bandwith usage and CPU/GPU decoding overhead.
 */
export function getOptimizedVideoUrl(url: string, width?: number): string {
  if (!url) return "";

  if (url.includes("res.cloudinary.com")) {
    // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/video/upload/v<version>/<public_id>.mp4
    // We insert transformation parameters right after '/video/upload/'
    const uploadMarker = "/video/upload/";
    const markerIndex = url.indexOf(uploadMarker);

    if (markerIndex !== -1) {
      const prefix = url.substring(0, markerIndex + uploadMarker.length);
      const rest = url.substring(markerIndex + uploadMarker.length);

      // Default background video width to 720 or 1280 depending on requirements.
      // 1280 (720p) is a fantastic balance between high quality and high performance.
      const targetWidth = width || 1280;

      // c_limit ensures the video is scaled down to a maximum width of targetWidth if it's larger.
      // f_auto chooses the optimal format (e.g. WebM/VP9, HEVC, MP4) dynamically.
      // q_auto:eco applies eco-friendly compression, reducing the size significantly without visual loss.
      const transformation = `f_auto,q_auto:eco,w_${targetWidth},c_limit/`;

      // Check if the URL already has transformations or starts directly with version (v123456...)
      // Version starts with 'v' followed by digits.
      if (rest.startsWith("v") && /^\d+/.test(rest.substring(1).split("/")[0])) {
        return `${prefix}${transformation}${rest}`;
      } else {
        // If there's an existing transformation chunk, let's find the version index
        // e.g. some_transform/v1785858638/public_id
        const versionIndex = rest.search(/\/v\d+/);
        if (versionIndex !== -1) {
          const publicIdAndVersion = rest.substring(versionIndex + 1); // e.g. v1785858638/...
          return `${prefix}${transformation}${publicIdAndVersion}`;
        }
      }

      // Fallback: prepend the transformation to the rest of the URL
      return `${prefix}${transformation}${rest}`;
    }
  }

  return url;
}
