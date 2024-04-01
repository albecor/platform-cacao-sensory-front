import { createContext, useContext, useReducer } from "react";
import { node } from "prop-types";

const CacaoContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "USER": {
      return { ...state, user: action.value };
    }
    case "PRODUCERS": {
      return { ...state, producers: action.value };
    }
    case "EDIT_PRODUCER": {
      const producers = [...state.producers].map((p) => {
        if (p._id === action.value._id) {
          return { ...action.value };
        }
        return p;
      });
      return { ...state, producers };
    }
    case "FARMS": {
      return { ...state, farms: action.value };
    }
    case "ADD_FARM": {
      return { ...state, farms: [...state.farms, action.value] };
    }
    case "EDIT_FARM": {
      const farms = [...state.farms].map((f) => {
        if (f._id === action.value._id) {
          return { ...action.value };
        }
        return f;
      });
      return { ...state, farms };
    }
    case "ROUTES": {
      return { ...state, routes: action.value };
    }
    case "ROLES": {
      return { ...state, roles: action.value };
    }
    case "STATES": {
      return { ...state, states: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = {
  miniSidenav: false,
  producers: [],
  farms: [],
  user: { name: "", token: null, document: null, number: null, email: "" },
  routes: [],
  roles: [],
  states: [],
};

const AppContextProvider = ({ children }) => {
  const [controller, dispatch] = useReducer(reducer, initialState);
  return (
    <CacaoContext.Provider value={[controller, dispatch]}>
      {children}
    </CacaoContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: node.isRequired,
};

const useCacaoContext = () => useContext(CacaoContext);

export { AppContextProvider, useCacaoContext, initialState };
