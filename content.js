// function isDriveLink(url) {
//     return /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/.test(url);
// }

// function convertUrl(orig) {
//     const m = orig.match(/\/d\/([^/]+)/);
//     return m
//         ? `https://drive.usercontent.google.com/u/0/uc?id=${m[1]}&export=download`
//         : orig;
// }

// function injectButtons() {
//     const anchors = document.querySelectorAll("a[href]");
//     anchors.forEach(a => {
//         if (isDriveLink(a.href) && !a.dataset.converted) {
//             a.dataset.converted = "true";
//             const btn = document.createElement("button");
//             btn.textContent = "⬇DL";
//             btn.style.marginLeft = "4px";
//             btn.onclick = e => {
//                 e.preventDefault();
//                 const dlUrl = convertUrl(a.href);
//                 chrome.runtime.sendMessage({ action: "download", url: dlUrl });
//             };
//             a.insertAdjacentElement("afterend", btn);
//         }
//     });
// }
// setInterval(injectButtons, 1000);


function isDriveLink(u) {
    return /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/.test(u);
}
function convertUrl(o) {
    const m = o.match(/\/d\/([^/]+)/);
    return m ? `https://drive.usercontent.google.com/u/0/uc?id=${m[1]}&export=download` : o;
}

// Ctrl＋クリックを処理
document.body.addEventListener('click', e => {
    if (!e.ctrlKey) return;
    const a = e.target.closest('a[href]');
    if (a && isDriveLink(a.href)) {
        e.preventDefault();
        const dlUrl = convertUrl(a.href);
        chrome.runtime.sendMessage({ action: 'download', url: dlUrl });
    }
}, true);
