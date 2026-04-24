import { mockUsers } from "../mock/mockUsers";

export const loginApi = (loginData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) =>
          u.email === loginData.email &&
          u.password === loginData.password
      );

      if (user) {
        resolve({
          token: "fake-jwt-token-123456",
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        reject({
          response: {
            data: {
              message: "Sai email hoặc mật khẩu",
            },
          },
        });
      }
    }, 800);
  });
};