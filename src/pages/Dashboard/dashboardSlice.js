import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report : {},
  approvalList : [],
  approvalDiscountList : []
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setReport : (state, actions) => {
      state.report = actions.payload
    },
    setApprovalList : (state, actions) => {
      state.approvalList = actions.payload
    },
    setAprovalDiscountList : (state, actions) => {
      state.approvalDiscountList = actions.payload
    }
  },
});

export const { setReport, setApprovalList, setAprovalDiscountList } = dashboardSlice.actions
export default dashboardSlice.reducer;
