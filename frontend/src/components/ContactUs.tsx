import React, { FormEvent } from 'react';

const ContactUs: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-4 text-center">We'd love to hear from you! Whether you have a question, feedback, or just want to say hi, feel free to reach out to us.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Your Message"
              className="w-full p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-lg">Or visit us at:</p>
          <address className="mt-2">
            <p>123 Cinema Street</p>
            <p>Movie City, MC 12345</p>
            <p>
              Email: 
              <a href="mailto:contact@movietheater.com" className="text-blue-400 hover:underline ml-1">
                contact@movietheater.com
              </a>
            </p>
            <p>Phone: (123) 456-7890</p>
          </address>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
