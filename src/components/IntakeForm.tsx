import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar as CalendarIcon, CheckCircle2, User, Mail, Phone, FileText } from 'lucide-react';

interface IntakeFormProps {
  onClose: () => void;
}

export default function IntakeForm({ onClose }: IntakeFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseDescription: '',
    preferredDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate Gravity Forms / Clio Grow API integration
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Simulate Calendar scheduling
      await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formData.preferredDate, name: formData.firstName })
      });

      setStep(3); // Success step
    } catch (error) {
      console.error('Submission failed', error);
      // Handle error natively in a real app
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></motion.div>

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-8 py-6 relative shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Case Evaluation &amp; Intake</h2>
          <p className="text-slate-300">Fill out this secure form to schedule a consultation. Information is synced directly to our secure Clio system.</p>
        </div>

        {/* Progress Bar */}
        {step < 3 && (
          <div className="h-1 bg-slate-100 shrink-0">
            <motion.div 
              className="h-full bg-blue-600" 
              initial={{ width: step === 1 ? '50%' : '100%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        )}

        {/* Body */}
        <div className="p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">1. Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><User className="w-4 h-4 text-slate-400"/> First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400"/> Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400"/> Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={!formData.firstName || !formData.lastName || !formData.email}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">2. Case Details &amp; Scheduling</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400"/> Brief Description of Your Legal Issue</label>
                  <textarea 
                    name="caseDescription" 
                    value={formData.caseDescription} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Please do not include highly sensitive information..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-slate-400"/> Preferred Consultation Date</label>
                  <input 
                    type="date" 
                    name="preferredDate" 
                    value={formData.preferredDate} 
                    onChange={handleChange} 
                    className="w-full md:w-1/2 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={handleBack} className="text-slate-600 px-4 py-2.5 font-medium hover:text-slate-900 transition-colors">
                  Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.caseDescription || !formData.preferredDate}
                  className="bg-slate-900 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> Submitting...</>
                  ) : (
                    'Submit & Schedule'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Consultation Scheduled</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8">
                Thank you, {formData.firstName}. Your information has been securely transmitted to our Clio CRM and your appointment is pending calendar sync. Our team will follow up via email shortly.
              </p>
              <button 
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
