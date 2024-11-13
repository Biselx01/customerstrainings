// this code is mainly from https://recharts.org/en-US/examples/StackedBarChart and https://lodash.com/
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import { fetchTrainings } from '../services/api';

export default function Statistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrainings()
      .then(response => {
        const trainings = response._embedded.trainings;
        const groupedByActivity = _.groupBy(trainings, 'activity');
        const activityData = _.map(groupedByActivity, (trainings, activity) => ({
          name: activity,
          minutes: _.sumBy(trainings, 'duration'),
        }));

        setData(activityData);
      })
      .catch(error => {
        console.error('Error fetching trainings:', error);
      });
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}