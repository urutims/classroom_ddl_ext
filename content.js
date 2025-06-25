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

// トーストを表示する関数
function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        zIndex: 9999,
        fontSize: '14px',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => t.style.opacity = '0', 1200);
    setTimeout(() => t.remove(), 1600);
}

function showToastAt(msg, x, y) {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
        position: 'fixed',
        left: `${x + 10}px`,
        top: `${y + 10}px`,
        background: 'rgba(0,0,0,0.75)',
        color: 'white',
        padding: '6px 10px',
        borderRadius: '4px',
        zIndex: 2147483647,
        fontSize: '13px',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.2s ease'
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => t.style.opacity = '0', 800);
    setTimeout(() => t.remove(), 1200);
}

// Ctrl＋クリックを処理
document.body.addEventListener('click', e => {
    if (!e.ctrlKey) return;
    const a = e.target.closest('a[href]');
    if (a && isDriveLink(a.href)) {
        e.preventDefault();
        const dlUrl = convertUrl(a.href);
        chrome.runtime.sendMessage({ action: 'download', url: dlUrl });
        showToastAt('ダウンロードを開始...', e.clientX, e.clientY);
    }
}, true);