import React from "react";

export default function Home() {
  return <div>Home</div>;
}

// try {
//   const rolesRef = collection(db, "roles");
//   const docRef = await addDoc(rolesRef, formDataWithAccess);
//   console.log("Document written with ID: ", docRef.id);

//   Swal.fire({
//     icon: "success",
//     title: "Berhasil!",
//     text: "Dokumen berhasil disimpan.",
//     showCancelButton: true,
//     confirmButtonText: "Ke Halaman Roles",
//     cancelButtonText: "Masukkan Data Lagi",
//   }).then((result) => {
//     // Jika pengguna memilih "Ke Halaman Roles"
//     if (result.isConfirmed) {
//       // Redirect ke halaman "Roles"
//       window.location.href = "/roles";
//     } else {
//       // Mengosongkan formulir dan reset state
//       e.target.reset();
//       setIsChecked(false);
//     }
//   });

//   e.target.reset();
//   setSelectedAccess([]);
// } catch (error) {
//   console.error("Error writing document: ", error);
// }
