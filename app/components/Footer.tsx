"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white mt-12">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 - About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Dummy data about company mission</li>
            <li>Our story and values</li>
            <li>Team and careers</li>
          </ul>
        </div>

        {/* Column 2 - Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Web Development</li>
            <li>Mobile Apps</li>
            <li>Cloud Solutions</li>
          </ul>
        </div>

        {/* Column 3 - Other Products */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Other Products</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Product A</li>
            <li>Product B</li>
            <li>Product C</li>
          </ul>
        </div>

        {/* Column 4 - Features */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Features and Why?</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Scalable and reliable</li>
            <li>User-friendly design</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-blue-800">
        <p className="text-center text-gray-400 text-sm py-4">
          © 2025 Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
