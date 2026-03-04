import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_vnfg0dm",
        "template_i097zdn",
        form.current,
        "yZJ7RLSkBrT_Tlh9o"
      )
      .then(
        () => {
          setLoading(false);
          setMessageStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          setMessageStatus("Failed to send message");
          console.error(error);
        }
      );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12">

        {/* Left Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Contact <span className="text-green-600">QuickBite</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Have questions, feedback, or partnership inquiries?  
            Fill out the form and our team will get back to you promptly.
          </p>

          <div className="space-y-4 text-gray-700 text-base">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Address:</span> Basmat, Maharashtra, India
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Email:</span> support@quickbite.com
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Send a Message
          </h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+91 98765 43210"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project Inquiry"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 transition"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-green-700 active:scale-[0.97] transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Status */}
            {messageStatus && (
              <p className={`text-center mt-2 text-sm font-medium ${messageStatus.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
                {messageStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;





// import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

// const Contact = () => {
//   const form = useRef();
//   const [loading, setLoading] = useState(false);
//   const [messageStatus, setMessageStatus] = useState("");

//   const sendEmail = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     emailjs
//       .sendForm(
//         "service_vnfg0dm",      //  replace with EmailJS Service ID
//         "template_i097zdn",     //  replace with Template ID
//         form.current,
//         "yZJ7RLSkBrT_Tlh9o"       //  replace with Public Key
//       )
//       .then(
//         () => {
//           setLoading(false);
//           setMessageStatus("Message sent successfully! ");
//           form.current.reset();
//         },
//         (error) => {
//           setLoading(false);
//           setMessageStatus("Failed to send message ");
//           console.error(error);
//         }
//       );
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen pt-20 px-6">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

//         {/* Left Side Info */}
//         <div>
//           <h2 className="text-4xl font-bold text-green-600 mb-4">
//             Contact QuickBite
//           </h2>
//           <p className="text-gray-600 mb-6 leading-relaxed">
//             Have questions, feedback, or partnership inquiries?  
//             We’d love to hear from you! Fill out the form and our team
//             will get back to you as soon as possible.
//           </p>

//           <div className="space-y-3 text-gray-700">
//             <p>📍 Address: Pune, Maharashtra, India</p>
//             <p>📧 Email: support@quickbite.com</p>
//             <p>📞 Phone: +91 98765 43210</p>
//           </div>
//         </div>

//         {/* Right Side Form */}
//         <div className="bg-white shadow-lg rounded-2xl p-8">
//           <form ref={form} onSubmit={sendEmail} className="space-y-5">

//             <div>
//               <label className="block mb-1 font-medium">Name</label>
//               <input
//                 type="text"
//                 name="name"  
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"  
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Phone</label>
//               <input
//                 type="text"
//                 name="phone"  
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Subject</label>
//               <input
//                 type="text"
//                 name="subject"  
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Message</label>
//               <textarea
//                 name="message"  
//                 rows="4"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//             >
//               {loading ? "Sending..." : "Send Message"}
//             </button>

//             {messageStatus && (
//               <p className="text-center mt-3 text-sm font-medium">
//                 {messageStatus}
//               </p>
//             )}

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;