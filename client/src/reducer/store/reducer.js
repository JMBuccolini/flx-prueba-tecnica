import { TYPES } from "../actions/actions";

const initialState = {
  allUsers: [], // Todos los usuarios
  searchedUsers: [], //Usuarios encontrados,
};

//Manejo dos valores para el estado, uno con todos los datos originales, otro con el estado donde consume la Tabla y filtros

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
          `${user.name} ${user.lastname}`
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ),
      };
    case TYPES.ADD_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
        searchedUsers: [...state.searchedUsers, action.payload],
      };
    case TYPES.EDIT_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
        searchedUsers: state.searchedUsers.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };

    case TYPES.FILTER_STATUS:
      return {
        ...state,
        searchedUsers:
          action.payload === "all"
            ? state.allUsers
            : state.allUsers.filter(
                (user) => user.status === action.payload
              ),
      };
    case TYPES.DELETE_USER:
      return{
        ...state,
        allUsers: state.allUsers.filter((user)=>user.id !== action.payload),
        searchedUsers: state.allUsers.filter((user)=>user.id !== action.payload)

      }
    default: 
    return initialState;
  }
}
