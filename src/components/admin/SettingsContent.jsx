import React, { useState } from 'react';
import { Settings, Truck, DollarSign, Bell, Users, Key, AlertCircle, CheckCircle } from 'lucide-react';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';

export default function SettingsContent() {
  const { user } = useAuth();
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (!user || !user.id) {
      setMessage({ type: 'error', text: 'User not authenticated. Please login again.' });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${URL}/api/user/${user.id}/change-password`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your store settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            {[
              { id: 'general', label: 'General', icon: Settings },
              { id: 'changePassword', label: 'Change Password', icon: Key },
              { id: 'shipping', label: 'Shipping', icon: Truck },
              { id: 'payments', label: 'Payments', icon: DollarSign },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'users', label: 'Users & Permissions', icon: Users }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSettingsTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSettingsTab === item.id
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {activeSettingsTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
                    <input
                      type="email"
                      defaultValue="support@hopg.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                    <textarea
                      rows="3"
                      defaultValue="Home of protein goodies is a hub for all healthy goodies. Fuel your fitness journey with premium supplements."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === 'changePassword' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
                <p className="text-sm text-gray-600 mb-6">Change your admin account password</p>

                {message.text && (
                  <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${
                    message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>{message.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Changing Password...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
