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
  { src: "/photography/lake-louise.jpg", alt: "The milky turquoise water of Lake Louise running out between pines and boulders, a red canoe on the lake and the Victoria Glacier behind.", width: 1086, height: 724 },
  { src: "/photography/bike-rack.jpg", alt: "A bike-shaped bike rack covered in painted flecks on a quiet desert sidewalk, palm trees and a white modernist building behind.", width: 724, height: 1086 },
  { src: "/photography/rrl-garage.jpg", alt: "A hand-painted RRL Garage sign on a white brick wall at No. 8150 Melrose: Demand the Genuine, Quality Service.", width: 724, height: 1086 },
  { src: "/photography/pink-wall.jpg", alt: "A long, windowless bright pink building on a street corner, one small tree in front of it under a grey sky.", width: 540, height: 360 },
  { src: "/photography/horses-foothills.jpg", alt: "Horses grazing in a dry golden field behind a wire fence at dusk, the Rockies stretching across the horizon.", width: 1086, height: 724 },
];

export const photographyIntro = "Whatever I point a camera at, at home in the Rockies and further afield. Feel free to download any of them.";
