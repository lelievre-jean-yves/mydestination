import { produce } from "immer";


const initialState = {
  status: 'void',
  data: null,
  error: null,
};

// ACTION TYPES
const FETCHING_HOTELS = 'FETCHING_HOTELS';
const RESOLVED_HOTELS = 'RESOLVED_HOTELS';
const REJECTED_HOTELS = 'REJECTED_HOTELS';

// ACTION CREATORS
export const fetchingHotels = () => ({ type: FETCHING_HOTELS });
export const resolvedHotels = (data) => ({ type: RESOLVED_HOTELS, payload: data });
export const rejectedHotels = (error) => ({ type: REJECTED_HOTELS, payload: error });

export function hotelsReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING_HOTELS: {
        if (draft.status === 'void') {
          draft.status = 'pending';
          return;
        }

        if (draft.status === 'rejected') {
          draft.status = 'pending';
          return;
        }

        if (draft.status === 'resolved') {
          draft.status = 'updating';
          return;
        }

        return;
      }
      case RESOLVED_HOTELS: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload;
          draft.status = 'resolved';
          return;
        }

        return;
      }

      case REJECTED_HOTELS: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.status = 'rejected';
          draft.error = action.payload;
          draft.data = null;
          return;
        }

        return;
      }

      default:
        return;
    }
  });
}
