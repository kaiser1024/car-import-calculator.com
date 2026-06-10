document.addEventListener("DOMContentLoaded", () => {
    // 1. Find all elements with class starting with "loadform-"
    const loadFormDivs = document.querySelectorAll('[class*="loadform-"]');

    loadFormDivs.forEach(div => {
        // 2. Get the specific class that starts with loadform-
        const loadClass = [...div.classList].find(c => c.startsWith("loadform-"));
        if (!loadClass) return;

        // 3. Extract key (remove prefix)
        const key = loadClass.replace("loadform-", "");

        // 4. Find corresponding data
        const section = formData[key];
        if (!section) {
            console.warn(`No formData found for key: ${key}`);
            return;
        }

        // 5. Loop through items
        Object.entries(section).forEach(([itemKey, itemData]) => {
            if (!itemData.active) return; // only active items

            // 6. Create wrapper
            const wrapper = document.createElement("div");
            wrapper.className = "form-item-wrapper";
            wrapper.dataset.key = itemKey;
            wrapper.dataset.parent = itemData.parent;

            // OPTIONAL: add placeholder content (replace later with real fields)
            wrapper.innerHTML = `
                <div class="form-item">
                    <label>${itemKey}</label>
                    <input type="text" name="${itemKey}">
                </div>
            `;

            // 7. Append to container
            div.appendChild(wrapper);
        });
    });
});
