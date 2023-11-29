import React from "react";
import { useForm } from "react-hook-form";
const onSubmit = () => {};

const Profile = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <div className="xl:min-h-[550px]">
        <form
          className="mx-auto mb-5 w-[90%] rounded-md bg-white p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h6 className="mb-5 text-lg font-bold">Thông tin cá nhân</h6>
          <div className="flex gap-2">
            <label className="relative h-6 w-12">
              <input
                type="checkbox"
                onChange={(e) => {
                  // setEdit(e.target.checked);
                }}
                className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                id="custom_switch_checkbox1"
              />
              <span className="outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url(/assets/images/checked.svg)] dark:border-white-dark dark:before:bg-white-dark"></span>
            </label>
            <span> Chỉnh sửa</span>
          </div>
          <div className="mx-auto mt-12 flex  w-[80%] flex-col sm:flex-row">
            <div className="grid  flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name">Họ tên</label>
                <input
                  {...register("fullName", { required: true })}
                  id="name"
                  //  disabled={!edit}
                  type="text"
                  //  className={`${!edit ? "bg-slate-200" : ""} form-input`}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  //  value={user?.account?.email}
                  className="form-input bg-slate-200"
                  disabled={true}
                />
              </div>
              <div>
                <label htmlFor="phone">SĐT</label>
                <input
                  {...register("phoneNumber", { required: false })}
                  id="phone"
                  //  disabled={!edit}
                  type="text"
                  //  className={`${!edit ? "bg-slate-200" : ""} form-input`}
                />
              </div>
              <div>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  {...register("address", { required: true })}
                  id="address"
                  //disabled={!edit}
                  type="text"
                  // className={`${!edit ? "bg-slate-200" : ""} form-input`}
                />
              </div>
              {/* {edit && (
                <div className="mt-3 sm:col-span-2">
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
