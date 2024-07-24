import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

/**
 *
 * @param {string} collectionName
 * @param {{
 *  filters?: {
 *      propertyName: string | FieldPath,
 *      operator: WhereFilterOp,
 *      value: any
 *  }[],
 *  sorters?: {
 *      propertyName: string | FieldPath,
 *      direction?:OrderByDirection | undefined
 *  }[],
 *  limit?: number
 *  } | undefined} options
 * @returns {DocumentSnapshot[]}
 */
const useCollectionListener = (collectionName, options) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let filters = [];
    let sorters = [];

    if (options?.filters?.length) {
      filters = options.filters.map((filter) =>
        where(filter.propertyName, filter.operator, filter.value)
      );
    }

    if (options?.sorters?.length) {
      sorters = options.sorters.map((sorter) =>
        orderBy(sorter.propertyName, sorter?.direction)
      );
    }

    const constraints = [...filters, ...sorters];

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    // console.log(constraints.length);
    const q = query(
      collection(db, `BranchList${collectionName}`),
      ...constraints
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDocuments(querySnapshot.docs);
      console.log(querySnapshot.docs);
    });

    return () => {
      //   console.log("returning");
      unsubscribe();
    };
  }, [
    `BranchList${collectionName}`,
    options?.limit,
    options?.filters,
    options?.sorters,
  ]);

  return documents;
};

export default useCollectionListener;
