import { configureStore } from "@reduxjs/toolkit";
import contentListingReducer from "../features/contentListingSlice";


const store = configureStore ({
    reducer : {
        contentListing : contentListingReducer
    }
})

export default store;