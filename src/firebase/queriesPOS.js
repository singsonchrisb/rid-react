
import { db, fb } from "./firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { isValidDate } from "../functions/ChrisFunctions";
import moment from "moment";
// import { postCancellLayaway } from "../api/queriesJewelry";
// import { isValidDate } from '../../pages/Functions/MyFunctions';

// import { getHours } from "date-fns";

// import { currency } from "../functions/currency";

export async function getReport(callback) {
  try {
    return await db
      .collection("Variables")
      .doc("Dashboard")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
}

export const getBranches = (callback) => {
  try {
    return db
      .collection("Variables")
      .doc("Branches")
      .collection("SyncData")
      .orderBy("branchCode", "asc")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getBranchesFun = () => {
  return db.collection("BranchListJewelry");
};

export const getBranchCashiers = (bName) => {
  return db
    .collection("Users")
    .where("account.userLevel", "==", "Cashier")
    .where("details.branch", "==", bName);
};

export const getCashiersNum = (cName) => {
  return db
    .collection("Users")
    .where("account.userLevel", "==", "Cashier")
    .where("details.name.fullName", "==", cName);
};

export const setCashBag = (
  bill,
  coin,
  cent,
  total,
  cNum,
  date,
  bCode,
  bType,
  bName,
  bNo,
  rDate
) => {
  return db.collection("CashFundingAdmin").add(
    {
      bagNo: bNo,
      bills: bill,
      coins: coin,
      cents: cent,
      date: date,
      branchCode: bCode,
      branchName: bName,
      branchType: bType,
      employeeNumber: cNum,
      grandTotal: total,
      releaseDate: rDate,
    },
    { merge: true }
  );
};

export const getPrepTable = () => {
  return db.collection("CashFundingAdmin").orderBy("date", "desc");
};

export const getCashInputTable = () => {
  return db.collection("CashFunding").orderBy("date", "desc");
};

export const getWithdrawalTable = () => {
  return db.collection("Withdrawals").orderBy("date", "desc");
};

export const getPaymentTypes = async (callback) => {
  try {
    return await db
      .collection("Variables")
      .doc("POSVariables")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const insertBranch = async (data) => {
  // console.log("data", data);
  // alert(data.branchCode)
  try {
      return await setDoc(doc(db, "BranchList" + data.branchType, "ORO"+data.branchCode ), {
        details: {
          ...data,
          address: { full: data.street + " " + data.city + " " + data.province },
          createdBy: { timeStamp: new Date() },
        },  
      });
  } catch (error) {
    console.log(error);
    // alert("chris testing error")
  }
};

// export const insertBranch = async (data) => {
//   console.log("data", data);
//   try {
//     return await db.collection("BranchList" + data.branchType).add({
//       details: {
//         ...data,
//         address: { full: data.street + " " + data.city + " " + data.province },
//         createdBy: { timeStamp: new Date() },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     alert("chris seee")
//   }
// };

export const searchBranch = (branch, callback) => {
  return db
    .collection("Branch")
    .where("branchName", "==", branch)
    .onSnapshot(callback);
};

export const searchSales = async (invoiceNo, callback) => {
  try {
    return await db
      .collection("SalesInvoice")
      .where("invoiceNo", "==", invoiceNo)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const searchItems = async (item, callback) => {
  try {
    return await db
      .collectionGroup("Products")
      .where("product.barcode", "==", item)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getAccount = async (level, callback) => {
  // alert('level')
  try {
    return await db
      .collection("Users")
      .where("account.userLevel", "==", level)
      .orderBy("account.dateCreated", "desc")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getAccountUsers = async (level, callback) => {
  try {
    return await db
      .collection("Users")
      .where("account.userLevel", "==", level)
      .orderBy("account.dateCreated", "desc")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const insertAccount = async (data, type, uid, nUid) => {
  try {
    let newData = {
      created: {
        by: uid,
        timestamp: new Date(),
      },
      email: data.email,
      firstName: data.first,
      lastName: data.last,
      password: data.password,
      type: type,
    };
    //const userRef = await db.collection("Users").add(newData);
    return await db.collection("UsersAdmin").doc(nUid).set(newData);

    //return userRef.id;
  } catch (error) {
    console.log(error);
  }
};

// chris code 10/19/2023
export const getUsersAdmin2 = async (email) => {
  try {
    var data = await db
      .collection("UsersAdmin")
      .where("email", "==", email)
      .get()
      alert(data)
      return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersAdmin = async (id) => {
  const noteSnapshot = await getDoc(doc(db, 'UsersAdmin', id));
  if (noteSnapshot.exists()) {
      return noteSnapshot.data();
  } else {
      console.log("Note doesn't exist");
      return "Note doesn't exist";
  }
};



// const fieldName = 'someField';
// db.collectionGroup('students')
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         const documentData = doc.data();
//         if (!documentData[fieldName]) {
//           console.log(doc.id);
//         }
//       });
//     });
export const getApprovals = async (callback) => {
  try {
    return await db
      .collection("Approvals")
      .where("status", "==", "pending")
      .orderBy("createdBy.timestamp", "desc")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getAccountType = async (uid) => {
  try {
    return await db.collection("UsersAdmin").doc(uid).get();
  } catch (error) {
    console.log(error);
  }
};

export const getSales = async (callback) => {
  try {
    return await db
      .collection("SalesInvoice")
      .orderBy("createdBy.timestamp", "desc")
      .limit(20)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

// chris code 10/24/23
export const getSalesNotTransfer = async (callback) => {
  try {
    return await db
      .collection("SalesInvoice")
      .where("updstat","==","0")
      .orderBy("createdBy.timestamp", "desc")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};


export const getSales1 = async () => {
  try {
    return await db
      .collection("SalesInvoice")
      .orderBy("createdBy.timestamp", "desc")
      .limit(20)
      .get();
  } catch (error) {
    console.log(error);
  }
};

export const getMoreSales = async () => {
  try {
    return await db
      .collection("SalesInvoice")
      .orderBy("createdBy.timestamp", "desc")
      .limit(10)
      .get();
  } catch (error) {
    console.log(error);
  }
};

export const deleteSalesInvoice = async (recordId) => {
  try {
    const recordRef = db.collection('SalesInvoice').doc(recordId);
      recordRef.delete()
      .then(() => {
        // console.log('Record deleted successfully!');
        toast.success('Record deleted successfully!');
      })
      .catch((error) => {
        // console.error('Error deleting record:', error);
        toast.error('Error deleting record: ' + error);
      });
  } catch (error) {
      toast.error('Error deleting record: ' + error);
  }
};



export const getReturnsAndExchange = async (type, callback) => {
  try {
    if (type === "return") {
      return await db
        .collection("SalesInvoice")
        .where("invoiceType", "==", type)
        .onSnapshot(callback);
    } else {
      return await db.collection("SalesInvoiceExchanged").onSnapshot(callback);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateApprovals = async (action, id) => {
  try {
    return await db
      .collection("Approvals")
      .doc(id)
      .update(
        {
          resolution: {
            rejectReason: "",
            managerOverrideCode: "",
            status: action,
            timeStamp: new Date(),
            userFirstName: "n/a",
            userId: "n/a",
            userLastName: "n/a",
            userLevel: "n/a",
          },
          status: action,
        },
        { merge: true }
      );
  } catch (error) {
    console.log(error);
  }
};



// discount approval

export const updateApprovalsDiscount = async (action, id, discount) => {
  console.log('update: ',action, id,discount)
  try {
    return await db
      .collection("ApprovalsDiscount")
      .doc(id)
      .update(
        {
          resolution: {
            rejectReason: "",
            managerOverrideCode: "",
            status: action,
            timeStamp: new Date(),
            // userId: "n/a",
            approvedDiscount: Number(discount),
          },
          status: action,
        },
        { merge: true }
      );
  } catch (error) {
    console.log(error);
  }

  
};

export const getApprovalsDiscount = async (callback) => {
  // console.log('test log');
  try {
    return await db
      .collection("ApprovalsDiscount")
      .where("status", "==", "pending")
      .orderBy('createdBy.timestamp', 'desc')
      // orderBy('index', 'desc'),
      // where('createdBy', 'in', following)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
  
};

export const filterByPaymentType = async (type, callback) => {
  try {
    return await db
      .collection("SalesInvoice")
      .where("payment.type", "==", type)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

// export const filterByBranch = async (branch, callback) => {
//   try {
//     return await db
//       .collection("SalesInvoice")
//       .where("branch.branchName", "==", branch)
//       .orderBy("createdBy.timestamp", "desc")
//       .onSnapshot(callback);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const filterByBranch = async (branch, callback) => {
  // branch = branchCode
  //  console.log('branch: ',branch)
  //  let nBranch=Number(branch.substr(1,2))
  //  console.log('nBranch: ',nBranch)
  //  let tbranch ='ORO '+ branch;
  try {
    return await db
      .collection("SalesInvoice")
      // .where("branch.branchName", "==", tbranch)
      .where("branch.branchCode", "==", branch)
      .orderBy("createdBy.timestamp", "desc")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const filterItemsByBranch = async (branch, callback) => {
  try {
    var str = branch;
    var res = str.replace(/\D/g, "");
    var br = "J" + res;
    return await db
      .collectionGroup("Products")
      .where("product.branchCode", "==", br)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getCashiers = async (callback) => {
  try {
    return await db
      .collection("Users")
      .where("account.userLevel", "==", "Cashier")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const filterByCashiers = async (cashier, callback) => {
  try {
    return await db
      .collection("SalesInvoice")
      .where("createdBy.employeeNumber", "==", cashier)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async () => {
  try {
    return await db.collectionGroup("Products").limit(20).get();
  } catch (error) {
    console.log(error);
  }
};

export const getMoreItems = async (ldoc) => {
  try {
    return await db
      .collectionGroup("Products")
      .startAfter(ldoc)
      .limit(10)
      .get();
  } catch (error) {
    console.log(error);
  }
};

export const getSeniors = async (callback) => {
  try {
    return await db
      .collection("Seniors")
      .where("status", "==", "pending")
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const searchSenior = async (senior, callback) => {
  try {
    return await db
      .collection("Seniors")
      .where("fullName", "==", senior)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getSeniorsByStatus = async (status, callback) => {
  try {
    return await db
      .collection("Seniors")
      .where("status", "==", status)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getMembers = async (callback) => {
  try {
    return await db.collection("Members").onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const searchMember = async (member, callback) => {
  try {
    return await db
      .collection("Members")
      .where("fullName", "==", member)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getMembersByStatus = async (status, callback) => {
  try {
    return await db
      .collection("Members")
      .where("status", "==", status)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const insertBranchAccount = async (data, type, branchId) => {
  const collectionRef = db.collection("Users");
  console.log('branchId:',branchId)
  console.log('empNum:',data.employeeNum)
  // console.log('data me',data)


  try {
    // search if username already exists
    const search = await collectionRef
      .where("account.username", "==", data.username)
      .get();

    // if username already exists, do not proceed
    if (!search.empty) throw Error("username already exists");

    let newData = {
      account: {
        dateCreated: new Date(),
        email: data.email,
        // employeeNumber: data.username, employeeNum
        // employeeNumber: empNum,
        password: data.password,
        status: 0,
        userLevel: type,
        userType: data.userType,
        username: data.username,
        employeeNumber: data.employeeNum,
      },
      details: {
        address: "",
        name: {
          first: data.first,
          last: data.last,
          fullName: data.first + " " + data.last,
        },
        phone: data.phone,
        branch: data.branch,
      },
    };

    // const userRef = await db.collection("Users").add(newData);
    const userRef = await db.collection("Users").doc(data.username).set(newData);
    console.log('data.userType',data.userType)
    console.log('chris: no err pa ',branchId.length)

    for (let index = 0; index < branchId.length; index++) {
      const branchRef = db.collection(data.userType).doc(branchId[index]); // get collection as params
      let fieldName = "branchManager";

      if (type === "Cashier") {
        fieldName = "cashier";
      }

      await branchRef.set(
        {
          // [fieldName]: fb.firestore.FieldValue.arrayUnion(userRef.id),
          [fieldName]: fb.firestore.FieldValue.arrayUnion(data.username),
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.log('chris:', error)
    throw Error(error);
  }
};

export const getCashFunding = async () => {
  const fundings = await db
    .collection("CashFunding")
    .orderBy("date", "desc")
    .get();

  if (fundings.empty) return [];

  const fundArr = [];
  fundings.forEach((funding) => {
    const fundingData = funding.data();
    const date = fundingData.date.toDate();
    const grandTotal = fundingData.grandTotal;

    fundArr.push({ id: funding.id, date, grandTotal });
  });

  return fundArr;
};

export const getWithdrawals = async () => {
  const withdrawals = await db
    .collection("Withdrawals")
    .orderBy("date", "desc")
    .get();

  if (withdrawals.empty) return [];

  const withdrawalArr = [];
  withdrawals.forEach((withdrawal) => {
    const withdrawalData = withdrawal.data();
    const date = withdrawalData.date.toDate();
    const grandTotal = withdrawalData.total;
    // console.log(grandTotal);
    withdrawalArr.push({ id: withdrawal.id, date, grandTotal });
  });

  return withdrawalArr;
};

export const getAllBranches = async (collection) => {
  const colRef = await db
    .collection(collection)
    .orderBy("details.branchName")
    .get();

  if (colRef.empty) return [];

  let branches = await getBranchData(colRef);

  return branches;
};

export const getPOS = async (collection, branchName) => {
  let posArray = [
    {
      key: "defaultkey000",
      text: "Select a branch first.. ",
      value: "No POS selected",
    },
  ];

  if (branchName !== undefined) {
    posArray = [];
    let pos = await db
      .collection(collection)
      .where("details.branchName", "==", branchName)
      .get();

    if (pos.size > 0) {
      return getNoPOS(
        posArray,
        pos.docs.map((doc) => doc.data()),
        pos.docs.map((doc) => doc.id)
      );
    }

    return posArray;
  }
};

export const getEmployeeNumber = async (emNum) => {
  return db.collection("EmployeeList").doc(emNum).get();
  // alert(enNum)
  // return db.collection("EmployeeList").doc(emNum).where('status','==',0).get();
};

export const getBranchData = async (results) => {
  let resultArray = [];

  results.forEach((result) => {
    const data = result?.data();
    if (!data.hasOwnProperty("status")) {
      if (data.details) {
        resultArray.push({
          key: result.id,
          id: result.id,
          text: data?.details?.branchName,
          value: data?.details?.branchName,
        });
      }
    }
  });

  return resultArray;
};

export const getNoPOS = (posArray, pos, posId) => {
  for (let index = 0; index < Number(pos[0]?.details?.noPOS); index++) {
    posArray.push({
      key: index,
      text: "POS " + (index + 1),
      value: "POS " + (index + 1),
      docId: posId[0],
    });
  }

  return posArray;
};

export const getLayaway = async (callback) => {
  try {
    return await db
      .collection("LayAway")
      .orderBy("createdBy.date", "desc")
      .limit(120)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const searchLayaway = async (layawayNo, callback) => {
  try {
    return await db
      .collection("LayAway")
      .where("layAwayNo", "==", layawayNo)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getMoreLayaway = async (lastDoc) => {
  try {
    return await db
      .collection("LayAway")
      .orderBy("createdBy.date", "desc")
      .startAfter(lastDoc)
      .limit(10);
  } catch (error) {
    console.log(error);
  }
};

export const checkLayaway = async (layawayNo) => {
  try {
    return await db
    .collection("LayAway")
    .where("layAwayNo", "==", layawayNo)
    .orderBy("createdBy.date", "desc")
    .get();
  } catch (error) {
    console.log(error);
  }
};

export const checkLayawaError = async () => {
  try {
    return await db
      .collection("LayAway")
      .orderBy("createdBy.date", "desc")
      .get();
  } catch (error) {
    console.log(error);
  }
};

export const deleteLayaway = async (recordId) => {
  try {
    const recordRef = db.collection('LayAway').doc(recordId);
      recordRef.delete()
      .then(() => {
        // console.log('Record deleted successfully!');
        toast.error('Record deleted successfully!');
      })
      .catch((error) => {
        // console.error('Error deleting record:', error);
        toast.error('Error deleting record: ' + error);
      });
  } catch (error) {
      toast.error('Error deleting record: ' + error);
  }
};

// export const editBranch_edit = async (data, uid) => {
//   alert('not working saving! bugs not fixed  ' + data.branchType + ", POS key: " + data.posAccessKeys + ",  Doc ID: " + data.docId )
//   //  alert(data.branchAka)
//   // alert('uid: '+ uid)
//   ``
  
//   try {
//     return db
//       .collection("BranchListJewelry")
//       .doc(data.docId)
//       .set({
//           details: {
//             address: {
//               full: data.street + " " + data.city + " " + data.province,
//             },
//             branchCode: data.branchCode,
//             branchAka: data.branchAka,
//             branchName: data.branchName,
//             city: data.city,
//             email: data.email,
//             noPOS: data.noPOS,
//             phone: data.phone,
//             province: data.province,
//             street: data.street,
//             birAccreditaion: data.birAccreditaion,
//             tin: data.tin,
//             proprietor: data.proprietor,
//             posAccessKeys: data.posAccessKeys,
//             editedBy: {
//               timestamp: new Date(),
//               userId: uid,
//             },
//           },
//         });

        
//   } catch (error) {
//     console.log(error);
//   }
// };

export const editBranch = async (data, uid) => {
   alert('saving! bugs not fixed  ' + data.branchType + ", POS key: " + data.posAccessKeys + ",  Doc ID: " + data.docId + ',  data.branchAka: ' + data.branchAka + ", data.phone: "+data.phone )
  // alert(data.docId)
  // alert('data.branchAka: ' + data.branchAka)
  // alert('uid: ' + uid)
  // const batch = db.batch();

  try {
     db
      .collection("BranchList" + data.branchType.trim())
      // .collection("BranchListJewelry")
      .doc(data.docId.trim())
      .set(
        {
          details: {
            address: {
              full: data.street + " " + data.city + " " + data.province,
            },
            branchCode: Number(data.branchCode),
            branchAka: data.branchAka,
            branchName: data.branchName,
            city: data.city,
            email: data.email,
            noPOS: data.noPOS,
            phone: data.phone,
            province: data.province,
            street: data.street,
            birAccreditation: data.birAccreditation,
            tin: data.tin,
            proprietor: data.proprietor,
            posAccessKeys: data.posAccessKeys,
            editedBy: {
              timestamp: new Date(),
              userId: uid,
            },
          },
        },
        { merge: true }
      )
  
  } catch (error) {
    console.log(error);
  }
};

export const deleteBranch = async (data, uid) => {
  try {
    const batch = db.batch();

    const docRef1 = db
      .collection("BranchList" + data.branchType)
      .doc(data.docId);
    const docRef2 = db.collection("ArchivedBranch").doc();

    const data1 = {
      status: { stat: "archived", timestamp: new Date(), userId: uid },
    };
    const data2 = {
      details: {
        address: {
          full: data.street + " " + data.city + " " + data.province,
        },
        branchCode: Number(data.branchCode),
        branchName: data.branchName,
        branchType: data.branchType,
        city: data.city,
        email: data.email,
        noPOS: data.noPOS,
        phone: data.phone,
        province: data.province,
        street: data.street,
        createdBy: {
          timeStamp: new Date(),
        },
      },
      status: { stat: "archived", timestamp: new Date(), userId: uid },
    };

    batch.set(docRef1, data1, { merge: true });
    batch.set(docRef2, data2, { merge: true });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const getBranchesData = (branchType, callback) => {
   console.log("chris",branchType)
  try {
// .orderBy("branchCode", "asc")
    return db
      .collection("BranchList" + branchType)
      // .orderBy("details.createdBy.timeStamp", "desc") // close chris 10/24/2023
      .orderBy("details.branchCode", "asc") // change code
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const checkIfDeletable = (branchName, branchCode) => {
  try {
    return db
      .collection("SalesInvoice")
      .where("branch.branchName", "==", branchName)
      .where("branch.branchCode", "==", Number(branchCode))
      .get();
  } catch (error) {
    console.log(error);
  }
};

export const editBranchAccounts = async (data, uid) => {
  try {
    const getID = await db
      .collection("Users")
      .where("account.username", "==", data.account.username)
      .get();
    const cashierId = getID.docs[0].id;

    return db
      .collection("Users")
      .doc(cashierId)
      .set({
        ...data,
        account: {
          ...data.account,
          editedBy: { timestamp: new Date(), userId: uid },
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export const editBranchAccountsRef = async (
  branchId,
  data,
  accountId,
  type
) => {
  try {
    for (let index = 0; index < branchId.length; index++) {
      if (branchId[index] !== undefined) {
        const branchRef = db
          .collection(data.account.userType)
          .doc(branchId[index]); // get collection as params
        let fieldName = "branchManager";

        if (type === "Cashier") {
          fieldName = "cashier";
        }

        await branchRef.set(
          {
            [fieldName]: fb.firestore.FieldValue.arrayUnion(accountId),
          },
          { merge: true }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBranchPOS = (bType, uid) => {
  try {
    return db.collection(bType).doc(uid).get();
  } catch (error) {
    console.log(error);
  }
};

export const getAllSalesToday = (callback) => {
  try {
    const date = new Date();
    return db
      .collection("SalesInvoice")
      .where("createdBy.timestamp", ">=", new Date(date.setHours(0, 0, 0, 0)))
      .where(
        "createdBy.timestamp",
        "<=",
        new Date(date.setHours(23, 59, 59, 59))
      )
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export const getAllSalesLastYear = (callback) => {
  try {
    const currentDate = new Date();
    const firstDayLastYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const lastDayLastYear = new Date(
      currentDate.getFullYear() - 1,
      11,
      31,
      23,
      59,
      59,
      999
    );

    return db
      .collection("SalesInvoice")
      .where(
        "createdBy.timestamp",
        ">=",
        new Date(firstDayLastYear.setHours(0, 0, 0, 0))
      )
      .where("createdBy.timestamp", "<=", lastDayLastYear)
      .onSnapshot(callback);
  } catch (error) {
    console.log(error);
  }
};

export function getTotalSales(callback) {
  const date = new Date();
  return db
    .collection("SalesInvoice")
    .where("createdBy.timestamp", ">=", new Date(date.setHours(0, 0, 0, 0)))
    .where("createdBy.timestamp", "<=", new Date(date.setHours(23, 59, 59, 59)))
    .onSnapshot(callback);
}

export function getFundPrep(callback) {
  const date = new Date();
  return db
    .collection("CashFundingAdmin")
    .where("date", ">", new Date(date.setHours(0, 0, 0, 0)))
    .where("date", "<", new Date(date.setHours(23, 59, 59, 59)))
    .onSnapshot(callback);
}

export function getWithdrawalsToday(callback) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return db
    .collection("Withdrawals")
    .where("dateString", "==", formattedDate)
    .onSnapshot(callback);
}

export function getTotalSalesYesterday(callback) {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59,
    999
  );

  return db
    .collection("SalesInvoice")
    .where("createdBy.timestamp", ">=", startOfYesterday)
    .where("createdBy.timestamp", "<=", endOfYesterday)
    .onSnapshot(callback);
}

export function getFundPrepYesterday(callback) {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59,
    999
  );

  return db
    .collection("CashFundingAdmin")
    .where("date", ">=", startOfYesterday)
    .where("date", "<=", endOfYesterday)
    .onSnapshot(callback);
}

export function getWithdrawalsYesterday(callback) {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const formattedDate = yesterday.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return db
    .collection("Withdrawals")
    .where("dateString", "==", formattedDate)
    .onSnapshot(callback);
}

export const getCollectionDocuments = async (collection) => {
  try {
    let data = [];

    const docs = await db.collection("BranchList" + collection).get();

    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestCashFundingAdmin = async () => {
  try {
    let data;

    const docs = await db
      .collection("CashFundingAdmin")
      .orderBy("date", "desc")
      .limit(1)
      .get();

    docs.forEach((doc) => {
      data = { id: doc.id, ...doc.data() };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addCashFunding = async (data) => {
  try {
    return db.collection("CashFundingAdmin").add(data);
  } catch (error) {
    console.log(error);
  }
};



export const getAllItems = async () => {
  try {
    let data = [];
    const docs = await db.collectionGroup("Products").get();
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getItemsByBranch = async (branch) => {
  try {
    let data = [];
    var str = branch;
    var res = str.replace(/\D/g, "");
    var br = "J" + res;
    const docs = await db
      .collectionGroup("Products")
      .where("product.branchCode", "==", br)
      .get();
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCashFundingAdmin = async (name, type, releaseDate) => {
  try {
    let data = [];

    console.log(name);

    const docs = await db
      .collection("CashFundingAdmin")
      .where("branchName", "==", name)
      .where("branchType", "==", type)
      .where("releaseDate", "==", releaseDate)
      .get();

    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};



// Function to pad a number with leading zeros
function padLeft(number, width) {
  return number.toString().padStart(width, '0');
}

function getSerriesNumber(tType) {
  if (tType=== 'DateTime') {
      let currDate=new Date();
      // alert(currDate.getDay())
      //  alert("seconds " + currDate.getSeconds()); // Outputs: 13
      let docId = "D"+currDate.getFullYear() + padLeft((currDate.getMonth()+1),2) + padLeft(currDate.getDate(),2) + padLeft(currDate.getHours(),2) + padLeft(currDate.getMinutes(),2)+ padLeft(currDate.getSeconds(),2);
      return docId;
  } else {
    return "None";
  }
}

export const getLoginIP = async () => {
  try {
    let data = [];
     // const docs = await db.collection('AccessControl').doc("LogInIP").get();
    // return db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).set(newData);
    const snapshot = await db.collection('AccessControl').doc("Access").collection("LogInIP").get();
    // if (docs===undefined) {
    //   // alert('undefdfd')
    //   return "not exist";
    // }
    // console.log('docs1',docs)
    // snapshot.forEach(doc => {
      //  console.log("get:", doc.id, ' => ', doc.data());
    // });
    //  alert('etes')
        snapshot.forEach((doc) => {
          // console.log('get:',doc.id, ' => ', doc.data());
          data.push({ id: doc.id, ...doc.data() });
        });

    return data;
    
  } catch (error) {
    console.log(error);
    return error; //"Error API"
  }
  
};

export const addLoginIP = async (data) => {
  //  alert('data ' + data.ip + ", " + data.website)
  let newData = {
    dateCreated: new Date(),
    // email: 'admin',
    website: data.website,
    ip: data.ip,
    branchId: '',
    branchName: '',
    status: ''
  };

  try {
    // return db.collection('AccessControlDB').doc("LogInIP").add(newData);
    // return db.collection('AccessControl').doc("LogInIP").set(newData);
    let docId = getSerriesNumber('DateTime');
    // alert(docId)
    // return db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).set(newData);
       db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).set(newData);
    return docId;
  } catch (error) {
    console.log(error);
    return ""
  }
};

export const updateLoginIP = async (loginName, docId) => {
  console.log('update loginName : ',loginName, docId)
  // alert('update loginName : ' + loginName + ", doc id: " + docId)

  // let docs = await getLoginIP()

  try {
    // return await db
    //   .collection('AccessControl')
    //   .doc("Access")
    //   .collection("LogInIP")
    //   .doc(docId)
    //   .update(
    //     {
    //       lastUpdate: new Date(),
    //       loginName: loginName,
    //     },
    //     {merge: true}
    //     );
    let docUpdate= await db
      .collection('AccessControl')
      .doc("Access")
      .collection("LogInIP")
      .doc(docId)
      .update(
        {
          lastAccess: new Date(),
          loginName: loginName,
        },
        {merge: true}
        );
        // console.log('docUpdate',docUpdate);
        // alert('update loginName : ' + loginName + ", doc id: " + docId)
        return docUpdate;

        // let newData = {
        //           lastAccess: new Date(),
        //           loginName: loginName,
        //         };
        // await db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).update(newData, {merge: true});
        // alert('update loginName : ' + loginName + ", doc id: " + docId)
        
        // return true ;
  } catch (error) {
    // console.log(error);
     console.error("Error updating document: ", error);
     alert("Error updating document: ", error)
  }

//  const batch = db.batch();

// // For each document to update
// const docRef = db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId);
// batch.update(docRef, { 
//     // lastUpdate: new Date(),
//     loginName: loginName,
// });

// // Commit the batch
// await batch.commit();

  
};

export const getClientMessage = async () => {
  try {
    let data = [];
    const snapshot = await db.collection('AccessControl').doc("ClientInfo").collection("Message").get();
        snapshot.forEach((doc) => {
          // console.log('get:',doc.id, ' => ', doc.data());
          data.push({ id: doc.id, ...doc.data() });
        });
    return data;
    
  } catch (error) {
    console.log(error);
    return error; //"Error API"
  }
  
};

export const addClientMessage = async (dtRead) => {
    // alert('data ' + data.name + ", " + data.website + ", email: " + data.email + ", message: " + data.message)
    let newData = {
        dateCreated: new Date(),
        website: dtRead.website,
        name: dtRead.name,
        email: dtRead.email,
        contactNo: '',
        message: dtRead.message,
    };

    // console.log('newData:',newData)
    let data = {
      status: 500,
      data: 'none'
    };
  try {
    let docId = getSerriesNumber('DateTime');
    //  alert(docId)
    let docs = db.collection('AccessControl').doc("ClientInfo").collection('Message').doc(docId).set(newData);
    data = {
        status: 200,
        data: docs
    }
    return data;
  } catch (error) {
    console.log(error);
    data ={
        status: 400,
        error: error
    }
    return error;
  }
};



