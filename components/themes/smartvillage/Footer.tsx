export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-100 border-t border-emerald-800">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-xl text-white tracking-tight">Smart<span className="text-emerald-400">Village</span></span>
            </div>
            <p className="text-emerald-200/80 mb-6 max-w-sm">
              Empowering rural communities with smart agricultural technology and data-driven insights for a sustainable future.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/monitor" className="hover:text-white transition-colors">Live Monitor</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Project</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-emerald-200/80">
              <li>123 Village Road</li>
              <li>Green Valley, AG 12345</li>
              <li>contact@smartvillage.id</li>
              <li>+62 812 3456 7890</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-emerald-800 text-center text-sm text-emerald-400">
          &copy; {new Date().getFullYear()} SmartVillage Project. Powered by Orion Pro.
        </div>
      </div>
    </footer>
  );
}
