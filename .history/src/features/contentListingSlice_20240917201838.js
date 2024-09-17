import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../axios/axios'

export const fetchData = createAsyncThunk(
  'contentListing/fetchData',
  async (page, { rejectWithValue }) => {
    try {
      const response = await client.get(`/data/page${page}.json`)

      const data = response.data?.page?.['content-items']?.content || []

      const title = response.data?.page?.title

      return { data, page, title }
    } catch (error) {
      return rejectWithValue('Error fetching data')
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
      const { searchTerm, data } = state
      let filteredData = []
      if (data.length > 0) {
        if (searchTerm.length > 0) {
          filteredData = [...state.data].filter((item) =>
            item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
          )
        } else {
          filteredData = [...state.data]
        }

        state.filteredList = filteredData
      }

      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action.payload?.data?.length) {
          state.data = [...state.data, ...action.payload.data]
          state.currentPage = action.payload.page
          state.title = action.payload.title
          state.hasMore = action.payload.data.length > 0
          contentListingSlice.caseReducers.filterContentListing(state)
        } else {
          state.hasMore = false
        }
        state.isLoading = false
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.hasMore = false
      })
  },
})
export const {
  setSearchTerm,
  filterContentListing,
} = contentListingSlice.actions
export default contentListingSlice.reducer
