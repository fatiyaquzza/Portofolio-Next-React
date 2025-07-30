import Form from "next/form";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Cform() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <div className="mx-auto min-h-screen bg-[#131320] flex flex-col">
      <div
        id="contact"
        className="flex-grow flex justify-center items-center px-4"
      >
        <div className="flex flex-col lg:flex-row bg-[#1C1C28] p-8 rounded-xl shadow-lg max-w-5xl w-full">
          {/* Left Section: Contact Info */}
          <div className="lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <h1 className="text-white font-semibold text-5xl mb-4">
              Let's Work <span className="text-[#6184DC]">Together</span>
            </h1>
            <p className="text-gray-400 mb-8">
              Please feel free to send me a message. I'll get in touch with you
              as soon as possible
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#6184DC] mr-3"
                >
                  <path
                    d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                fatiyaquzzaaa@gmail.com
              </div>
              {/* <div className="flex items-center text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#6184DC] mr-3"
                >
                  <path
                    d="M22 16.92V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V16.92C2 16.4022 2.15871 15.8956 2.46464 15.4859C2.77057 15.0762 3.19327 14.7818 3.666 14.636L7.334 13.525C7.80775 13.3792 8.28825 13.4862 8.71804 13.8291L11.536 16.035C11.8491 16.2796 12.2343 16.4034 12.625 16.4034C13.0157 16.4034 13.4009 16.2796 13.714 16.035L16.532 13.8291C16.9617 13.4862 17.4422 13.3792 17.916 13.525L21.584 14.636C22.0567 14.7818 22.4794 15.0762 22.7854 15.4859C23.0913 15.8956 23.25 16.4022 23.25 16.92V20Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                (246) 234 - 4643
              </div> */}
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="lg:w-1/2 pl-0 lg:pl-8">
            <Form action="/send-message" className="space-y-4">
              {/* Name and Email in one row */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex flex-col w-full sm:w-full">
                  <label htmlFor="name" className="text-gray-400 mb-1 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="bg-[#2D2D3A] border border-transparent text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#6010DD] placeholder-gray-500"
                    placeholder="Name"
                  />
                </div>
              </div>

              {/* Phone and Subject in one row */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex flex-col w-full sm:w-1/2">
                  <label
                    htmlFor="subject"
                    className="text-gray-400 mb-1 text-sm"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="bg-[#2D2D3A] border border-transparent text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#6010DD] placeholder-gray-500"
                    placeholder="(245) 245 - 1345"
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <label htmlFor="email" className="text-gray-400 mb-1 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="bg-[#2D2D3A] border border-transparent text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#6010DD] placeholder-gray-500"
                    placeholder="contact@email.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-gray-400 mb-1 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="bg-[#2D2D3A] border border-transparent text-white px-4 py-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#6010DD] placeholder-gray-500"
                  placeholder="Please write your message..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#2B0780] hover:bg-[#6010DD] text-white font-semibold py-3 px-4 rounded drop-shadow-2xl hover:drop-shadow-sm text-md"
              >
                Send message
              </button>
            </Form>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-[#000000] py-3 px-4 flex justify-between items-center text-gray-400 text-sm">
        <p>© 2025 Fatiya Quzza. All Rights Reserved.</p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="block p-2 rounded-full border border-gray-400 hover:border-[#6010DD] hover:text-[#6010DD] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-instagram"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="#"
            className="block p-2 rounded-full border border-gray-400 hover:border-[#6010DD] hover:text-[#6010DD] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="#"
            className="block p-2 rounded-full border border-gray-400 hover:border-[#6010DD] hover:text-[#6010DD] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-github"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
