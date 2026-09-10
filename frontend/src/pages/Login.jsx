import React from "react";
import { useNavigate } from 'react-router-dom';
import "./messages.css"; 
import { useForm } from "react-hook-form";
import { usePageTitle } from '../UsePageTitle'

const Messagepage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


  usePageTitle("Contact - Harshyyy");
    const onSubmit = async (data) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
            }),
          }
        );

        const result = await response.json();

        if (result.exists) {
          // User exists → go to homepage
          navigate("/homepage");
        } else {
            // navigate("/Register");
          alert("User does not exist. Please register first.");
        }

      } catch (error) {
        console.error(error);
        alert("Unable to connect to server");
      }
    };

  // const onSubmit = async (data) => {
  //   try{
  //   let r = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //   })
  //   const formdata = await r.json();
  //   if (r.ok) {
  //     alert("Your message has been sent succesfully")
  //   };
  // }catch (error) {
  //   console.error(error)
  //   alert("Error sending Message")
  // }
  // };

  return (
    <>
    <div className="main-div">
      <div className="main-body">
        <div className="message-contents">
          <h1>Contact</h1>
          <div className="int-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="Name"
                {...register("name", {
                  required: { value: true, message: "This Field is required" },
                  maxLength: { value: 15, message: "Max length is 15" },
                })}
                type="text"
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "This Field is required" },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
              <textarea
                type="text"
                placeholder="Message"
                {...register("message", {
                  required: { value: true, message: "This Field is required" },
                  minLength: { value: 10, message: "Min length is 10" },
                })}
              />
              {errors.messages && (
                <p className="error">{errors.message.message}</p>
              )}
              <button className="cursor-pointer" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Messagepage;
