import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../axios/axios'

export const fetchData = createAsyncThunk(
  'contentListing/fetchData',
  async (page) => {
    try {
      const response = await client.get(`/data/page${page}.json`)

      const data = response.data?.page?.['content-items']?.content || []

      const title = response.data?.page?.title
      console.log('here', data, title, page)
      return { data, page, title }
    } catch (error) {
      return { data: [] }
    }
  },
)

const contentListingSlice = createSlice({
  name: 'contentListing',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    hasMore: true,
    title: '',
    filteredList: [],
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      contentListingSlice.caseReducers.filterContentListing(state)
    },
    filterContentListing: (state) => {
      const { searchTerm, data, filteredList } = state
      let filteredData = []
      if (data.length > 0) {
        if (searchTerm.length > 0) {
          filteredData = filteredList.filter((item) =>
            item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
          )
        } else {
          filteredData = [...state.data]
        }

        state.filteredList = filteredData
      }

      state.isLoading = false // Set loading to false after filtering
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action?.payload?.data?.length) {
          console.log('action.payload', action.payload)
          state.data = [...state.data, ...action.payload.data]
          state.isLoading = false
          state.currentPage = action.payload.page
          state.title = action.payload.title
          state.hasMore = action.payload.data.length > 0
          contentListingSlice.caseReducers.filterContentListing(state)
        } else {
          state.isLoading = false
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})
export const {
  setSearchTerm,
  filterContentListing,
} = contentListingSlice.actions
export default contentListingSlice.reducer
