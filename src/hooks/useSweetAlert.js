"use client";
import Swal from "sweetalert2";

const useSweetAlert = () => {
  const createAlert = (type, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      escapeHtml: true, // Prevent HTML in messages
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: type,
      title: message,
      html: undefined, // Ensure no HTML parsing
    });
  };
  return createAlert;
};

export default useSweetAlert;