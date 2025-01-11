import { TYPES } from "../actions/actions";

const initialState = {
  allUsers: [], // Todos los usuarios
  searchedUsers:[], //Usuarios encontrados
  filteredUsers: [], // Usuarios filtrados
};


export function userReducer(state, action) {
  switch (action.type) {
    case TYPES.SET_TABLE:
      return {
        ...state,
        allUsers: action.payload,
        searchedUsers: action.payload,
      };
    case TYPES.SEARCH_USER:
      return {
        ...state,
        searchedUsers: state.allUsers.filter((user) =>
          `${user.name} ${user.lastname}`.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case TYPES.ADD_USER:
      return {
        ...state,
        allUsers:[...state.allUsers,action.payload]
      }

    case TYPES.EDIT_USER:
      return true;

    case TYPES.DELETE_USER:
      return true;
    case TYPES.FILTER_STATUS:
      
    case TYPES.FILTER_STATUS:
      return {
        ...state,
        searchedUsers: action.payload === 'all' 
          ? state.allUsers 
          : state.searchedUsers.filter((user) => user.status === action.payload)
      };

    }
}
