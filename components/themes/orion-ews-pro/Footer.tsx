
export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-500 py-8 border-t border-slate-900">
      <div className="container mx-auto px-6 text-center text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} Orion EWS Pro. Integrated Disaster Management System.</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>System Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Cloud Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
