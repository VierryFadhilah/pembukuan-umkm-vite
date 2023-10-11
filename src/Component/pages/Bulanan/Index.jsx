import React, { useEffect, useState } from "react";
import { DatatableCore } from "../../DatatableCore";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format, startOfYear } from "date-fns";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import id from "date-fns/locale/id";

const Bulanan = () => {
  const [dataBulanan, setDataBulanan] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfYear(new Date()));

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const dateTable = (
    <div className="col">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy"
        showYearPicker
        locale="id" // Menggunakan lokal Bahasa Indonesia
      />
    </div>
  );

  const getData = async () => {
    const formattedDate = format(selectedDate, "yyyy", { locale: id });
    const year = formattedDate;

    const ref = collection(db, "bulanan");
    const q = query(ref, where("tahun", "==", year), orderBy("bulan", "desc"));

    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    console.log(data);
    setDataBulanan(data);
  };

  useEffect(() => {
    getData();
  }, [selectedDate]);

  const columns = [
    {
      name: "Bulan",
      selector: (_) => _.data.bulan,
    },
    {
      name: "Pemasukan",
      selector: (_) => _.data.pemasukan,
    },
    {
      name: "Pengeluaran",
      selector: (_) => _.data.pengeluaran,
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="d-flex ">
          <Link
            className="btn btn-primary  me-2"
            to={`view/${row.data.bulan}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <i className="bi bi-eye"></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {dataBulanan ? (
        <DatatableCore
          columns={columns}
          data={dataBulanan}
          title="Pembukuan > Bulanan"
          dateTable={dateTable}
        />
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Bulanan;
