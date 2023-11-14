import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

const FeaturedEvents = () => {
  const featuredEventsStyle = {
    margin: 0, // Remove margin
    padding: 0, // Remove padding
    height: "130vh",
  };

  return (
    <section className="featured-events" style={featuredEventsStyle}>
      <h2 className="text-center my-4">Featured Events</h2>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/901964/pexels-photo-901964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=600&dpr=2"
            alt="Event 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/5945809/pexels-photo-5945809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=600&dpr=2"
            alt="Event 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/8761329/pexels-photo-8761329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=600&dpr=2"
            alt="Event 3"
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default FeaturedEvents;
