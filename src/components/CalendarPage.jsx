// this code is mainly from https://github.com/jquense/react-big-calendar/blob/master/stories/demos/exampleCode/createEventWithNoOverlap.js
import { useState, useEffect, useMemo } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types';
import { fetchTrainings } from '../services/api';

const localizer = momentLocalizer(moment);

export default function CreateEventWithNoOverlap({
  dayLayoutAlgorithm = 'no-overlap',
}) {
  const [myEvents, setEvents] = useState([]);

  useEffect(() => {
    const fetchAndSetTrainings = () => {
      fetchTrainings()
        .then(data => {
          const trainings = data._embedded.trainings;
          return Promise.all(trainings.map(training => {
            return fetch(training._links.customer.href)
              .then(customerResponse => customerResponse.json())
              .then(customerData => ({
                title: `${training.activity} - ${customerData.firstname} ${customerData.lastname}`,
                start: new Date(training.date),
                end: new Date(new Date(training.date).getTime() + training.duration * 60000),
              }));
          }));
        })
        .then(events => {
          setEvents(events);
        })
        .catch(err => {
          console.error('Error fetching trainings:', err);
        });
    };

    fetchAndSetTrainings();
  }, []);

  const handleSelectEvent = useMemo(
    () => (event) => window.alert(event.title),[]
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <>
      <div className="height600" style={{ height: 600, width: '100%' }}>
        <Calendar
          dayLayoutAlgorithm={dayLayoutAlgorithm}
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          scrollToTime={scrollToTime}
        />
      </div>
    </>
  );
}

CreateEventWithNoOverlap.propTypes = {
  dayLayoutAlgorithm: PropTypes.string,
};