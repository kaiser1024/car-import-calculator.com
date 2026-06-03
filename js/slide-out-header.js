const topbar = document.querySelector('header');
let lastScroll = window.pageYOffset;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    topbar.classList.remove('hidden');
    return;
  }

if (Math.abs(currentScroll - lastScroll) < 5 return;

if (currentScroll > lastScroll) {
    topbar.classList.add('hidden');
} else {
  topbar.classList.remove('hidden');
}

  lastScroll = currentScroll;
});
                        
