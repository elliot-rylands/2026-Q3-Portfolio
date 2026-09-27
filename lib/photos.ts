// Photography. Drop files in public/photography/ and list them here,
// newest first. width/height are the original pixel size (keeps layout
// stable while images load). The first six show on the homepage.
// Photos are view only. Stored at max 1600px so no full-size copy is served.
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string; // e.g. "Bow Valley, January"
};

export const photos: Photo[] = [
  { src: "/photography/sheep.jpg", alt: "A woolly sheep with bright orange ears stands side-on in a sunlit field, looking straight at the camera, bare trees glowing behind it.", width: 1600, height: 1067 },
  { src: "/photography/pizza-vending-machine.jpg", alt: "A bright red roadside pizza vending machine reading Pizza'Limouzzi, pizzas artisanales, 24H/7J, under a blue sky.", width: 724, height: 1086 },
  { src: "/photography/river-town.jpg", alt: "A wide, still river running through a small town, cream stone houses with terracotta roofs reflected in the water.", width: 1600, height: 1067 },
  { src: "/photography/skillet-dessert.jpg", alt: "A scoop of vanilla ice cream melting over caramel apple crumble in a small cast iron skillet, lit by a slice of low sun.", width: 1086, height: 724 },
  { src: "/photography/claw-machine.jpg", alt: "A Denny's claw machine full of soft toys, glowing in a dark restaurant entrance beside a sunlit door.", width: 724, height: 1086 },
  { src: "/photography/camaro-badge.jpg", alt: "Close up of a chrome Camaro by Chevrolet script badge on a glittering blue body with white racing stripes.", width: 1086, height: 724 },
  { src: "/photography/lake-louise.jpg", alt: "The milky turquoise water of Lake Louise running out between pines and boulders, a red canoe on the lake and the Victoria Glacier behind.", width: 1086, height: 724 },
  { src: "/photography/bike-rack.jpg", alt: "A bike-shaped bike rack covered in painted flecks on a quiet desert sidewalk, palm trees and a white modernist building behind.", width: 724, height: 1086 },
  { src: "/photography/rrl-garage.jpg", alt: "A hand-painted RRL Garage sign on a white brick wall at No. 8150 Melrose: Demand the Genuine, Quality Service.", width: 724, height: 1086 },
  { src: "/photography/pink-wall.jpg", alt: "A long, windowless bright pink building on a street corner, one small tree in front of it under a grey sky.", width: 540, height: 360 },
  { src: "/photography/horses-at-dusk.jpg", alt: "Horses grazing in a dry golden field behind a wire fence at dusk, the Rockies stretching across the horizon.", width: 1086, height: 724 },
  { src: "/photography/comedy-store.jpg", alt: "The Comedy Store on the Sunset Strip, its curved black walls covered in comedians' names in white script, red curtains in the windows.", width: 1600, height: 1200 },
  { src: "/photography/banff-avenue.jpg", alt: "Looking down an icy Banff Avenue on a clear winter morning, Cascade Mountain lit up at the end of the street.", width: 768, height: 1024 },
  { src: "/photography/desert-sunset.jpg", alt: "Last light turning a desert mountain range deep orange above a dark motel car park and a lone palm tree.", width: 540, height: 360 },
  { src: "/photography/mule-deer.jpg", alt: "Black and white: a young buck with small antlers walking along a grassy ridge against a pale, cloudy sky.", width: 768, height: 1024 },
  { src: "/photography/tube-train.jpg", alt: "A London Underground train pulling through a dim station, its red doors and lit windows streaked with motion.", width: 1086, height: 724 },
  { src: "/photography/black-dog.jpg", alt: "Black and white: a black dog wrapped in a blanket, looking up at the camera with big, round eyes.", width: 540, height: 360 },
  { src: "/photography/orange-sculpture.jpg", alt: "Looping bright orange steel sculpture in front of a white mid-century building, palm trees and desert hills behind.", width: 540, height: 360 },
  { src: "/photography/diner-booths.jpg", alt: "Empty diner with rows of orange and green vinyl booths, sun pouring through the windows and a Closed sign by the door.", width: 1200, height: 1600 },
  { src: "/photography/pine-forest.jpg", alt: "Looking straight up through tall, straight pines from a snowy forest floor, a thin trail winding between the trunks.", width: 1200, height: 1600 },
  { src: "/photography/autumn-seawall.jpg", alt: "Two people walking up wet, leaf-covered steps between bright orange autumn trees, the harbour and marina below.", width: 1067, height: 1600 },
  { src: "/photography/float-plane.jpg", alt: "A white float plane moored at a dock on a grey day, the North Shore city and low cloud across the water.", width: 1600, height: 1067 },
  { src: "/photography/autumn-steps.jpg", alt: "Wet concrete steps seen from above, each tread lined with fallen maple leaves in pink, orange, red and yellow.", width: 1600, height: 1067 },
  { src: "/photography/golden-puppy.jpg", alt: "A golden retriever puppy lying on a beige ottoman, head tilted at the camera, a decorated Christmas tree behind.", width: 360, height: 480 },
  { src: "/photography/snowboard-selfie.jpg", alt: "A snowboarder in a grey helmet and sunglasses filming himself with a pole camera on a sunlit run between snowy pines.", width: 1024, height: 768 },
  { src: "/photography/donkey.jpg", alt: "A shaggy donkey with a white nose and tall ears by a wire fence, backlit by a low golden sun beside an old stone barn.", width: 1600, height: 1067 },
  { src: "/photography/copper-bar.jpg", alt: "A long copper bar top under a wood-panelled ceiling, shelves of bottles glowing behind and a caddy of limes and sauces in front.", width: 768, height: 1024 },
  { src: "/photography/trail-ride.jpg", alt: "Looking between a horse's ears on a trail ride, riders strung out ahead along a grassy ridge towards jagged Rockies peaks.", width: 768, height: 1024 },
  { src: "/photography/mountain-reflection-bw.jpg", alt: "Black and white: still water mirroring snow-dusted peaks and a dark band of forest.", width: 540, height: 360 },
  { src: "/photography/wedge-pond-sunrise.jpg", alt: "Early sun lighting two limestone mountains, both reflected perfectly in a calm pond with a thin layer of mist.", width: 1024, height: 768 },
  { src: "/photography/pond-and-bench.jpg", alt: "A quiet pond in evening light, pine forest and a sharp peak reflected in the water, an empty bench in the long grass.", width: 1086, height: 724 },
  { src: "/photography/reservoir-shore.jpg", alt: "A pale sandy shoreline curving along a blue mountain lake under forested slopes and grey limestone cliffs.", width: 1086, height: 724 },
  { src: "/photography/canoe-rack.jpg", alt: "A rack stacked with orange, yellow and cream canoes beside a grey building, mountains and pines behind.", width: 1086, height: 724 },
];

export const photographyIntro = "Whatever I point a camera at, at home in the Rockies and further afield.";
