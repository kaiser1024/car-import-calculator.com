const htmlHead = document.querySelector('head');

if (htmlHead && !htmlHead.querySelector('meta[charset]')) {
    const htmlMeta = document.createElement('meta');
    htmlMeta.setAttribute('charset', '');
    htmlHead.prepend(htmlMeta);
}
