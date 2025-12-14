import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Plus, Trash2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    place: '',
    address: '',
    password: '',
    emergencyContacts: [{ name: '', phone: '' }]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...formData.emergencyContacts];
    newContacts[index][field] = value;
    setFormData({ ...formData, emergencyContacts: newContacts });
  };

  const addContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, { name: '', phone: '' }]
    });
  };

  const removeContact = (index) => {
    setFormData({
      ...formData,
      emergencyContacts: formData.emergencyContacts.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
    navigate('/vehicle');
  };

  return (
    <div className="auth-container flex items-center justify-center min-h-screen px-4">
      <div className="auth-card w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-md">
              <Shield size={28} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-primary">Create Account</h2>
          <p className="text-sm text-muted mt-1">Join SafeX — drive smart, stay protected</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input py-3"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input py-3"
                placeholder="john@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-input py-3"
                placeholder="+1 234 567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Place */}
          <div className="form-group">
            <label className="form-label">City / Place</label>
            <input
              type="text"
              name="place"
              className="form-input py-3"
              placeholder="New York"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label">Full Address</label>
            <textarea
              name="address"
              rows="3"
              className="form-input py-3 resize-none"
              placeholder="123 Safety St, Apt 4B"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input py-3"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Emergency Contacts Section */}
          <div className="p-4 rounded-xl bg-gray-50 shadow-inner border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-primary">Emergency Contacts</h3>
              <button
                type="button"
                onClick={addContact}
                className="px-3 py-1 rounded-full bg-teal-600 text-white text-xs flex items-center gap-1 shadow-sm hover:bg-teal-700"
              >
                <Plus size={12} /> Add
              </button>
            </div>

            {formData.emergencyContacts.map((c, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-input text-sm py-2"
                  value={c.name}
                  onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  className="form-input text-sm py-2"
                  value={c.phone}
                  onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                  required
                />

                {formData.emergencyContacts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContact(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3 mt-6 font-semibold rounded-xl shadow-md hover:shadow-lg"
          >
            Create Account & Continue
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-7 pt-6 border-t border-gray-200">
          <p className="text-sm text-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-800">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
