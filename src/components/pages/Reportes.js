import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function Reportes() {
  let data = [
    {
      name: 'producto1',
      ventas: 890,
    },
    {
      name: 'producto2',
      ventas: 1200,
    },
    {
      name: 'producto3',
      ventas: 280,
    },
    {
      name: 'producto4',
      ventas: 890,
    },
    {
      name: 'producto5',
      ventas: 629,
    },
  ];
  return (
    <div>
      <h2>Top 5 sedes</h2>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ventas" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default Reportes;
