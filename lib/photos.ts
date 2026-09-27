// Photography. Drop files in public/photography/ and list them here,
// newest first. width/height are the original pixel size (keeps layout
// stable while images load). The first six show on the homepage.
// Every photo can be downloaded from /photography at full size.
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string; // e.g. "Bow Valley, January"
};

export const photos: Photo[] = [];

export const photographyIntro = "Photos from Cochrane and the Rockies, taken whenever a camera is within reach.";
