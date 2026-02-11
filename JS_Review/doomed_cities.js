const startBtn = document.querySelector("#start");
const app = document.querySelector("#app");

startBtn.addEventListener("click", () => {

    const cities = [];

    for (let i = 0; i < 5; i++) {
        let guess = prompt(`Enter city #${i + 1}:`);

        if (guess === null) guess = "";
        guess = guess.trim();
        if (guess === "") guess = "(blank)";

        cities.push(guess);
    }

    app.innerHTML = "";

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    const thOrder = document.createElement("th");
    thOrder.textContent = "Order";

    const thCity = document.createElement("th");
    thCity.textContent = "Doomed Cities";

    headRow.append(thOrder, thCity);
    thead.appendChild(headRow);

    const tbody = document.createElement("tbody");

    for (let i= 0; i < cities.length; i++) {
        const tr = document.createElement("tr");

        const tdOrder = document.createElement("td");
        tdOrder.textContent = i + 1;

        const tdCity = document.createElement("td");
        tdCity.textContent = cities[i];

        tr.append(tdOrder, tdCity);
        tbody.appendChild(tr);
    }

    table.append(thead, tbody);
    app.appendChild(table);

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = "Array contents: [" + cities.join(", ") + "]";
    app.appendChild(caption);

    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = "<b>Learning note:</b> This table was generated with JavaScript using <code>createElement</code> and <code>append</code>.";
    app.appendChild(note);
});