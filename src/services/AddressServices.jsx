import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const createNewAddress = async (
  name,
  phoneNumber,
  city,
  district,
  ward,
  address,
  defaultAddress,
  userId
  //   setAddresses
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      "/shipping-addresses",
      {
        name,
        phoneNumber,
        city,
        district,
        ward,
        address,
        defaultAddress,
        userId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // setAddresses(res.data.data);
    console.log("✅ API trả về address:", res.data.data);
    toast.success("🛒 Thêm địa chỉ thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getAllAddressesByUserId = async (id, setAddresses) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(
      `/shipping-addresses/all-by-user-id/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAddresses(res.data.data);
    console.log("✅ API trả về address:", res.data.data);
    toast.success("🛒 Thêm địa chỉ thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const deleteAddressById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.delete(`/shipping-addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ API trả về address:", res.data.data);
    toast.success("🛒 Thêm địa chỉ thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const updateAddress = async (
  id,
  name,
  phoneNumber,
  city,
  district,
  ward,
  address,
  defaultAddress
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.put(
      `/shipping-addresses`,
      {
        id,
        name,
        phoneNumber,
        city,
        district,
        ward,
        address,
        defaultAddress,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("✅ API trả về address:", res.data.data);
    toast.success("🛒 Thêm địa chỉ thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getAddressById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/shipping-addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ API trả về address:", res.data.data);
    toast.success("🛒 Thêm địa chỉ thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getDefautAddressByUserId = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/shipping-addresses/default-by-user-id/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ API trả về address:", res.data.data);
    toast.success("🛒 Thêm địa chỉ thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

export {
  createNewAddress,
  getAllAddressesByUserId,
  deleteAddressById,
  updateAddress,
  getAddressById,
  getDefautAddressByUserId,
};
