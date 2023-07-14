const getUserIdFromLocalStorage = () => localStorage.getItem("user_id");
const setUserIdInLocalStorage = (id) => localStorage.setItem("user_id", id);

export { getUserIdFromLocalStorage, setUserIdInLocalStorage }