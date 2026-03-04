import React, { useEffect, useState } from 'react';
import { api } from '../../config/apiConfig';

const Dashboard = () => {
  const [counts, setCounts] = useState({ products: 0, restaurants: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [prodRes, restRes] = await Promise.all([
          api.get('/api/v1/products'),
          api.get('/api/v1/restaurants'),
        ]);
        setCounts({
          products: Array.isArray(prodRes.data) ? prodRes.data.length : 0,
          restaurants: Array.isArray(restRes.data) ? restRes.data.length : 0,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard counts', err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <div className="text-lg font-bold">{counts.products}</div>
          <div className="text-sm text-gray-500">Products</div>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <div className="text-lg font-bold">{counts.restaurants}</div>
          <div className="text-sm text-gray-500">Restaurants</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;