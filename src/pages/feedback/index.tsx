import { FeedbackService } from '@services/feedback';
import React, { useState } from 'react';
const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleSubmit = async () => {
    const feedbackData = {
      name,
      email,
      phone,
      description: feedback,
    };
    const res = await FeedbackService.newFeedback(feedbackData);
    console.log('Feedback submitted:', res);
    // You can add your form submission logic here, such as sending the data to a server
  };
  return (
    <section className="pb-2 lg:pb-2 xl:pb-4 pt-52">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold text-gray-900">Санал хүсэлт</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Гомдол саналаа илгээнэ үү.</p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 w-96">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Нэр
                </label>
                <div className="col-span-full">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Нэрээ оруулна уу."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                  Утас
                </label>
                <div className="col-span-full">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Утсаа оруулна уу."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Мэйл
                </label>
                <div className="col-span-full">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Мэйл оруулна уу."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="feedback" className="block text-sm/6 font-medium text-gray-900">
                  Санал гомдол
                </label>
                <div className="mt-2">
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows={3}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">Санал гомдолоо илгээнэ үү.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
              onClick={handleSubmit}
            >
              Илгээх
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
