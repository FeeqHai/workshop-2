import React, { useState, useRef, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";

export default function InspectionCalendar() {
  const calendarRef = useRef(null); // <-- ref to FullCalendar instance

  const [view, setView] = useState("dayGridMonth");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [selectedInspector, setSelectedInspector] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  // Update height on window resize
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample events
  const events = useMemo(
    () => [
      {
        id: 1,
        title: "Inspection A",
        start: "2025-11-15T09:00",
        extendedProps: { inspector: "Inspector A", status: "pending" },
      },
      {
        id: 2,
        title: "Inspection B",
        start: "2025-11-16T14:00",
        extendedProps: { inspector: "Inspector B", status: "in-progress" },
      },
      {
        id: 3,
        title: "Inspection C",
        start: "2025-11-17T10:00",
        extendedProps: { inspector: "Inspector A", status: "completed" },
      },
    ],
    []
  );

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchInspector =
        selectedInspector === "all" || evt.extendedProps.inspector === selectedInspector;
      const matchStatus =
        selectedStatus === "all" || evt.extendedProps.status === selectedStatus;
      const matchDate =
        !selectedDate || evt.start.startsWith(selectedDate);
      return matchInspector && matchStatus && matchDate;
    });
  }, [events, selectedInspector, selectedStatus, selectedDate]);

  // Change view when dropdown changes
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) calendarApi.changeView(view);
  }, [view]);

  // Navigate to date when date input changes
  useEffect(() => {
    if (!selectedDate) return;
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) calendarApi.gotoDate(selectedDate);
  }, [selectedDate]);

  const toolbarHeight = 56;
  const calendarHeight = windowHeight - toolbarHeight;

  return (
    <div className="calendar-wrapper">
      {/* TOP TOOLBAR */}
      <div className="top-toolbar">
        <button
          className="btn"
          onClick={() => {
            setSelectedDate(new Date().toISOString().split("T")[0]);
          }}
        >
          Today
        </button>

        <select value={view} onChange={(e) => setView(e.target.value)} className="btn">
          <option value="dayGridMonth">Month</option>
          <option value="timeGridWeek">Week</option>
          <option value="timeGridDay">Day</option>
        </select>

        <input
          type="date"
          className="date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          className="btn"
          value={selectedInspector}
          onChange={(e) => setSelectedInspector(e.target.value)}
        >
          <option value="all">All Inspectors</option>
          <option value="Inspector A">Inspector A</option>
          <option value="Inspector B">Inspector B</option>
        </select>

        <select
          className="btn"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

         <div className="status-legend">
            <span className="legend-item pending">Pending</span>
            <span className="legend-item in-progress">In Progress</span>
            <span className="legend-item completed">Completed</span>
          </div>
      </div>

      {/* CALENDAR */}
      <div className="calendar-container" style={{ height: calendarHeight }}>
        <FullCalendar
          ref={calendarRef} // <-- attach ref
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={false}
          events={filteredEvents}
          height="100%"
           eventClassNames={(arg) => {
            // Use the status from extendedProps to assign a class
            const status = arg.event.extendedProps.status;
            return status ? [status] : [];
          }}
        />
      </div>
    </div>
  );
}
