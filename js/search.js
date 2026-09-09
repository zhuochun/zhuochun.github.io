const separators = document.querySelectorAll(".post-seperator");
const posts = Array.from(document.querySelectorAll(".post"), element => ({
    text: element.textContent.toLowerCase().trim(),
    element
}));
const search = document.querySelector("#search");

search?.addEventListener("keyup", () => {
    const key = search.value.toLowerCase().trim();
    posts.forEach(({ text, element }) => {
        element.classList.toggle("hidden", !text.includes(key));
    });
    separators.forEach(element => element.classList.toggle("hidden", key.length > 0));
});

document.querySelectorAll(".pure-form").forEach(form => {
    form.addEventListener("submit", event => event.preventDefault());
});
