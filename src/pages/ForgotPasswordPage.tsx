import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const { t } = useLanguage();
  const { requestPasswordReset, resetPassword } = useAuth();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await requestPasswordReset(email);
      setMessage(
        t(
          'Check browser console for reset token (in demo)',
          'রিসেট টোকেনের জন্য ব্রাউজার কনসোল চেক করুন (ডেমোতে)'
        )
      );
      setStep('reset');
    } catch (error: any) {
      setError(error.message || t('Failed to request reset', 'রিসেট অনুরোধ ব্যর্থ'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError(t('Passwords do not match', 'পাসওয়ার্ড মিলছে না'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('Password must be at least 6 characters', 'পাসওয়ার্ড কমপক্ষে 6 অক্ষর হতে হবে'));
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, token, newPassword);
      setMessage(
        t(
          'Password reset successful! Redirecting to login...',
          'পাসওয়ার্ড রিসেট সফল! লগইনে রিডাইরেক্ট করা হচ্ছে...'
        )
      );
      setTimeout(() => {
        onNavigate('patient-portal');
      }, 2000);
    } catch (error: any) {
      setError(error.message || t('Failed to reset password', 'পাসওয়ার্ড রিসেট ব্যর্থ'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <button
          onClick={() => onNavigate('patient-portal')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('Back to Login', 'লগইনে ফিরে যান')}
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'email' ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('Forgot Password?', 'পাসওয়ার্ড ভুলে গেছেন?')}
              </h1>
              <p className="text-gray-600 mb-8">
                {t(
                  'Enter your email to receive password reset instructions',
                  'পাসওয়ার্ড রিসেট নির্দেশাবলী পেতে আপনার ইমেইল লিখুন'
                )}
              </p>

              <form onSubmit={handleRequestReset} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                    {message}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    {t('Email Address', 'ইমেইল ঠিকানা')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={t('Enter your email', 'আপনার ইমেইল লিখুন')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-teal-600 transition font-semibold disabled:opacity-50"
                >
                  {loading
                    ? t('Sending...', 'পাঠানো হচ্ছে...')
                    : t('Send Reset Link', 'রিসেট লিংক পাঠান')}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  {t(
                    'Demo Mode: Check your browser console (F12) for the reset token',
                    'ডেমো মোড: রিসেট টোকেনের জন্য আপনার ব্রাউজার কনসোল (F12) চেক করুন'
                  )}
                </p>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('Reset Your Password', 'আপনার পাসওয়ার্ড রিসেট করুন')}
              </h1>
              <p className="text-gray-600 mb-8">
                {t('Enter the reset token and your new password', 'রিসেট টোকেন এবং আপনার নতুন পাসওয়ার্ড লিখুন')}
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800">{message}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Reset Token', 'রিসেট টোকেন')}
                  </label>
                  <input
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={t('Paste token from console', 'কনসোল থেকে টোকেন পেস্ট করুন')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('New Password', 'নতুন পাসওয়ার্ড')}
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={t('Enter new password', 'নতুন পাসওয়ার্ড লিখুন')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Confirm Password', 'পাসওয়ার্ড নিশ্চিত করুন')}
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={t('Confirm new password', 'নতুন পাসওয়ার্ড নিশ্চিত করুন')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-teal-600 transition font-semibold disabled:opacity-50"
                >
                  {loading
                    ? t('Resetting...', 'রিসেট করা হচ্ছে...')
                    : t('Reset Password', 'পাসওয়ার্ড রিসেট করুন')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
