const htmlHead = document.querySelector('head');

if (htmlHead && !htmlHead.querySelector('meta[charset]')) {
    const htmlMeta = document.createElement('meta');
    htmlMeta.setAttribute('charset', 'UTF-8');
    htmlHead.prepend(htmlMeta);
}
