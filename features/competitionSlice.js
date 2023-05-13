import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  video: '',
}

export const competitionSlice = createSlice({
  name: 'competition',
  initialState,
  reducers: {
       changeVideo: (state, action)=>{
            state.video=action.payload
            console.log(action.payload) 
          
       },

  },
})

// Action creators are generated for each case reducer function
export const { changeVideo} = competitionSlice.actions
export const selectedVideo = (state) => state.competition.video;

export default competitionSlice.reducer