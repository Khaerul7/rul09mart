import { create } from "zustand";

// Kredensial admin — ganti sesuai kebutuhan
export const ADMIN_CREDENTIALS = {
  email: "admin@rul09.id",
  password: "rul09mart",
};

type AuthStore = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  checkSession: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,

  login: (email, password) => {
    const valid =
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password;
    if (valid) {
      sessionStorage.setItem("rul09_admin", "true");
      set({ isLoggedIn: true });
    }
    return valid;
  },

  logout: () => {
    sessionStorage.removeItem("rul09_admin");
    set({ isLoggedIn: false });
  },

  checkSession: () => {
    const saved = sessionStorage.getItem("rul09_admin");
    if (saved === "true") set({ isLoggedIn: true });
  },
}));
