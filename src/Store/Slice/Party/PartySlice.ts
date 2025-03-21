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
        setParty: (state, action) => {
            state.partyId = action.payload.party_id
            state.partyName = action.payload.party_name
            state.partyMembers = action.payload.party_members
            state.partyOwner = action.payload.party_owner
            state.partyOwnerId = action.payload.party_owner_id
        },
    }
})

export const { setParty } = partySlice.actions

export default partySlice.reducer