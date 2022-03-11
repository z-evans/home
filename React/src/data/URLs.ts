const defaultPath = "/api";

const URLs = {
  PAGE: {
    Login: "/",
    Register: "/register",
    Dashboard: {
      Home: "/dashboard",
      Files: "/dashboard/files",
      Notes: "/dashboard/notes",
    },
  },
  API: {
    POST: {
      User: {
        Register: `${defaultPath}/user/register`,
      },
      Files: {
        Info: `${defaultPath}/files`,
      },
    },
    GET: {
      User: {
        Auth: `${defaultPath}/user`,
        Login: `${defaultPath}/user/login`,
      },
      Files: `${defaultPath}/files`,
    },
    PUT: {
      Files: `${defaultPath}/files`,
    },
  },
};

export default URLs;
