import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Left: Brand and copyright */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-bold text-white">HireOn</h1>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} HireOn. All rights reserved.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1DA1F2] hover:scale-110 transition-transform"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#0A66C2] hover:scale-110 transition-transform"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1877F2] hover:scale-110 transition-transform"
          >
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
