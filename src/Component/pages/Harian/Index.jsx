import React, { useEffect, useState } from "react";
import { DatatableCore } from "../../DatatableCore";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id"; // Menggunakan lokal Bahasa Indonesia
registerLocale("id", id);
import { startOfMonth, format } from "date-fns";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
const Harian = () => {
  const [dataHarian, setDataHarian] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfMonth(new Date()));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateTable = (
    <>
      <div className="row">
        <div className="col-auto">Pilih bulan :</div>
        <div className="col-auto">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            locale="id" // Menggunakan lokal Bahasa Indonesia
          />
        </div>
      </div>
    </>
  );

  const getData = async () => {
    console.log("first");
    const formattedDate = format(selectedDate, "MM-yyyy", { locale: id });
    const month = formattedDate;

    const ref = collection(db, "pembukuan");
    const q = query(
      ref,
      where("bulan", "==", month),
      orderBy("tanggal", "desc")
    );

    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setDataHarian(data);
  };

  useEffect(() => {
    getData();
  }, [selectedDate]);

  const columns = [
    {
      name: "Tanggal",
      selector: (row) => row.id,
    },
    {
      name: "Pemasukan",
      selector: (row) =>
        new Intl.NumberFormat("id-ID").format(row.data.pemasukan),
    },
    {
      name: "Pengeluaran",
      selector: (row) =>
        new Intl.NumberFormat("id-ID").format(row.data.pengeluaran),
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="d-flex ">
          <Link
            className="btn btn-primary  me-2"
            to={`view/${row.data.tanggal}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <i className="bi bi-eye"></i>
          </Link>
        </div>
      ),
    },
  ];

  const calculateTotalNominal = (data, name) => {
    let total = 0;
    for (const row of data) {
      total += row.data[name];
    }
    return total;
  };

  const totalPengeluaran = calculateTotalNominal(dataHarian, "pengeluaran");
  const totalPemasukan = calculateTotalNominal(dataHarian, "pemasukan");

  const footer = [
    {
      name: "Total",
    },
    {
      name: new Intl.NumberFormat("id-ID").format(totalPemasukan),
    },
    {
      name: new Intl.NumberFormat("id-ID").format(totalPengeluaran),
    },
    {
      name: new Intl.NumberFormat("id-ID").format(
        totalPemasukan - totalPengeluaran
      ),
    },
  ];

  return (
    <>
      {dataHarian ? (
        <DatatableCore
          data={dataHarian}
          columns={columns}
          dateTable={dateTable}
          footer={footer}
          title="Pembukuan > Harian"
        />
      ) : (
        <div className="">Loading ...</div>
      )}
    </>
  );
};

export default Harian;
