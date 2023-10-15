import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AddPemasukan = () => {
  const navigate = useNavigate();

  const [nominal, setNominal] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [listKategori, setListKategori] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNominalChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Hapus semua karakter non-digit
    const formattedValue = new Intl.NumberFormat("id-ID").format(value); // Format nilai dengan titik setiap 3 angka

    setNominal(formattedValue);
  };

  const fetchData = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/kategori_transaksi?jenis=pemasukan`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListKategori(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const kategori_id = formData.get("kategori");
    const description = formData.get("description");

    const insert = {
      user_id: user.id,
      tanggal_transaksi: format(selectedDate, "yyyy-MM-dd hh:mm", {
        timeZone: "Asia/Jakarta",
      }), // Menggunakan ISO format untuk tanggal
      kategori_id,
      description,
      nominal: parseFloat(nominal.replace(/\D/g, "")), // Mengambil nilai numerik dari nominal
    };

    Swal.showLoading();

    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/transaksi`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: insert,
    })
      .then((val) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Dokumen berhasil disimpan. ID: ${val.data.data.id}`,
          showCancelButton: true,
          confirmButtonText: ` Ke Halaman Pemasukan `,
          cancelButtonText: "Masukkan Data Lagi",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/pemasukan");
          } else {
            e.target.reset();
            setNominal("");
            setSelectedDate(new Date());
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  };

  const optionKategori = listKategori.map((kategori) => (
    <option key={kategori.id} value={kategori.id}>
      {kategori.name}
    </option>
  ));

  return (
    <div className="container mt-3">
      <h2>Tambah Pemasukan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="kategori" className="form-label">
                Tanggal transaksi:
              </label>
              <div>
                <ReactDatePicker
                  className="form-control"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="kategori" className="form-label">
                Kategori:
              </label>
              <select
                name="kategori"
                id="kategori"
                className="form-control"
                required
              >
                {optionKategori}
              </select>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Deskripsi:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nominal" className="form-label">
            Nominal:
          </label>
          <input
            type="text"
            className="form-control"
            id="nominal"
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

export default AddPemasukan;
