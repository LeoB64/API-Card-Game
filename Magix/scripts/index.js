
window.addEventListener("load", () => {
    if (localStorage["UserName"] != null) {
        document.querySelector("#username").value = localStorage["UserName"];
    }
})


const remberLogInName = () => {
    localStorage["UserName"] = document.querySelector("#username").value;
}