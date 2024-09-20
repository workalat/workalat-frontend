import Link from "next/link";

export default function ForgetPassword() {
  return (
      <div className="w-full h-[80vh] flex items-center justify-center">
          <div className="w-full md:w-[500px] p-4 border rounded-lg shadow-lg">
              <h1 className="text-center text-3xl font-semibold">Forgot Password</h1>
              <form className="w-full pt-5">
                  <div className="py-2">
                      <label htmlFor="email" className="block text-xl font-semibold">Email</label>
                      <input type="email" required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" placeholder="Email" />
                  </div>
                  <div className="py-2">
                      <button type="submit" className="w-full py-2 px-3 text-black font-semibold bg-[#FFBE00]">Send reset password instructions</button>
                  </div>
                  <div className="py-2">
                      <div className="flex justify-center gap-2 pt-5">
                          <p className="text-[15px] font-semibold">Already Have Account ?</p>
                          <Link className="text-[15px] font-semibold underline underline-offset-4" href="/login">Login</Link>
                      </div>
                  </div>
              </form>
          </div>
    </div>
  )
}
