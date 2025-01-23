import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">KisnamMitra AI</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#disease-detection" className="text-gray-700 hover:text-green-600 dark:text-gray-300">Disease Detection</a>
            <a href="#weather" className="text-gray-700 hover:text-green-600 dark:text-gray-300">Weather</a>
            <a href="#learning" className="text-gray-700 hover:text-green-600 dark:text-gray-300">Learning</a>
            <a href="#emergency" className="text-gray-700 hover:text-green-600 dark:text-gray-300">Emergency</a>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#disease-detection" className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100">Disease Detection</a>
            <a href="#weather" className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100">Weather</a>
            <a href="#learning" className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100">Learning</a>
            <a href="#emergency" className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100">Emergency</a>
          </div>
        </div>
      )}
    </nav>
  );
}