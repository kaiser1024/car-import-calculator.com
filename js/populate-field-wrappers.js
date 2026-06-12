document.addEventListener("DOMContentLoaded", () => {

    const formContainer = document.querySelector(`.${formID}`);


    if (typeof formData === "undefined") {
        console.warn("formData is not defined");
        return;
    }

    Object.entries(formData).forEach(([formID, questions]) => {

        if (!formContainer) {
            console.warn(`Missing container: .${formID}`);
            return;
        }

        Object.entries(questions).forEach(([questionID, questionParameters]) => {

            const formquestionWrapper = document.createElement("div");
            formquestionWrapper.id = questionID;
            formquestionWrapper.dataset.parent = questionParameters.parent;

            const isVisible = questionParameters.active && questionParameters.parent === "noparent";

            formquestionWrapper.className = isVisible
                ? "formquestion-wrapper-on"
                : "formquestion-wrapper";

            /* ---------- LABEL ---------- */
            if (questionParameters.questiontext) {
                const formquestionLabel = document.createElement("label");
                formquestionLabel.setAttribute("for", questionID);
                formquestionLabel.textContent = questionParameters.questiontext;
                formquestionWrapper.appendChild(formquestionLabel);
            }

            /* ---------- MTD ---------- */
            if (
                questionParameters.selecttype === "mtd" &&
                questionParameters.mtdstart &&
                questionParameters.mtdtype
            ) {
                const startYear = Number(questionParameters.mtdstart.slice(2));

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

    });

});
