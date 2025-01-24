import React from 'react';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">AgroAI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#disease-detection" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-500 transition-colors">
              Disease Detection
            </a>
            <a href="#weather" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-500 transition-colors">
              Weather
            </a>
            <a href="#learning" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-500 transition-colors">
              Learning
            </a>
            <a href="#emergency" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-500 transition-colors">
              Emergency
            </a>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? 
                <Sun className="h-5 w-5 text-yellow-500" /> : 
                <Moon className="h-5 w-5 text-gray-600" />
              }
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
              aria-label="Toggle theme"
            >
              {isDark ? 
                <Sun className="h-5 w-5 text-yellow-500" /> : 
                <Moon className="h-5 w-5 text-gray-600" />
              }
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? 
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" /> : 
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <a
              href="#disease-detection"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-500 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Disease Detection
            </a>
            <a
              href="#weather"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-500 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Weather
            </a>
            <a
              href="#learning"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-500 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Learning
            </a>
            <a
              href="#emergency"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-500 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Emergency
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}