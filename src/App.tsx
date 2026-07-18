import React, { useState } from 'react';
import { Scale, BookOpen, Clock, Calendar, MessageSquare, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ChatWidget from './components/ChatWidget';
import IntakeForm from './components/IntakeForm';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Harrison &amp; Wright
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Practice Areas</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Our Team</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Insights</a>
              <button 
                onClick={() => setShowIntakeModal(true)}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="relative bg-blue-900 text-white py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-blue-950/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Defending your rights with <span className="text-blue-300">integrity</span> and <span className="text-blue-300">experience</span>.
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
                We provide exceptional legal representation tailored to your unique situation. Our dedicated team is here to guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <button 
                  onClick={() => setShowIntakeModal(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg shadow-sm"
                >
                  Start Your Case Evaluation
                </button>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors text-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Ask Our AI Assistant
                </button>
              </div>
            </div>
            
            {/* Feature Callouts */}
            <div className="hidden lg:block w-80 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-medium mb-4 border-b border-white/10 pb-4 text-slate-50">Why Choose Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-blue-300"><BookOpen className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-medium text-slate-100">Decades of Precedent</h4>
                    <p className="text-sm text-blue-200 mt-1">Access to deep legal research and historical case data.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-blue-300"><Clock className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-medium text-slate-100">24/7 Response</h4>
                    <p className="text-sm text-blue-200 mt-1">Our AI intake system ensures you're heard immediately.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-blue-300"><PhoneCall className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-medium text-slate-100">Seamless Integration</h4>
                    <p className="text-sm text-blue-200 mt-1">Automated follow-ups synced with our Clio CRM.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <section className="py-20 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">Streamlined Legal Workflow</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <MessageSquare className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Automated FAQ &amp; Intake</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">Our intelligent agent answers common questions and collects initial details, integrating directly with Gravity Forms.</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Vector Database RAG</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">Retrieves relevant legal precedents instantly, improving document search efficiency and accuracy during consultations.</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Clio Grow &amp; Calendar Sync</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">Automatically schedules appointments and pushes lead data into Clio CRM for seamless follow-up emails and tracking.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Floating Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[90%] sm:w-[420px]"
          >
            <ChatWidget onClose={() => setIsChatOpen(false)} onOpenIntake={() => setShowIntakeModal(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-4 sm:right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Intake Modal */}
      <AnimatePresence>
        {showIntakeModal && (
          <IntakeForm onClose={() => setShowIntakeModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
