const headings = [];
const ancestors = [];

document.querySelectorAll(".post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6").forEach(element => {
    const node = {
        level: Number(element.tagName.slice(1)),
        id: element.id,
        title: element.textContent,
        children: []
    };

    while (ancestors.length && ancestors.at(-1).level >= node.level) {
        ancestors.pop();
    }
    const siblings = ancestors.length ? ancestors.at(-1).children : headings;
    siblings.push(node);
    ancestors.push(node);
});

function renderHeadings(nodes, list) {
    for (const node of nodes) {
        if (!node.id) continue;

        const item = document.createElement("li");
        const link = document.createElement("a");
        link.setAttribute("href", `#${node.id}`);
        link.textContent = node.title;
        item.append(link);

        if (node.children.length) {
            const submenu = document.createElement("ul");
            submenu.className = "sub-menu";
            renderHeadings(node.children, submenu);
            item.append(submenu);
        }
        list.append(item);
    }
}

if (headings.length) {
    const title = document.createElement("h3");
    title.textContent = "Table of Content";
    const list = document.createElement("ol");
    renderHeadings([{ id: "top", title: "Top", children: [] }, ...headings], list);
    document.querySelector("#content-menu")?.append(title, list);
}
