"use client";

import { authClient } from "../../../../lib/auth";


export default function Page() {

  async function doThing() {
    const { data, error } = await authClient.signUp.email({
      email: "nagmani@gmail.com",
      password: "asdasdfsadfsafdasff",
      name: "nagmani",
      image: "https://image",
      callbackURL: "/dashboard"
    }, {
      onRequest: (ctx) => {
        console.log("request sent");
      },
      onSuccess: (ctx) => {
        console.log("success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });

  }


  async function doSignin() {
    const { data, error } = await authClient.signIn.email({
      email: "nagmani@gmail.com", // user email address
      password: "asdasdfsadfsafdasff", // user password -> min 8 characters by default
      rememberMe: true,
      callbackURL: "http://localhost:3001/api/me",
    });
    console.log("data", data);
    console.log("error", error);
  }
  return <div>

    <button onClick={async () => {
      // await doThing();
      await doSignin();

    }}>click</button>

  </div>
}
