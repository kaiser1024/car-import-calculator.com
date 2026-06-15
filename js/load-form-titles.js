document.addEventListener("DOMContentLoaded", () => {

  if (
    typeof dictionary !== "object" ||
    !dictionary.formtitles
  ) return;

  const forms = document.querySelectorAll("form");

  // level 1: vehicle type (m1, moto)
  Object.keys(dictionary.formtitles).forEach(vehicleKey => {

    const vehicleGroup = dictionary.formtitles[vehicleKey];
    if (!vehicleGroup) return;

    // level 2: export country (coofexpbe, coofexpde)
    Object.keys(vehicleGroup).forEach(countryKey => {

      const translations = vehicleGroup[countryKey];
      if (!translations) return;

      forms.forEach(form => {

        // ✅ form must match BOTH classes
        if (!form.classList.contains(vehicleKey)) return;
        if (!form.classList.contains(countryKey)) return;

        // ✅ avoid duplicate titles
        if (form.previousElementSibling?.classList.contains("form-title")) {
          return;
        }

        // ✅ resolve language from form class
        const langClass = Array.from(form.classList)
          .find(cls => cls.startsWith("lang-"));

        const lang = langClass
          ? langClass.replace("lang-", "")
          : "en";

        const titleText = translations[lang] || translations["en"];
        if (!titleText) return;

        // ✅ build DOM
        const wrapper = document.createElement("div");
        wrapper.classList.add("form-title");

        const heading = document.createElement("h2");
        heading.textContent = titleText;

        wrapper.appendChild(heading);

        // ✅ insert before form
        form.parentNode.insertBefore(wrapper, form);
      });
    });
  });

});
