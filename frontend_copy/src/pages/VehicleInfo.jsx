import React, { useState } from 'react';
import { Car, Save } from 'lucide-react';

const VehicleInfo = () => {
  const [vehicleData, setVehicleData] = useState({
    carName: '',
    model: '',
    carNumber: '',
    licenseNumber: ''
  });

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vehicle data:', vehicleData);
    alert('Vehicle information saved successfully!');
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-6 py-10">
      <div className="glass card p-8 rounded-2xl shadow-lg border border-pastel-blue/40">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-teal-blue to-prussian-blue shadow-md">
              <Car size={34} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-1">
            Vehicle Information
          </h2>
          <p className="text-muted text-sm">
            Register your vehicle for health & safety monitoring
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="form-group">
            <label className="form-label">Car Name</label>
            <input
              type="text"
              name="carName"
              className="form-input"
              placeholder="Tesla Model 3"
              value={vehicleData.carName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Model Year</label>
            <input
              type="text"
              name="model"
              className="form-input"
              placeholder="2024"
              value={vehicleData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Car Number (Plate)</label>
            <input
              type="text"
              name="carNumber"
              className="form-input"
              placeholder="KA 01 AB 1234"
              value={vehicleData.carNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Driver's License Number</label>
            <input
              type="text"
              name="licenseNumber"
              className="form-input"
              placeholder="DL-123456789"
              value={vehicleData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 text-base font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Save size={18} />
            Save Vehicle Details
          </button>

        </form>
      </div>
    </div>
  );
};

export default VehicleInfo;
