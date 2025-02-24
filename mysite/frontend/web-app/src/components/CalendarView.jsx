import React, { useState, useEffect, Fragment } from 'react';
import './Calendar.css';
// Some config for convenience
const MOCK_LOADING_TIME = 1000
const SAMPLE_META = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

// Utilities/helpers
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const toStartOfDay = (date) => {
	const newDate = new Date(date)
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  newDate.setMilliseconds(0)
  return newDate
}

const pad = (input) => {
	return input < 10 ? "0" + input : input
}

// I'm using default <input type="datepick-local">,
// so a specific date format is required
const dateToInputFormat = (date) => {
	if (!date) {
  	return null
  }
  
	const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  
  return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`
}


// Could be used to filter out invalid events data also
// (ie. missing properties) or events that can't be parsed 
// to contain valid to/from dates
const parseEvents = (events) => {
  return events.map(event => {
  	const from = new Date(event.dateFrom)
    const to = new Date(event.dateTo)

    return {
      ...event,
      from,
      to
    }
  })
}

const findEventsForDate = (events, date) => {
	const dateTime = date.getTime()

  return events.filter(event => {
    const eventFromTime = toStartOfDay(event.from).getTime()
    const eventToTime = toStartOfDay(event.to).getTime()

    return (dateTime >= eventFromTime && dateTime <= eventToTime)
  })
}

// Top bar, contains the month/year combo as well as back/forward links
const Navigation = ({ date, setDate, setShowingEventForm }) => {
  return (
    <div className="navigation">
      <div className="back" onClick={() => {
          const newDate = new Date(date)
          newDate.setMonth(newDate.getMonth() - 1)
          setDate(newDate)
        }}>
          {"<-"} {MONTHS[date.getMonth() === 0 ? 11 : date.getMonth() - 1]}
      </div>

      <div className="monthAndYear">
        {MONTHS[date.getMonth()]} {date.getFullYear()}
        <a href="javascript:;" onClick={() => setShowingEventForm({ visible: true })}>+</a>
      </div>

      <div className="forward" onClick={() => {
          const newDate = new Date(date)
          newDate.setMonth(newDate.getMonth() + 1)
          setDate(newDate)
        }}>
          {MONTHS[date.getMonth() == 11 ? 0 : date.getMonth() + 1]} {"->"}
      </div>
    </div>
  )
}

// Week day headers: Mon, Tue, Wed etc
const DayLabels = () => {
  return DAYS_SHORT.map((dayLabel, index) => {
    return <div className="dayLabel cell" key={index}>{dayLabel}</div>
  })
}

// An individual event displayed within the calendar grid itself
// can be clicked to open the main event view
const MiniEvent = ({ event, setViewingEvent }) => {
  return (
    <div 
      className={`miniEvent ${event.type ? event.type.toLowerCase() : "standard"}`} 
      onClick={() => setViewingEvent(event)}>
      {event.name}
    </div>
  )
}

// The main event view, opens in a modal and contains all information
// about the event in question
const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent }) => {
  return (
    <Modal onClose={() => setViewingEvent(null)} title={`${event.name} (${event.type})`} className="eventModal">
      <p>From <b>{event.dateFrom}</b> to <b>{event.dateTo}</b></p>
      <p>{event.meta}</p>

      <button onClick={() => {
				setViewingEvent(null)
				setShowingEventForm({ visible: true, withEvent: event })
       }}>
        Change this event
      </button>
      
      <button className="red" onClick={() => deleteEvent(event)}>
        Delete this event
      </button>

      <p className="close" onClick={() => setViewingEvent(null)}>Back to calendar</p>
    </Modal>
  )
}

// Form to add new events or edit existing events
// In a real implementation, we'd have some frontend
// validation and also the equivalent in our 
// backend service...
const EventForm = ({ setShowingEventForm, addEvent, editEvent, withEvent, setViewingEvent, preselectedDate }) => {
  const newEvent = withEvent || {}
  if (!withEvent && !!preselectedDate) {
    newEvent.dateFrom = dateToInputFormat(preselectedDate)
  }
  const [event, setEvent] = useState(newEvent)

  return (
    <Modal onClose={() => setShowingEventForm({ visible: false })} title={`${withEvent ? "Edit event" : "Add a new event"}`}>
      <div className="form">
        <label>Name
          <input type="text" placeholder="ie. Weekly Meeting" defaultValue={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
        </label>

        <label>Date from
          <input type="datetime-local" defaultValue={event.dateFrom || dateToInputFormat(preselectedDate)} onChange={(e) => setEvent({ ...event, dateFrom: e.target.value })} />
        </label>

        <label>Date to
          <input type="datetime-local" defaultValue={event.dateTo} onChange={(e) => setEvent({ ...event, dateTo: e.target.value })} />
        </label>
        <label>Description
        <input type="text" placeholder="ie. Weekly meeting to discuss project progress" defaultValue={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
        </label>
        {withEvent ? (
        	<Fragment>
            <button onClick={() => editEvent(event)}>Edit event</button>
            <p className="close" onClick={() => {
            	setShowingEventForm({ visible: false })
            	setViewingEvent(event)}
            }>
              Cancel (go back to event view)
            </p>
          </Fragment>
        ) : (
        	<Fragment>
            <button onClick={() => addEvent(event)}>Add event to calendar</button>
            <p className="close" onClick={() => setShowingEventForm({ visible: false })}>Cancel (go back to calendar)</p>
          </Fragment>
        )}
      </div>
    </Modal>
  )
}

// Generic component - modal to present children within
const Modal = ({ children, onClose, title, className }) => {
  return (
    <Fragment>
      <div className="overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <h3>{title}</h3>
        <div className="inner">
          {children}
        </div>
      </div>
    </Fragment>
  )
}

// Generic component - a nicely animated loading spinner
const Loader = () => {
  return (
    <Fragment>
      <div className="overlay" />
      <div className="loader">
        <div className="lds-roller">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>  
        </div>
      </div>
    </Fragment>
  )
}

// Generic component - simple feedback after an action has taken place
const Feedback = ({ message, type }) => {
  return (
    <div className={`feedback ${type}`}>{message}</div>
  )
}

// The grid of days, renders a month's worth of days and
// also populates the events on the relevant dates
const Grid = ({ date, events, setViewingEvent, setShowingEventForm, actualDate }) => {
  const ROWS_COUNT = 6
  const currentDate = toStartOfDay(new Date())

	// Finds the closest Monday relative to the first day of
  // the target month/year combination
  // Then increment upon this day until we have a full set
  // of date objects to work with
  const startingDate = new Date(date.getFullYear(), date.getMonth(), 1)
  startingDate.setDate(startingDate.getDate() - (startingDate.getDay() - 1))

  const dates = []
  for (let i = 0; i < (ROWS_COUNT * 7); i++) {
    const date = new Date(startingDate)
    dates.push({ date, events: findEventsForDate(events, date) })
    startingDate.setDate(startingDate.getDate() + 1)
  }

  return (
    <Fragment>
      {dates.map((date, index) => {
        return (
          <div 
            key={index}
            className={`cell ${date.date.getTime() === currentDate.getTime() ? "current" : ""} ${date.date.getMonth() !== actualDate.getMonth() ? "otherMonth" : ""}`
						}>
            <div className="date">
              {date.date.getDate()}<a href="javascript:;" className="addEventOnDay" onClick={() => setShowingEventForm({ visible: true, preselectedDate: date.date })}>+</a>
            </div>
            {date.events.map((event, index) => 
							<MiniEvent key={index} event={event} setViewingEvent={setViewingEvent} />
						)}
          </div>
        )
      })}
    </Fragment>
  )
}

// The "main" component, our actual calendar
const Calendar = ({ month, year, preloadedEvents = [] }) => {

  const selectedDate = new Date(year, month - 1)

  const [date, setDate] = useState(selectedDate)
  const [viewingEvent, setViewingEvent] = useState(false)
  const [showingEventForm, setShowingEventForm] = useState({ visible: false })
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState()

  const parsedEvents = parseEvents(preloadedEvents)
  const [events, setEvents] = useState(parsedEvents)
  
  useEffect(() => {
  	console.log("Date changed. Reloading")
  }, [date])

  const addEvent = (event) => {
    setIsLoading(true)
    setShowingEventForm({ visible: false })

    setTimeout(() => {
      const parsedEvents = parseEvents([event])
      
      const updatedEvents = [...events]
      updatedEvents.push(parsedEvents[0])

      setEvents(updatedEvents)
      setIsLoading(false)
      showFeedback({ message: "Event created successfully", type: "success" })
    }, MOCK_LOADING_TIME)
  }

  const editEvent = (event) => {
    setIsLoading(true)
    setShowingEventForm({ visible: false })

    setTimeout(() => {
      const parsedEvent = parseEvents([event])
      
      const updatedEvents = [...events].map(updatedEvent => {
        return updatedEvent.id === event.id ? parsedEvent[0] : updatedEvent
      })

      setEvents(updatedEvents)
      setIsLoading(false)
      showFeedback({ message: "Event edited successfully", type: "success" })
    }, MOCK_LOADING_TIME)
  }

  const deleteEvent = (event) => {
    setIsLoading(true)
    setViewingEvent(null)

    setTimeout(() => {
      const updatedEvents = [...events].filter(finalEvent => finalEvent.id !== event.id)
      
      setEvents(updatedEvents)
      setIsLoading(false)
      showFeedback({ message: "Event deleted successfully", type: "success" })
    }, MOCK_LOADING_TIME)
  }

  const showFeedback = ({ message, type, timeout = 2500 }) => {
    setFeedback({ message, type })
    setTimeout(() => {
      setFeedback(null)
    }, timeout)
  }

  return (
    <div className="calendar">
      {isLoading && <Loader />}

      {feedback && 
      	<Feedback 
          message={feedback.message} 
          type={feedback.type} 
         />
       }

      <Navigation 
        date={date} 
        setDate={setDate} 
        setShowingEventForm={setShowingEventForm} 
      />

      <DayLabels />

      <Grid
        date={date}
        events={events}
        setShowingEventForm={setShowingEventForm} 
        setViewingEvent={setViewingEvent} 
        actualDate={date}
      />

      {viewingEvent && 
        <Event 
          event={viewingEvent} 
          setShowingEventForm={setShowingEventForm}
          setViewingEvent={setViewingEvent} 
          deleteEvent={deleteEvent} 
        />
      }

      {showingEventForm && showingEventForm.visible &&
        <EventForm 
          withEvent={showingEventForm.withEvent}
          preselectedDate={showingEventForm.preselectedDate}
          setShowingEventForm={setShowingEventForm} 
          addEvent={addEvent}
          editEvent={editEvent}
          setViewingEvent={setViewingEvent}
        />
      }
    </div>
  )
}

export const CalendarView = () =>
{
  //get meetings from database
  //need name, start date + end date, meta=description, type enables colour categorisation
  //add type field to database? 
  const d = new Date();
  let thismonth = d.getMonth() + 1;
  let thisyear = d.getFullYear();
  const meetings = [
    {
      id: 1,
      name: "Design",
      dateFrom: "2023-02-29T12:00",
      dateTo: "2023-03-03T08:45",
      meta: SAMPLE_META,
      type: "Design"
    },
    {
      id: 2,
      name: "Client",
      dateFrom: "2023-03-01T09:45",
      dateTo: "2023-03-04T22:00",
      meta: SAMPLE_META,
      type: "Client"
    },
    {
      id: 3,
      name: "Weekly",
      dateFrom: "2023-03-01T01:00",
      dateTo: "2023-03-01T23:59",
      meta: SAMPLE_META,
      type: "Weekly"
    },
    {
      id: 4,
      name: "Inspection",
      dateFrom: "2023-03-19T07:30",
      dateTo: "2023-03-21T23:59",
      meta: SAMPLE_META,
      type: "Standard"
    },
    {
      id: 5,
      name: "Holiday",
      dateFrom: "2023-03-14T08:00",
      dateTo: "2023-03-16T23:59",
      meta: SAMPLE_META,
      type: "Holiday"
    },
    {
      id: 6,
      name: "Business",
      dateFrom: "2023-03-29T08:00",
      dateTo: "2023-03-31T23:59",
      meta: SAMPLE_META,
      type: "Business"
    },
    {
      id: 7,
      name: "Weekly",
      dateFrom: "2023-03-08T01:00",
      dateTo: "2023-03-08T23:59",
      meta: SAMPLE_META,
      type: "Weekly"
    },
    {
      id: 8,
      name: "Weekly",
      dateFrom: "2023-03-15T01:00",
      dateTo: "2023-03-15T23:59",
      meta: SAMPLE_META,
      type: "Weekly"
    },
    {
      id: 9,
      name: "Weekly",
      dateFrom: "2023-03-22T01:00",
      dateTo: "2023-03-22T23:59",
      meta: SAMPLE_META,
      type: "Weekly"
    }
  ]
  return(
  <Calendar 
    month={thismonth} 
    year={thisyear} 
    preloadedEvents={meetings} 
  />
  )
}

export default CalendarView;