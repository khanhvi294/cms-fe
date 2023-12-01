import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, repassword } = data;
    if (password === repassword) {
      //  changePassword({ expassword: data.expassword, password: data.password });
    } else {
      // setError('Mật khẩu không trùng!');
    }
    // setValuePass('password', '');
    // setValuePass('expassword', '');
    // setValuePass('repassword', '');
  };

  return (
    <form className="mx-auto mb-5 w-[90%] rounded-md bg-white p-4 dark:border-[#191e3a] dark:bg-black">
      <h6 className="mb-5 text-lg font-bold">Thay đổi mật khẩu</h6>

      <div className="mx-auto mt-12 flex  w-[80%] flex-col sm:flex-row">
        <div className=" flex w-[400px] flex-col gap-5">
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input
              {...register("expassword", { required: true, minLength: 6 })}
              id="password"
              type="password"
              className="form-input"
              placeholder="Mật khẩu"
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu mới</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              id="password"
              type="password"
              className="form-input"
              placeholder="Mật khẩu"
            />
          </div>
          <div>
            <label htmlFor="password">Nhập lại mật khẩu</label>
            <input
              {...register("repassword", { required: true, minLength: 6 })}
              type="password"
              className="form-input"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          {/* {error && <Alert severity="error">{error}</Alert>} */}
          <div className="mt-3 sm:col-span-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
