export const publicLinks = [
  {
    to: "/",
    name: "Home",
    icon: null,
  },
  {
    name: "Games",
    subLinks: [
      {
        to: "/snek",
        name: "Snek",
      },
    ],
  },
  {
    to: "/login",
    name: "Signin",
  },
  {
    to: "/register",
    name: "Signup",
  },
];

export const privateLinks = [
  {
    to: "/",
    name: "Home",
  },
  {
    to: "/games",
    name: "Games",
  },
  {
    to: "/editor",
    name: "New Article",
    icon: "ion-compose",
  },
  {
    to: "/settings",
    name: "Settings",
    icon: "ion-gear-a",
  },
  {
    to: "/username",
    name: "ProfileName",
  },
];
