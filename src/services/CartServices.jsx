import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const addBookToCart = async (bookId, cartId, quantity) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      "/carts/add",
      {
        bookId,
        cartId,
        quantity,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("✅ API trả về:", res.data);
    toast.success("🛒 Thêm sách vào giỏ hàng thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getCartById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API trả về:", res.data);

    // toast.success("🛒 Lấy giỏ hàng thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const decreaseCartItem = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/cart-items/${id}/decrease`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API trả về:", res.data);

    // toast.success("🛒 Giảm số lượng sách trong giỏ hàng thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const increaseCartItem = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/cart-items/${id}/increase`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API trả về:", res.data);

    // toast.success("🛒 Tăng số lượng sách trong giỏ hàng thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const updateCartItemSelectedById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      `/cart-items/${id}/update-selected`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("✅ API trả về update cart selected:", res);

    // toast.success("🛒 Tăng số lượng sách trong giỏ hàng thành công!");
    // return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getQuantityOfCartItems = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/carts/${id}/quantity`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API trả về:", res.data);

    // toast.success("🛒 Tăng số lượng sách trong giỏ hàng thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const deleteCartItemById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.delete(`/cart-items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API trả về:", res.data);

    toast.success("🛒 Xóa sách khỏi giỏ hàng thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const deleteAllCartItems = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.delete(`/carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API trả về:", res.data);

    toast.success("🛒 Xóa giỏ hàng thành công!");
    //   return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const handleDeleteCart = async (user, fetchCart) => {
  const confirmToast = toast(
    (t) => (
      <div className="flex flex-col">
        <span>Bạn có muốn xóa hết giỏ hàng không?</span>
        <div className="mt-2 flex justify-end space-x-2 mr-auto">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // Đóng toast hiện tại
              try {
                const token = localStorage.getItem("token");
                if (!token) {
                  console.error("❌ Không tìm thấy token!");
                  toast.error("Bạn chưa đăng nhập!");
                  return;
                }

                await deleteAllCartItems(user.cartId);
                await fetchCart();
                // toast.success("🗑 Đã xóa hết giỏ hàng!");
              } catch (error) {
                console.error("❌ Lỗi khi xóa bài viết:", error);
                toast.error("Không thể xóa bài viết!");
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Xóa
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
  confirmToast();
};

export {
  addBookToCart,
  getCartById,
  decreaseCartItem,
  increaseCartItem,
  updateCartItemSelectedById,
  getQuantityOfCartItems,
  deleteCartItemById,
  deleteAllCartItems,
  handleDeleteCart,
};
