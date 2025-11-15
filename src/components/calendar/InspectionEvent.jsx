import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";

Modal.setAppElement("#root");

const InspectionEvent = ({ isOpen, closeModal, date, addEvent }) => {
  const [title, setTitle] = useState("");
  const [inspectors, setInspectors] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [riskLevel, setRiskLevel] = useState("Low");

  const handleSubmit = () => {
    if (!title) return alert("Title is required");

    const start = new Date(date);
    const end = new Date(date);

    const [sh, sm] = startTime.split(":");
    const [eh, em] = endTime.split(":");

    start.setHours(sh, sm);
    end.setHours(eh, em);

    addEvent({
      title: `${title} (${inspectors})`,
      start: start.toISOString(),
      end: end.toISOString(),
      extendedProps: { inspectors, riskLevel },
    });

    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal-wrapper">
      <div className="modal-header">
        <h3>New Inspection Event</h3>
        <button className="close-btn" onClick={closeModal}>×</button>
      </div>

      <div className="modal-body">
        <label>Inspection Title</label>
        <input
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Inspector(s)</label>
        <input
          className="modal-input"
          value={inspectors}
          onChange={(e) => setInspectors(e.target.value)}
          placeholder="Ali, John"
        />

        <div className="time-row">
          <div>
            <label>Start Time</label>
            <input
              type="time"
              className="modal-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              type="time"
              className="modal-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <label>Risk Level</label>
        <select
          className="modal-input"
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="modal-footer">
        <button className="modal-btn primary" onClick={handleSubmit}>Add Event</button>
        <button className="modal-btn secondary" onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default InspectionEvent;
