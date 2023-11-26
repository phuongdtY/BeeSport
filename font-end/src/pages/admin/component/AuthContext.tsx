import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import request, { requestDangNhap } from "~/utils/request";
import { DangNhapRequest, DataType } from "~/interfaces/taiKhoan.type";
import { useContext } from "react";

interface AuthContextType {
  taikhoan: DangNhapRequest;
  isAuthenticated: boolean|null;
  login: (values : DangNhapRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
  taikhoan: null,
  isAuthenticated: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "/sign-in":
      return {
        ...state,
        taikhoan: action.payload,
        isAuthenticated: true,
      };
    case "/logout":
      return {
        ...state,
        taikhoan: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
}


const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ taikhoan, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [data, setData] = useState<DangNhapRequest | undefined>();

  useEffect(() => {
    const fetchDataAndLoadData = async () => {
      try {
        const res = await requestDangNhap.post("/sign-in");
        console.log("aaa"+res)
        setData(res.data);
      } catch (error) {
        // Handle error appropriately
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndLoadData();
  }, [taikhoan]);

  const login = (values : DangNhapRequest) => {
    console.log(values)
    if (values.email === data?.email && values.matKhau === data?.matKhau) {
      dispatch({ type: "/sign-in", payload: taikhoan });
    }
  };

  const logout = () => {
    dispatch({ type: "/logout" });
  };

  return (
    <AuthContext.Provider value={{ taikhoan, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
export { useAuth, AuthProvider };
