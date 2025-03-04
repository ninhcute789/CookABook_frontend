

const Contact = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-1/2 p-10 m-3 shadow-2xl rounded-2xl">
            <h1 className="text-4xl font-bold text-center">Liên hệ</h1>
            <p className="text-center mt-5">
              Để liên hệ với chúng tôi, vui lòng gửi email đến địa chỉ
              <strong>
                <a href="mailto:contact@example.com" className="text-blue-500">
                  {" "}
                  contact@example.com
                </a>
              </strong>
            </p>
            <form className="mt-10">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Tên
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Tên của bạn"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email của bạn"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Tin nhắn
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Tin nhắn của bạn"
                  rows="5"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer
                  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
