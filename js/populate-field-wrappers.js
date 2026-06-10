document.addEventListener("DOMContentLoaded", () => {

    if (typeof formData === "undefined" || typeof selectlist === "undefined") {
        console.warn("formData or selectlist is not defined");
        return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 1–12

    Object.entries(formData).forEach(([formID, formFields]) => {

        const formContainer = document.querySelector(`.${formID}`);
        if (!formContainer) {
            console.warn(`Missing container: .${formID}`);
            return;
        }

        Object.entries(formFields).forEach(([itemKey, itemValue]) => {

            if (!itemValue.active) return;

            const wrapper = document.createElement("div");
            wrapper.id = itemKey;
            wrapper.dataset.parent = itemValue.parent;

            const isRoot = itemValue.parent === "none";

            wrapper.className = isRoot
                ? "formfield-wrapper-on"
                : "formfield-wrapper";

            /* ---------- LABEL ---------- */
            if (isRoot && itemValue.label) {
                const label = document.createElement("label");
                label.setAttribute("for", itemKey);
                label.textContent = itemValue.label;
                wrapper.appendChild(label);
            }

         /* ---------- SELECT(S) ---------- */
if (!isRoot) {
    formContainer.appendChild(wrapper);
    return;
}

/* ===== MTD TYPE (special case, STOP generic logic) ===== */
if (
    itemValue.selecttype === "mtd" &&
    itemValue.mtdstart &&
    itemValue.mtdtype
) {
    const startYear = Number(itemValue.mtdstart.slice(2)); // "011950" → 1950

    const yearSelect = document.createElement("select");
    const monthSelect = document.createElement("select");

    const addPlaceholder = (select, text) => {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = text;
        opt.disabled = true;
        opt.selected = true;
        select.appendChild(opt);
    };

    addPlaceholder(yearSelect, "Year");
    addPlaceholder(monthSelect, "Month");

    // populate years
    for (let y = currentYear; y >= startYear; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
        
    }
 
    

    const populateMonths = (year) => {
        monthSelect.innerHTML = "";
        addPlaceholder(monthSelect, "Month");

        const maxMonth =
            Number(year) === currentYear ? currentMonth : 12;

        for (let m = 1; m <= maxMonth; m++) {
            const val = String(m).padStart(2, "0");
            const opt = document.createElement("option");
            opt.value = val;
            opt.textContent = val;
            monthSelect.appendChild(opt);
        }
    };

    // ✅ initialize months immediately
yearSelect.selectedIndex = 1;
populateMonths(yearSelect.value);

    yearSelect.addEventListener("change", () => {
        populateMonths(yearSelect.value);
    });

    // order
    if (itemValue.mtdtype === "mmyyyy") {
        wrapper.appendChild(monthSelect);
        wrapper.appendChild(yearSelect);
    } else {
        wrapper.appendChild(yearSelect);
        wrapper.appendChild(monthSelect);
    }

    formContainer.appendChild(wrapper);
    return; // ✅ IMPORTANT: stop here
}

/* ===== LIST & YTD (generic select logic) ===== */
const selectCount = Number(itemValue.select);

for (let i = 0; i < selectCount; i++) {
    const select = document.createElement("select");

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select...";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    // LIST
    if (itemValue.selecttype === "list") {
        const list = selectlist[itemKey];
        if (list) {
            Object.entries(list).forEach(([value, label]) => {
                const opt = document.createElement("option");
                opt.value = value;
                opt.textContent = label;
                select.appendChild(opt);
            });
        }
    }

    // YTD
    if (itemValue.selecttype === "ytd" && itemValue.ytdstart) {
        const startYear = Number(itemValue.ytdstart);
        for (let y = currentYear; y >= startYear; y--) {
            const opt = document.createElement("option");
            opt.value = y;
            opt.textContent = y;
            select.appendChild(opt);
        }
    }

    wrapper.appendChild(select);
}

formContainer.appendChild(wrapper);
        });
    });
});
