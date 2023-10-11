import React, { useState } from "react";
import Api from "../../../Api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const AddPengeluaran = () => {
  const navigate = useNavigate();
  const [desc, setDesc] = useState(""); // State untuk menyimpan nilai deskripsi
  const [nominal, setNominal] = useState(""); // State untuk menyimpan nilai nominal
  const [numericNominal, setNumericNominal] = useState(0);

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleNominalChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Hapus semua karakter non-digit
    const formattedValue = new Intl.NumberFormat("id-ID").format(value); // Format nilai dengan titik setiap 3 angka
    const numericValue = parseFloat(value);
    setNominal(formattedValue);
    setNumericNominal(numericValue);
  };

  const formatCreatedAt = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const formatMonth = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    return `${month}-${year}`;
  };

  const updatePembukuan = async () => {
    const ref = collection(db, "pengeluaran");
    const q = query(ref, where("tanggal", "==", formatCreatedAt()));

    const snapshots = await getDocs(q);
    let newPengeluaran = 0;
    snapshots.forEach((doc) => {
      newPengeluaran += doc.data().nominal;
    });

    try {
      const ref = doc(db, "pembukuan", formatCreatedAt());
      await setDoc(
        ref,
        {
          tanggal: formatCreatedAt(),
          pengeluaran: newPengeluaran,
          bulan: formatMonth(),
        },
        { merge: true }
      );
      console.log("Transaction successfully committed!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan nilai deskripsi dan nominal

    const createdAt = formatCreatedAt();
    const now = new Date();
    const insert = {
      jam: now,
      desc,
      tanggal: createdAt.toLowerCase(),
      nominal: numericNominal,
    };

    Api.insertData("pengeluaran", insert).then((val) => {
      updatePembukuan();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Dokumen berhasil disimpan. ID: ${val}`,
        showCancelButton: true,
        confirmButtonText: ` Ke Halaman Pengeluaran `,
        cancelButtonText: "Masukkan Data Lagi",
      }).then((result) => {
        // Jika pengguna memilih "Ke Halaman Roles"
        if (result.isConfirmed) {
          // Redirect ke halaman "Roles"
          navigate("/pengeluaran");
        } else {
          // Mengosongkan formulir dan reset state
          e.target.reset();
        }
      });
    });
  };

  return (
    <div className="container mt-3">
      <h2>Tambah Pengeluaran</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaRoles" className="form-label">
            Deskripsi
          </label>
          <input
            type="text"
            className="form-control"
            id="namaRoles"
            name="desc"
            value={desc}
            onChange={handleDescChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deskripsiRoles" className="form-label">
            Nominal
          </label>
          <input
            type="text"
            className="form-control"
            id="namaRoles"
            name="nominal"
            value={nominal}
            onChange={handleNominalChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPengeluaran;
