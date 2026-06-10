document.addEventListener("DOMContentLoaded", () => {

    if (typeof formData === "undefined") {
        console.warn("formData or selectlist is not defined");
        return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    Object.entries(formData).forEach(([formID, formFields]) => {

        const formContainer = document.querySelector(`.${formID}`);
        if (!formContainer) {
            console.warn(`Missing container: .${formID}`);
            return;
        }

       Object.entries(formFields).forEach(([itemKey, itemValue]) => {

    const formfieldWrapper = document.createElement("div");
    formfieldWrapper.id = itemKey;
    formfieldWrapper.dataset.parent = itemValue.parent;

    const isVisible = itemValue.active && itemValue.parent === "none";

    formfieldWrapper.className = isVisible
        ? "formfield-wrapper-on"
        : "formfield-wrapper";

    /* ---------- LABEL ---------- */
    if (itemValue.label) {
        const label = document.createElement("label");
        label.setAttribute("for", itemKey);
        label.textContent = itemValue.label;
        formfieldWrapper.appendChild(label);
    }

    /* ---------- MTD ---------- */
    if (
        itemValue.selecttype === "mtd" &&
        itemValue.mtdstart &&
        itemValue.mtdtype
    ) {
        const startYear = Number(itemValue.mtdstart.slice(2));

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

        yearSelect.selectedIndex = 1;
        populateMonths(yearSelect.value);

        yearSelect.addEventListener("change", () => {
            populateMonths(yearSelect.value);
        });

        if (itemValue.mtdtype === "mmyyyy") {
            formfieldWrapper.appendChild(monthSelect);
            formfieldWrapper.appendChild(yearSelect);
        } else {
            formfieldWrapper.appendChild(yearSelect);
            formfieldWrapper.appendChild(monthSelect);
        }

        formContainer.appendChild(formfieldWrapper);
        return;
    }

    /* ---------- LIST / YTD ---------- */
    if (itemValue.select) {
        const selectCount = Number(itemValue.select);

        for (let i = 0; i < selectCount; i++) {
            const select = document.createElement("select");

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Select...";
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);

            if (itemValue.selecttype === "list" && selectlist?.[itemKey]) {
                Object.entries(selectlist[itemKey]).forEach(([v, l]) => {
                    const opt = document.createElement("option");
                    opt.value = v;
                    opt.textContent = l;
                    select.appendChild(opt);
                });
            }

            if (itemValue.selecttype === "ytd" && itemValue.ytdstart) {
                const startYear = Number(itemValue.ytdstart);
                for (let y = currentYear; y >= startYear; y--) {
                    const opt = document.createElement("option");
                    opt.value = y;
                    opt.textContent = y;
                    select.appendChild(opt);
                }
            }

            formfieldWrapper.appendChild(select);
        }
    }

    formContainer.appendChild(formfieldWrapper);
});
