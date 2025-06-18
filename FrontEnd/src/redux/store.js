import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authslice"
import JobSlice from "./jobSlice"
import companySlice from "./companySlice"
import applicationSlice from "./application"

const store=configureStore({
     reducer:{
      auth:   authSlice,
     job:JobSlice,
     company:companySlice,

       application:applicationSlice
     }
})
export default store;
