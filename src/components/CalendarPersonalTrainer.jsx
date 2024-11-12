// this code is mainly from https://github.com/jquense/react-big-calendar/blob/master/stories/demos/exampleCode/createEventWithNoOverlap.js
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { fetchTrainings } from '../services/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CreateEventWithNoOverlap({
  dayLayoutAlgorithm = 'no-overlap',
}) {
  const [myEvents, setEvents] = useState([]);

  useEffect(() => {
    const fetchAndSetTrainings = async () => {
      try {
        const data = await fetchTrainings();
        const trainings = data._embedded.trainings;
        const events = await Promise.all(trainings.map(async training => {
          const customerResponse = await fetch(training._links.customer.href);
          const customerData = await customerResponse.json();
          return {
            title: `${training.activity} - ${customerData.firstname} ${customerData.lastname}`,
            start: new Date(training.date),
            end: new Date(new Date(training.date).getTime() + training.duration * 60000),
          };
        }));
        setEvents(events);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    };

    fetchAndSetTrainings();
  }, []);

  const handleSelectEvent = useMemo(
    () => (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <div className="height600">
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
  );
}

CreateEventWithNoOverlap.propTypes = {
  dayLayoutAlgorithm: PropTypes.string,
};