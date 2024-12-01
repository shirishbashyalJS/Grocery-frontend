import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  const handleGmail = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=shirisjbasjyal@gmail.com"
    );
  };

  return (
    <section className="footer">
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-body-secondary fs-2">
              © 2024 New Bashyal General Store
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex fs-2">
            <li className="ms-5">
              <a
                className="text-body-secondary"
                href="https://www.facebook.com/shirish.bashyal.5"
                target="_blank"
              >
                <FaFacebook className="text-dark" />
              </a>
            </li>
            <li className="ms-5">
              <div onClick={handleGmail} style={{ cursor: "pointer" }}>
                <SiGmail />
              </div>
            </li>
            <li className="ms-5">
              <a
                className="text-body-secondary"
                href="https://github.com/shirishbashyalJS?tab=repositories"
                target="_blank"
              >
                <FaGithub className="text-dark" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
};
