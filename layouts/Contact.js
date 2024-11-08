import config from "@config/config";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section bg-gray-50">
      <div className="container max-w-[700px] mx-auto p-6 md:p-12">
        {markdownify(title, "h1", "text-3xl font-bold mb-8 text-center")}
        <form
          className="contact-form bg-white rounded-lg shadow-md p-6"
          method="POST"
          action={contact_form_action}
        >
          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="form-input w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary transition duration-200"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="form-input w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary transition duration-200"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="subject">
              Subject
            </label>
            <input
              className="form-input w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary transition duration-200"
              name="subject"
              type="text"
              required
              placeholder="Enter the subject"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              className="form-textarea w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary transition duration-200"
              rows="7"
              placeholder="Type your message here..."
            />
          </div>
          <button className="btn btn-outline-primary w-full py-3 rounded-lg transition duration-200 hover:bg-primary hover:text-white">
            Submit Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
