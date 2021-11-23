import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../../../components/Modal/Modal';
import AuthContext from '../../../context/AuthContext';
import { API_URL } from '../../../config';
import { parseCookies } from '../../../helpers';

export default function EditEvent({ token, evt }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(evt.name);
  const [description, setDescription] = useState(evt.description);
  const [type, setType] = useState(evt.type);
  const [time, setTime] = useState(evt.time);

  const [date, setDate] = useState('');

  const [imagePreview, setImagePreview] = useState(
    evt.featuredImage ? evt.featuredImage.formats.thumbnail.url : null,
  );

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        type: type,
        date: date,
        time: time,
        school: user.school,
        user: user.id,
      }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      console.log(evt);
      router.push(`/events/${evt.slug}`);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="max-w-7xl mx-auto py-4 md:py-6 px-6 lg:px-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit An Event
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Provide information about the event being held at your school.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="event-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name Your Event
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          Event
                        </span>
                        <input
                          type="text"
                          name="event-name"
                          id="event-name"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="Event Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Event Description"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of the event.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <div className="mt-1">
                      <DatePicker
                        selected={date}
                        required
                        onChange={(selectedDate) => setDate(selectedDate)}
                        className=""
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Select date of the event.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="timepicker"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Time Of Event
                    </label>
                    <div className="mt-1">
                      <select
                        name="timepicker"
                        id="time"
                        value={time}
                        required
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="event-type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type Of Event
                    </label>
                    <select
                      id="type"
                      name="event-type"
                      autoComplete="event-type"
                      value={type}
                      required
                      onChange={(e) => setType(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select Type Of Event</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="sport">Sport</option>
                      <option value="academic">Academic</option>
                      <option value="social">Social</option>
                    </select>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Event
                  </button>
                </div>
              </div>
            </form>

            <h2 className="mt-3 font-semibold text-xl mb-2">Event Image</h2>
            {imagePreview ? (
              <Image
                src={imagePreview}
                height={200}
                width={300}
                alt="Preview Image"
                className="rounded aspect-w-3 aspect-h-2"
              />
            ) : (
              <div>
                <p className="text-lg text-gray-500 font-medium">
                  No Image Uploaded
                </p>
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 px-4 py-2 rounded font-medium hover:bg-indigo-700 text-white"
              >
                Set Image
              </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const evt = await res.json();

  return {
    props: {
      token,
      evt,
    },
  };
}
