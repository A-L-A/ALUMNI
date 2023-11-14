import React, { Component } from "react";
import axios from "axios";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: "",
      date: "",
      time: "",
      category: "campus", // Default category
      description: "",
      isEditing: false,
      editIndex: null,
      formErrors: {
        title: "",
        date: "",
        time: "",
      },
    };
    this.createEditEventsRef = React.createRef();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { title, date, time } = this.state;
    let formErrors = {
      title: "",
      date: "",
      time: "",
    };
    let isValid = true;

    // Validate title
    if (!title.trim()) {
      formErrors.title = "Title is required";
      isValid = false;
    }

    // Validate date
    if (!date) {
      formErrors.date = "Date is required";
      isValid = false;
    }

    // Validate time
    if (!time) {
      formErrors.time = "Time is required";
      isValid = false;
    }

    this.setState({ formErrors });
    return isValid;
  };

  async componentDidMount() {
    await this.fetchEvents();
  }

  fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      const events = response.data;
      this.setState({ events });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  addEvent = async () => {
    if (!this.validateForm()) {
      return;
    }

    const { title, date, time, category, description, isEditing, editIndex } =
      this.state;

    const event = {
      title,
      date,
      time,
      category,
      description,
    };

    try {
      let response;

      if (isEditing) {
        response = await axios.put(
          `http://localhost:3000/events/${this.state.events[editIndex]._id}`,
          event
        );
      } else {
        response = await axios.post("http://localhost:3000/events", event);
      }

      const updatedEvents = response.data;

      this.setState({
        events: updatedEvents,
        title: "",
        date: "",
        time: "",
        category: "professional",
        description: "",
        isEditing: false,
        editIndex: null,
        formErrors: {
          title: "",
          date: "",
          time: "",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }

    // Fetch updated events after adding/updating an event
    await this.fetchEvents();
  };

  editEvent = (index) => {
    const { events } = this.state;
    const { title, date, time, category, description } = events[index];
    this.setState({
      title,
      date,
      time,
      category,
      description,
      isEditing: true,
      editIndex: index,
      formErrors: {
        title: "",
        date: "",
        time: "",
      },
    });
  };

  updateEvent = async () => {
    const { title, date, time, category, description, events, editIndex } =
      this.state;

    const updatedEvent = {
      title,
      date,
      time,
      category,
      description,
    };

    try {
      const eventId = events[editIndex]._id; // Get the ID of the event being edited

      // Update the event in the database
      await axios.put(`http://localhost:3000/events/${eventId}`, updatedEvent);

      // Update the event in the original events array
      const updatedEvents = events.map((event, index) =>
        index === editIndex ? { ...updatedEvent, _id: eventId } : event
      );

      // Update the UI state with the new events array
      this.setState({
        events: updatedEvents,
        title: "",
        date: "",
        time: "",
        category: "professional",
        description: "",
        isEditing: false,
        editIndex: null,
        formErrors: {
          title: "",
          date: "",
          time: "",
        },
      });

      console.log("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  deleteEvent = async (index) => {
    try {
      await axios.delete(
        `http://localhost:3000/events/${this.state.events[index]._id}`
      );

      // Update the events state after deleting an event
      const updatedEvents = [...this.state.events];
      updatedEvents.splice(index, 1);

      this.setState({ events: updatedEvents });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  scrollToCreateEditEvents = () => {
    if (this.createEditEventsRef.current) {
      this.createEditEventsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    const {
      title,
      date,
      time,
      category,
      description,
      events,
      isEditing,
      formErrors,
    } = this.state;

    // Check if events is an array before mapping
    const eventsToRender = Array.isArray(events) ? events : [];

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">All Events</h2>
        <div className="row mb-4">
          {eventsToRender.map((event, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                    <br />
                    <strong>Time:</strong> {event.time}
                    <br />
                    <strong>Category:</strong> {event.category}
                    <br />
                    {event.description.length > 50
                      ? `${event.description.slice(0, 50)}...`
                      : event.description}
                  </p>
                  <button
                    onClick={() => {
                      this.editEvent(index);
                      this.scrollToCreateEditEvents(); // Scroll to Create/Edit Events
                    }}
                    className="btn btn-secondary mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => this.deleteEvent(index)}
                    className="btn btn-secondary">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Create/Edit Events section with the ref and margin */}
        <div ref={this.createEditEventsRef} style={{ marginBottom: "2rem" }}>
          <h2 className="text-center mt-4">Create/Edit Events</h2>
          <form>
            <div className="mb-3">
              <label>
                Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.handleInputChange}
                className={`form-control ${
                  formErrors.title ? "is-invalid" : ""
                }`}
              />
              {formErrors.title && (
                <div className="invalid-feedback">{formErrors.title}</div>
              )}
            </div>
            <div className="mb-3">
              <label>
                Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={this.handleInputChange}
                className={`form-control ${
                  formErrors.date ? "is-invalid" : ""
                }`}
              />
              {formErrors.date && (
                <div className="invalid-feedback">{formErrors.date}</div>
              )}
            </div>
            <div className="mb-3">
              <label>
                Time <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                name="time"
                value={time}
                onChange={this.handleInputChange}
                className={`form-control ${
                  formErrors.time ? "is-invalid" : ""
                }`}
              />
              {formErrors.time && (
                <div className="invalid-feedback">{formErrors.time}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Category</label>
              <select
                name="category"
                value={category}
                onChange={this.handleInputChange}
                className="form-control">
                <option value="professional">Professional</option>
                <option value="networking">Networking</option>
                <option value="campus">Campus</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                value={description}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <button
              type="button"
              onClick={isEditing ? this.updateEvent : this.addEvent}
              className="btn btn-secondary btn-block">
              {isEditing ? "Update Event" : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EventForm;
