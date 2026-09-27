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

export const photos: Photo[] = [
  { src: "/photography/sheep.jpg", alt: "A woolly sheep with bright orange ears stands side-on in a sunlit field, looking straight at the camera, bare trees glowing behind it.", width: 2172, height: 1448 },
  { src: "/photography/pizza-vending-machine.jpg", alt: "A bright red roadside pizza vending machine reading Pizza'Limouzzi, pizzas artisanales, 24H/7J, under a blue sky.", width: 724, height: 1086 },
  { src: "/photography/river-town.jpg", alt: "A wide, still river running through a small town, cream stone houses with terracotta roofs reflected in the water.", width: 2172, height: 1448 },
  { src: "/photography/skillet-dessert.jpg", alt: "A scoop of vanilla ice cream melting over caramel apple crumble in a small cast iron skillet, lit by a slice of low sun.", width: 1086, height: 724 },
  { src: "/photography/claw-machine.jpg", alt: "A Denny's claw machine full of soft toys, glowing in a dark restaurant entrance beside a sunlit door.", width: 724, height: 1086 },
  { src: "/photography/camaro-badge.jpg", alt: "Close up of a chrome Camaro by Chevrolet script badge on a glittering blue body with white racing stripes.", width: 1086, height: 724 },
];

export const photographyIntro = "Whatever I point a camera at, at home in the Rockies and further afield. Feel free to download any of them.";
