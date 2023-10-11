import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../Api";
import { DatatableCore } from "../../DatatableCore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Detail = () => {
  const params = useParams();
  const id = params.id;

  const [dataDetail, setData] = useState([]);

  const loadData = async () => {
    console.log("dataLoaded");

    const date = id;

    try {
      const ref = collection(db, "pemasukan");
      const q = query(
        ref,
        orderBy("jam", "desc"),
        where("tanggal", "==", date)
      );
      const refPengeluaran = collection(db, "pengeluaran");
      const qP = query(
        refPengeluaran,
        orderBy("jam", "desc"),
        where("tanggal", "==", date)
      );

      const snapshotsPemasukan = await getDocs(q);
      const snapshotsPengeluaran = await getDocs(qP);
      const data = [];
      snapshotsPemasukan.forEach((doc) => {
        data.push({
          id: doc.id,
          desc: doc.data().desc,
          pemasukan: doc.data().nominal,
          pengeluaran: 0,
        });
      });
      snapshotsPengeluaran.forEach((doc) => {
        data.push({
          id: doc.id,
          desc: doc.data().desc,
          pengeluaran: doc.data().nominal,
          pemasukan: 0,
        });
      });
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (show a message to the user, log it, etc.)
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      name: "Deskripsi",
      selector: (_) => _.desc,
    },
    {
      name: "Pemasukan",
      selector: (_) => new Intl.NumberFormat("id-ID").format(_.pemasukan),
    },
    {
      name: "Pengeluaran",
      selector: (_) => new Intl.NumberFormat("id-ID").format(_.pengeluaran),
    },
  ];

  const calculateTotalNominal = (data, table) => {
    let total = 0;
    for (const row of data) {
      if (row[table]) {
        total += row[table];
      }
    }
    return total;
  };

  const totalPemasukan = calculateTotalNominal(dataDetail, "pemasukan");
  const totalPengeluaran = calculateTotalNominal(dataDetail, "pengeluaran");

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
  ];

  return (
    <>
      {dataDetail ? (
        <DatatableCore
          data={dataDetail}
          columns={columns}
          title={`Detail ${id}`}
          footer={footer}
        />
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Detail;
