import React from "react";
import FeaturedEvents from "../components/FeaturedEvents";
import EventForm from "../components/EventForm";

const Events = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <FeaturedEvents />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default Events;
