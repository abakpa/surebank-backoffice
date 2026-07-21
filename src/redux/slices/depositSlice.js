import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    deposit:null,
    loading: false,
    error:null,
};

const hasCustomerAccountPayload = (payload) => Boolean(
    payload?.account || payload?.subAccount || payload?.customer || payload?.sbWalletAccount
);

const applyActionSuccessPayload = (state, payload) => {
    state.deposit = hasCustomerAccountPayload(payload)
        ? payload
        : { ...(state.deposit || {}), ...(payload || {}) };
    state.loading = false;
};

const depositSlice = createSlice({
    name:'deposit',
    initialState,
    reducers:{
        fetchDepositRequest:(state)=>{
            state.loading = true
        },
        fetchDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchDepositFailure:(state,action)=>{
             state.error=action.payload
            state.loading=false
        },
        fetchReversalRequest:(state)=>{
            state.loading = true
        },
        fetchReversalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        fetchReversalFailure:(state,action)=>{
             state.error=action.payload
            state.loading=false
        },
        fetchDSReversalRequest:(state)=>{
            state.loading = true
        },
        fetchDSReversalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        fetchDSReversalFailure:(state,action)=>{
             state.error=action.payload
            state.loading=false
        },
        fetchFreeToWithdrawReversalRequest:(state)=>{
            state.loading = true
        },
        fetchFreeToWithdrawReversalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        fetchFreeToWithdrawReversalFailure:(state,action)=>{
             state.error=action.payload
            state.loading=false
        },
        createCostPriceRequest:(state)=>{
            state.loading = true
        },
        createCostPriceSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createCostPriceFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
        fetchCustomerAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerAccountSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerAccountFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
        fetchCustomerByIdRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerByIdSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerByIdFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
        fetchCustomerSubAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerSubAccountSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerSubAccountFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
        fetchSubAccountDepositRequest:(state)=>{
            state.loading = true
        },
        fetchSubAccountDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchSubAccountDepositFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
        createDepositRequest:(state)=>{
            state.loading=true
        },
        createDepositSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createSBDepositRequest:(state)=>{
            state.loading=true
        },
        createSBDepositSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createSBDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        fetchWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchWithdrawalSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchWithdrawalFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
        createWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createWithdrawalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createSBWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createSBWithdrawalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createSBWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createFDWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createFDWithdrawalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createFDWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createSBSellProductRequest:(state)=>{
            state.loading=true
        },
        createSBSellProductSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createSBSellProductFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createFDMaturedWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createFDMaturedWithdrawalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createFDMaturedWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createMainWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createMainWithdrawalSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createMainWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createMainDepositRequest:(state)=>{
            state.loading=true
        },
        createMainDepositSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createMainDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createWalletToSBTransferRequest:(state)=>{
            state.loading=true
        },
        createWalletToSBTransferSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createWalletToSBTransferFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerAccountSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerSBAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerSBAccountSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createCustomerSBAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerFDAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerFDAccountSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        createCustomerFDAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerAccountSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        editCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerSBAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerSBAccountSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        editCustomerSBAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerFDAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerFDAccountSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
        editCustomerFDAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        clearDepositError: (state) => {
            state.error = null; // Reset error state
          },
          updatePhoneRequest:(state)=>{
            state.loading = true
        },
       updatePhoneSuccess:(state,action)=>{
            applyActionSuccessPayload(state, action.payload)
        },
       updatePhoneFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        }
    }
})

export const {
    fetchDepositRequest,
    fetchDepositSuccess,
    fetchDepositFailure,
    fetchReversalRequest,
    fetchReversalSuccess,
    fetchReversalFailure,
    fetchDSReversalRequest,
    fetchDSReversalSuccess,
    fetchDSReversalFailure,
    fetchFreeToWithdrawReversalRequest,
    fetchFreeToWithdrawReversalSuccess,
    fetchFreeToWithdrawReversalFailure,
    createCostPriceRequest,
    createCostPriceSuccess,
    createCostPriceFailure,
    fetchCustomerAccountRequest,
    fetchCustomerAccountSuccess,
    fetchCustomerAccountFailure,
    fetchCustomerByIdRequest,
    fetchCustomerByIdSuccess,
    fetchCustomerByIdFailure,
    fetchCustomerSubAccountRequest,
    fetchCustomerSubAccountSuccess,
    fetchCustomerSubAccountFailure,
    fetchSubAccountDepositRequest,
    fetchSubAccountDepositSuccess,
    fetchSubAccountDepositFailure,
    createDepositRequest,
    createDepositSuccess,
    createDepositFailure,
    createSBDepositRequest,
    createSBDepositSuccess,
    createSBDepositFailure,
    fetchWithdrawalRequest,
    fetchWithdrawalSuccess,
    fetchWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createSBWithdrawalRequest,
    createSBWithdrawalSuccess,
    createSBWithdrawalFailure,
    createFDWithdrawalRequest,
    createFDWithdrawalSuccess,
    createFDWithdrawalFailure,
    createSBSellProductRequest,
    createSBSellProductSuccess,
    createSBSellProductFailure,
    createFDMaturedWithdrawalRequest,
    createFDMaturedWithdrawalSuccess,
    createFDMaturedWithdrawalFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure,
    createMainDepositRequest,
    createMainDepositSuccess,
    createMainDepositFailure,
    createWalletToSBTransferRequest,
    createWalletToSBTransferSuccess,
    createWalletToSBTransferFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    createCustomerSBAccountRequest,
    createCustomerSBAccountSuccess,
    createCustomerSBAccountFailure,
    createCustomerFDAccountRequest,
    createCustomerFDAccountSuccess,
    createCustomerFDAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure,
    editCustomerSBAccountRequest,
    editCustomerSBAccountSuccess,
    editCustomerSBAccountFailure,
    editCustomerFDAccountRequest,
    editCustomerFDAccountSuccess,
    editCustomerFDAccountFailure,
    clearDepositError,
    updatePhoneRequest,
    updatePhoneSuccess,
    updatePhoneFailure
} = depositSlice.actions

export default depositSlice.reducer
