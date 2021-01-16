export const getTokenConfig = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
