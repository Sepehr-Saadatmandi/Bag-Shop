export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  sizes: string[];
  image: string;
  hoverImage: string;
  description: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'The Aurelia Tote',
    price: 1295,
    category: 'Totes',
    color: 'Cream',
    sizes: ['Small', 'Medium', 'Large'],
    image: 'https://image.qwenlm.ai/generated-images/6dbe78a7-57bc-4fa9-bbad-95f37c9786f3/_result.png',
    hoverImage: 'https://image.qwenlm.ai/generated-images/518a1ede-8545-4ced-8d53-88784be8230b/_result.png',
    description: 'Crafted from the finest Italian leather, The Aurelia Tote embodies effortless elegance. Its structured silhouette and gold-tone hardware make it a timeless investment piece.',
    isNew: true,
  },
  {
    id: '2',
    name: 'The Seraphine Crossbody',
    price: 895,
    category: 'Crossbody',
    color: 'Black',
    sizes: ['One Size'],
    image: 'https://image.qwenlm.ai/generated-images/7f2d3153-b7ad-4f58-8429-fbc2931a557b/_result.png',
    hoverImage: 'https://image.qwenlm.ai/generated-images/0ee51ba8-96ba-4417-a4e9-080b0c71027e/_result.png',
    description: 'A modern classic, The Seraphine Crossbody features a sleek structured design with an adjustable chain strap. Perfect for day-to-evening transitions.',
    isNew: true,
  },
  {
    id: '3',
    name: 'The Valentina Clutch',
    price: 650,
    category: 'Clutches',
    color: 'Burgundy',
    sizes: ['One Size'],
    image: 'https://image.qwenlm.ai/generated-images/ca8ad241-878d-416a-b807-a81cad098087/_result.png',
    hoverImage: 'https://image.qwenlm.ai/generated-images/dbfeb481-b306-4ade-b93b-77f4e5c35a61/_result.png',
    description: 'The Valentina Clutch is the epitome of evening sophistication. Rich burgundy leather with a sculptural clasp creates an unforgettable statement.',
  },
  {
    id: '4',
    name: 'The Camille Bucket',
    price: 1150,
    category: 'Bucket',
    color: 'Tan',
    sizes: ['One Size'],
    image: 'https://image.qwenlm.ai/generated-images/518a1ede-8545-4ced-8d53-88784be8230b/_result.png',
    hoverImage: 'https://image.qwenlm.ai/generated-images/6dbe78a7-57bc-4fa9-bbad-95f37c9786f3/_result.png',
    description: 'The Camille Bucket Bag combines relaxed elegance with everyday functionality. Its supple leather molds beautifully to the body over time.',
  },
  {
    id: '5',
    name: 'The Odette Satchel',
    price: 1450,
    category: 'Totes',
    color: 'Navy',
    sizes: ['Small', 'Medium'],
    image: 'https://image.qwenlm.ai/generated-images/0ee51ba8-96ba-4417-a4e9-080b0c71027e/_result.png',
    hoverImage: 'https://image.qwenlm.ai/generated-images/7f2d3153-b7ad-4f58-8429-fbc2931a557b/_result.png',
    description: 'A statement of refined taste, The Odette Satchel features impeccable construction in deep navy leather. Its structured form commands attention.',
    isNew: true,
  },
  {
    id: '6',
    name: 'The Margaux Mini',
    price: 780,
    category: 'Crossbody',
    color: 'Olive',
    sizes: ['One Size'],
    image: 'https://image.qwenlm.ai/generated-images/dbfeb481-b306-4ade-b93b-77f4e5c35a61/_result.png',
    hoverImage: 'https://image.qwenlm.ai/generated-images/ca8ad241-878d-416a-b807-a81cad098087/_result.png',
    description: 'Petite yet powerful, The Margaux Mini delivers maximum impact in a compact form. Its olive green hue adds an unexpected twist to any ensemble.',
  },
];

export const heroImages = [
  {
    image: 'https://image.qwenlm.ai/generated-images/5054f3fe-cff5-434b-8ca1-6310c59476c9/_result.png',
    title: 'New Collection',
    subtitle: 'Autumn/Winter 2026',
    cta: 'Shop Collection',
  },
  {
    image: 'https://image.qwenlm.ai/generated-images/53e21664-ce6a-4cc6-96cd-967d006fabef/_result.png',
    title: 'The Edit',
    subtitle: 'Curated essentials for the modern woman',
    cta: 'Discover More',
  },
];

export const categories = ['All', 'Totes', 'Crossbody', 'Clutches', 'Bucket'];
export const colors = ['All', 'Cream', 'Black', 'Burgundy', 'Tan', 'Navy', 'Olive'];
