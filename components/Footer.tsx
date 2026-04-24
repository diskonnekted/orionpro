type FooterProps = {
  colors?: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
};

export default function Footer({ colors }: FooterProps) {
  const footerStyle = colors ? { backgroundColor: colors.secondary, color: '#ffffff' } : {};
  const linkStyle = colors ? { color: '#ffffff', opacity: 0.8 } : {};

  return (
    <footer className="bg-gray-800 text-white mt-12 py-8 transition-colors duration-300" style={footerStyle}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4 text-sm list-none">
             {/* Placeholder for footer menu */}
        </div>
        <p>&copy; {new Date().getFullYear()} Orion CMS. Built by <a href="https://www.clasnet.co.id" target="_blank" className="text-blue-300 hover:text-blue-100 underline" style={linkStyle}>Clasnet</a></p>
      </div>
    </footer>
  );
}
