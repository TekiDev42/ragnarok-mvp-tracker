import { createSlice } from "@reduxjs/toolkit";

const initialState: PartyState = {
    partyId: null,
    partyName: null,
    partyMembers: [],
    partyOwner: null,
    partyOwnerId: null,
}

export const partySlice = createSlice({
    name: "party",
    initialState,
    reducers: {
        setPartyId: (state, action) => {
            state.partyId = action.payload
        },
        setPartyName: (state, action) => {
            state.partyName = action.payload
        },
        setPartyMembers: (state, action) => {
            state.partyMembers = action.payload
        },
        setPartyOwner: (state, action) => {
            state.partyOwner = action.payload
        },
        setPartyOwnerId: (state, action) => {
            state.partyOwnerId = action.payload
        },
    }
})

export const { setPartyId, setPartyName, setPartyMembers, setPartyOwner, setPartyOwnerId } = partySlice.actions

export default partySlice.reducer