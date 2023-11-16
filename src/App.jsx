import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "./redux/slices/userSlice";
import { getInfo } from "./services/authService";

const cuocThi = {
  name: "Lập trình web",
  status: 2,
  time: "20-10-2021",
  address: "B201",
};

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
      dispatch(updateUserInfo(data));
    },
  });

  return <></>;
}

export default App;
