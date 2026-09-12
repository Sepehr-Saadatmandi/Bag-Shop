import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-2xl lg:text-3xl font-light tracking-wider mb-4">
          Stay in Touch
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          Sign up and enjoy 15% off your first order
        </p>
        <p className="text-xs text-gray-400 mb-8">
          Always be first to hear about new launches, events and exclusive offers
        </p>

        {subscribed ? (
          <div className="py-4">
            <p className="text-sm tracking-wide text-green-800">
              ✓ Thank you for subscribing
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 text-sm outline-none focus:border-black transition-colors bg-white"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
