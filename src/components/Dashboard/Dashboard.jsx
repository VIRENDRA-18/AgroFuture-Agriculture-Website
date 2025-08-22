// src/components/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadialBarChart, RadialBar, BarChart, Bar, Legend
} from "recharts";

const soilHistory = [
  { month: "Jan", ph: 6.4, moisture: 52 },
  { month: "Feb", ph: 6.6, moisture: 55 },
  { month: "Mar", ph: 6.7, moisture: 58 },
  { month: "Apr", ph: 6.8, moisture: 60 },
  { month: "May", ph: 6.9, moisture: 62 },
];

const weatherForecast = [
  { day: "Mon", temp: 28, humidity: 64 },
  { day: "Tue", temp: 30, humidity: 60 },
  { day: "Wed", temp: 31, humidity: 58 },
  { day: "Thu", temp: 29, humidity: 66 },
  { day: "Fri", temp: 27, humidity: 70 },
];

const yieldPrediction = [
  { crop: "Wheat", yield: 3.1 },
  { crop: "Rice", yield: 4.2 },
  { crop: "Maize", yield: 3.7 },
  { crop: "Mustard", yield: 2.6 },
];

const fertilityScore = [{ name: "Fertility", value: 82, fill: "#16a34a" }];

const Card = ({ title, children }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-xl p-6"
  >
    <div className="text-sm text-gray-500 mb-2">{title}</div>
    {children}
  </motion.div>
);

export default function Dashboard() {
  return (
    <section className="py-20 bg-gray-50" id="dashboard">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800">Farmer Dashboard</h2>
          <p className="text-gray-600">Soil history, weather forecasts & yield predictions at a glance.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Fertility radial */}
          <Card title="Soil Fertility Score">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={fertilityScore} startAngle={90} endAngle={-270}>
                  <RadialBar minAngle={15} dataKey="value" clockWise />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-center -mt-8">
                <div className="text-3xl font-bold text-green-700">82%</div>
                <div className="text-xs text-gray-500">Healthy</div>
              </div>
            </div>
          </Card>

          {/* Soil history line */}
          <Card title="Soil pH & Moisture (Last 5 Months)">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="moisture" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Weather forecast */}
          <Card title="5-Day Weather Forecast">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Yield prediction bar */}
          <Card title="Predicted Yield (tons/ha)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldPrediction} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Notes / Tips */}
          <Card title="Farming Tips">
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Maintain pH between 6.5–7.0 for optimal nutrient availability.</li>
              <li>• Schedule irrigation when soil moisture drops below 50%.</li>
              <li>• Rotate crops annually to improve soil structure and fertility.</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
