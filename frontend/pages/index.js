import { useState, useEffect } from 'react';

export default function Home() {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesReps = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sales-reps');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSalesReps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalesReps();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salesReps.map((rep, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{rep.name}</h2>
            <p>Deals: {rep.deals.length}</p>
            <p>Skills: {rep.skills.join(', ')}</p>
            <p>Clients: {rep.clients.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
