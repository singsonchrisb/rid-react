import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firestore";

const useBranchesListener = (branchCollection) => {
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
     const q = query(collection(db, branchCollection));
    // const q = query(collection(db, branchCollection)).orderBy("branchCode");

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const branches = [];
      querySnapshot.forEach((doc) => {
        branches.push(doc.data()?.details);
      });
      setBranchList(branches);
      console.log("branches",branches)
    });

    return () => {
      unsubscribe();
    };
  }, [branchCollection]);

  return branchList;
};

export default useBranchesListener;
