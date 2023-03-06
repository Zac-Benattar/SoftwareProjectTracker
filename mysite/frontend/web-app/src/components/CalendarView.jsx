// Sample events calendar build, explained and detailed over at
// https://justacoding.blog/react-calendar-component-example-with-events/
import React, {ReactDOM} from 'react';
import "./CalandarView.css"; 


const { useState, useEffect, Fragment } = React

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



// I'm using default <input type="datepick-local">,
// so a specific date format is required



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
          {"<-"} {MONTHS[date.getMonth() == 0 ? 11 : date.getMonth() - 1]}
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

      <button href="javascript:;" onClick={() => {
				setViewingEvent(null)
				setShowingEventForm({ visible: true, withEvent: event })
       }}>
        Change this event
      </button>
      
      <button className="red" href="javascript:;" onClick={() => deleteEvent(event)}>
        Delete this event
      </button>

      <a className="close" href="javascript:;" onClick={() => setViewingEvent(null)}>Back to calendar</a>
    </Modal>
  )
}

// Form to add new events or edit existing events
// In a real implementation, we'd have some frontend
// validation and also the equivalent in our 
// backend service...


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
            className={`cell ${date.date.getTime() == currentDate.getTime() ? "current" : ""} ${date.date.getMonth() != actualDate.getMonth() ? "otherMonth" : ""}`
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
  	// You could retrieve fresh events data here
    // So whenever the calendar month is toggled,
    // make a request and populate `events` with the
    // new results
    
    // Would be better to cache these results so you
    // don't make needless network requests
    // So you could maintain an array of `date`s
    // and simply consult this before you fire off
    // any new network requests
  	console.log("Date has changed... Let's load some fresh data")
  }, [date])

 

  const deleteEvent = (event) => {
    setIsLoading(true)
    setViewingEvent(null)

    setTimeout(() => {
      const updatedEvents = [...events].filter(finalEvent => finalEvent.id != event.id)
      
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

     
    </div>
  )
}

export const CalendarView = () =>{
return(
<>
<Calendar 
    month={3} 
    year={2023} 
    preloadedEvents={[
      {
        id: 1,
        name: "Holiday",
        dateFrom: "2021-09-29T12:00",
        dateTo: "2021-10-03T08:45",
        meta: SAMPLE_META,
        type: "Holiday"
      },
      {
        id: 2,
        name: "Meeting",
        dateFrom: "2021-10-01T09:45",
        dateTo: "2021-10-04T22:00",
        meta: SAMPLE_META,
        type: "Standard"
      },
      {
        id: 3,
        name: "Away",
        dateFrom: "2021-10-01T01:00",
        dateTo: "2021-10-01T23:59",
        meta: SAMPLE_META,
        type: "Busy"
      },
      {
        id: 4,
        name: "Inspection",
        dateFrom: "2021-10-19T07:30",
        dateTo: "2021-10-21T23:59",
        meta: SAMPLE_META,
        type: "Standard"
      },
      {
        id: 5,
        name: "Holiday - Greece",
        dateFrom: "2021-10-14T08:00",
        dateTo: "2021-10-16T23:59",
        meta: SAMPLE_META,
        type: "Holiday"
      },
      {
        id: 6,
        name: "Holiday - Spain",
        dateFrom: "2021-10-29T08:00",
        dateTo: "2021-10-31T23:59",
        meta: SAMPLE_META,
        type: "Holiday"
      }
    ]} 
  />
  </>
)
}
export default CalendarView;