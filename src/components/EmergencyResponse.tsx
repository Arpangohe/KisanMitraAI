import React from 'react';
import { Phone, MessageSquare, Users, Bot } from 'lucide-react';
import type { Expert } from '../types';

const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Plant Pathology',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    specialization: 'Soil Science',
    available: false,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  }
];

export function EmergencyResponse() {
  return (
    <section id="emergency" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Emergency Response</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">Emergency Contacts</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium">Agricultural Emergency Hotline</p>
                    <p className="text-red-600 text-lg font-bold">1-800-FARM-HELP</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bot className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium">24/7 AI Chatbot Support</p>
                    <button className="text-white bg-red-600 px-4 py-2 rounded-lg mt-2 hover:bg-red-700">
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  <span>2,145 farmers online</span>
                </div>
                <button className="flex items-center text-green-600 hover:text-green-700">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  Join Discussion
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Available Experts</h3>
            <div className="space-y-6">
              {experts.map(expert => (
                <div key={expert.id} className="flex items-center space-x-4">
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{expert.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{expert.specialization}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full ${
                      expert.available ? 'bg-green-500' : 'bg-gray-400'
                    } mr-2`}></span>
                    <button className={`px-4 py-2 rounded-lg ${
                      expert.available
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}>
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}