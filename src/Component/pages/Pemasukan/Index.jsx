import React, { useEffect, useState } from "react";
import { DatatableCore } from "../../DatatableCore";
import Api from "../../../Api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Pemasukan = () => {
  const [dataPemasukan, setDataPemasukan] = useState([{ data: "" }]);

  const calculateTotalNominal = (data) => {
    let total = 0;
    for (const row of data) {
      total += row.data.nominal;
    }
    return total;
  };

  const totalNominal = calculateTotalNominal(dataPemasukan);

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

  const loadData = async () => {
    console.log("dataLoaded");

    const date = formatCreatedAt();

    try {
      const ref = collection(db, "pemasukan");
      const q = query(
        ref,
        orderBy("jam", "desc"),
        where("tanggal", "==", date)
      );

      const snapshots = await getDocs(q);
      const data = [];
      snapshots.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setDataPemasukan(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (show a message to the user, log it, etc.)
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updatePembukuan = async () => {
    const ref = collection(db, "pemasukan");
    const q = query(ref, where("tanggal", "==", formatCreatedAt()));

    const snapshots = await getDocs(q);
    let newPemasukan = 0;
    snapshots.forEach((doc) => {
      newPemasukan += doc.data().nominal;
    });

    try {
      const ref = doc(db, "pembukuan", formatCreatedAt());
      await setDoc(
        ref,
        {
          tanggal: formatCreatedAt(),
          pemasukan: newPemasukan,
          bulan: formatMonth(),
        },
        { merge: true }
      );
      console.log("Transaction successfully committed!");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePemasukan = (id) => {
    Swal.fire({
      title: "Hapus?",
      text: "Data yang di hapus tidak dapat Dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Api.deleteData("pemasukan", id).then((_) => {
          updatePembukuan();
        });
        Swal.fire("Deleted!", "", "success");
        loadData();
      }
    });
  };

  const columns = [
    {
      name: "Deskripsi",
      selector: (row) => row.data.desc,
    },
    {
      name: "Nominal",
      selector: (row) =>
        new Intl.NumberFormat("id-ID").format(row.data.nominal),
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="d-flex ">
          <Link
            className="btn btn-primary  me-2"
            to={`edit/${row.id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <i className="bi bi-pencil"></i>
          </Link>
          <button
            onClick={() => deletePemasukan(row.id)}
            className="btn btn-danger "
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const footer = [
    {
      name: "Total",
    },

    {
      name: new Intl.NumberFormat("id-ID").format(totalNominal),
    },
  ];

  const btnTambahan = [
    {
      to: "tambah",
      className: "btn btn-add",
      icon: "bi bi-plus-circle-dotted",
      text: "Tambah",
    },
  ];
  return (
    <>
      {dataPemasukan ? (
        <DatatableCore
          data={dataPemasukan}
          columns={columns}
          title="Pemasukan"
          footer={footer}
          btnTambahan={btnTambahan}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Pemasukan;
