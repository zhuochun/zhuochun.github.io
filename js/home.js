const date = new Date();
const hour = date.getHours();
const greeting = hour <= 5 ? "Hello" :
                 hour <= 12 ? "Good morning" :
                 hour <= 18 ? "Good afternoon" : "Good evening";

document.querySelectorAll(".greeting").forEach(element => {
    element.textContent = greeting;
});
document.querySelectorAll(".sidebar").forEach(element => {
    element.classList.add(`sidebar-color-${date.getDay()}`);
});
