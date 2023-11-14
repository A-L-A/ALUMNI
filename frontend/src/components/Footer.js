import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const yourName = "Lyse Arlette Aneze";

  const footerStyle = {
    backgroundColor: "#f2f2f2", 
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  return (
    <footer style={footerStyle} className="footer mt-5">
      <div className="container text-center">
        <span>
          &copy; {currentYear} {yourName}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
