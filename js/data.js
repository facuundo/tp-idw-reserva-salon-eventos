export const initLocalStorage = () => {
    if (!localStorage.getItem("salones")) {
        localStorage.setItem("salones", JSON.stringify([]));
    }
};
