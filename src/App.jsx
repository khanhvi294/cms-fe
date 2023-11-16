import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "./redux/slices/userSlice";
import { getInfo } from "./services/authService";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <LoginPage />,
  //   },
  // ]);
  const { isLogin } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useQuery({
    queryKey: ["user"],
    queryFn: getInfo,
    enabled: !!isLogin,
    onSuccess: (data) => {
      dispatch(updateUserInfo(data.data));
    },
  });

  return <></>;
}

export default App;
