export default function FeaturedSection() {
  return (
    <section className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4">
          The Edit
        </h2>
        <p className="text-sm text-gray-500 tracking-wide max-w-lg mx-auto">
          Discover our curated selection of must-have pieces for the season
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large feature */}
        <div className="md:col-span-2 relative group cursor-pointer">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src="https://image.qwenlm.ai/generated-images/5054f3fe-cff5-434b-8ca1-6310c59476c9/_result.png"
              alt="Featured collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-xs tracking-widest uppercase mb-2 opacity-80">Featured</p>
            <h3 className="text-2xl lg:text-3xl font-light tracking-wide">Autumn/Winter 2026</h3>
            <button className="mt-4 border border-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
              Shop Now
            </button>
          </div>
        </div>

        {/* Side features */}
        <div className="flex flex-col gap-6">
          <div className="relative group cursor-pointer flex-1">
            <div className="h-full min-h-[200px] overflow-hidden bg-gray-100">
              <img
                src="https://image.qwenlm.ai/generated-images/7f2d3153-b7ad-4f58-8429-fbc2931a557b/_result.png"
                alt="Crossbody collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs tracking-widest uppercase mb-1 opacity-80">New</p>
              <h3 className="text-lg font-light tracking-wide">Crossbody Edit</h3>
            </div>
          </div>
          <div className="relative group cursor-pointer flex-1">
            <div className="h-full min-h-[200px] overflow-hidden bg-gray-100">
              <img
                src="https://image.qwenlm.ai/generated-images/ca8ad241-878d-416a-b807-a81cad098087/_result.png"
                alt="Clutch collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs tracking-widest uppercase mb-1 opacity-80">Evening</p>
              <h3 className="text-lg font-light tracking-wide">Clutch Collection</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
