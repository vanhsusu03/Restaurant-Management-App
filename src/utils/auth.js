import { firebase } from '../../Firebase/firebase';

const changePassword = (newPassword) => {
    // Lấy người dùng hiện tại
    const user = firebase.auth().currentUser;

    if (!user) {
        console.error("Người dùng hiện tại không tồn tại.");
        return;
    }

    // Thực hiện đổi mật khẩu
    user.updatePassword(newPassword)
        .then(() => {
            console.log("Mật khẩu đã được thay đổi thành công!");
        })
        .catch(error => {
            console.error("Lỗi khi cập nhật mật khẩu:", error.message);
        });
};

const getCurrentUserEmail = () => {
    // Lấy người dùng hiện tại
    const user = firebase.auth().currentUser;

    if (user) {
        // Trả về email của người dùng hiện tại nếu tồn tại
        return user.email;
    } else {
        // Trả về null nếu không có người dùng nào đang đăng nhập
        return null;
    }
};

const logout = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log("Đăng xuất thành công!");
            // Nếu bạn muốn điều hướng đến màn hình khác sau khi đăng xuất, bạn có thể thực hiện ở đây
        })
        .catch(error => {
            console.error("Lỗi khi đăng xuất:", error.message);
        });
};

export { changePassword, getCurrentUserEmail, logout };
