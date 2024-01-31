
import { supabase } from "./client";
import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import logo from "./images/logo.png";
import authBg from "./images/bg-auth.jpg";
import dashMockup from "./images/dash-mockup.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate passwords match
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        throw new Error(
          "Requires at least one lowercase letter,uppercase letter, special character, and number."
        );
      }
      if (formData.password !== formData.cpassword) {
        throw new Error("Passwords do not match");
      }
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(formData.fname) || !nameRegex.test(formData.lname)) {
        throw new Error("Only alphabets are allowed for First Name and Last Name.");
      }
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        data: {
          first_name: formData.fname,
          last_name: formData.lname,
        },
      });

      if (error) {
        throw error;
      }
      alert("Check your email for a verification link");
    } catch (error) {
      alert(error);
    }

    const { data, error: insertError } = await supabase.from("users").upsert(
      [
        {
          firstname: formData.fname,
          lastname: formData.lname,
          email: formData.email,
          password: formData.password,
        },
      ],
      { onConflict: ["email"] }
    );

    if (insertError) {
      throw insertError;
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 ">
        <div className="col-span-full absolute overflow-x-hidden w-screen z-10 sm:text-white flex items-center justify-between py-2 sm:px-24 px-2">
          <div>
            <a href="#">
              <img src={logo.src} alt="" className="object-cover h-20" />
            </a>
          </div>
          <div className="">
            <a href="#" className="flex items-center">
              <HiOutlineChevronLeft className="me-2 cursor-pointer" /> Back to Home
            </a>
          </div>
        </div>
        <div className="h-screen grid justify-center">
          <div className="mt-32">
            <h1 className="text-3xl font-bold mb-6">Sign up</h1>
            <form className="flex flex-col gap-4 md:w-96" onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fname" value="First Name" />
                </div>
                <TextInput
                  id="fname"
                  type="text"
                  required
                  shadow
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lname" value="Last Name" />
                </div>
                <TextInput
                  id="lname"
                  type="text"
                  required
                  shadow
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" value="Email address" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  required
                  shadow
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <div className="">
                  <TextInput
                    id="password"
                    type="password"
                    required
                    shadow
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cpassword" value="Confirm Password" />
                </div>
                <div className="">
                  <TextInput
                    id="cpassword"
                    type="password"
                    required
                    shadow
                    value={formData.cpassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <Checkbox id="agree" checked={formData.agree} onChange={handleChange} />
                  <Label htmlFor="agree" className="flex ms-2">
                    Remember me
                  </Label>
                </div>
                <div>
                  <Label className="flex">
                    <a href="#">Forget Password</a>
                  </Label>
                </div>
              </div>
              <div className="mt-5">
                <Button
                  type="submit"
                  className="rounded-full w-full bg-indigo-700 hover:-translate-y-1 transition-all duration-300 h-14"
                >
                  <span className="text-xl">Sign up</span>
                </Button>
              </div>
              <div className="text-center mt-5">
                <h2>
                  Have an account?{" "}
                  <a
                    href="/login"
                    className="text-indigo-700 font-medium underline decoration-solid"
                  >
                    Sign in
                  </a>
                </h2>
              </div>
            </form>
          </div>
        </div>
        <div className="relative  overflow-hidden">
          <img src={authBg.src} alt="" className=" w-screen object-cover" />
          <img
            src={dashMockup.src}
            alt=""
            className="h-96 rounded-3xl absolute top-20 right-10 translate-y-52 translate-x-40"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
