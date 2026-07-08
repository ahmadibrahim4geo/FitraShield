/**
 * FitraShield - Offscreen Document Controller
 * يتعامل مع تفريع الـ Worker والتحويلات للـ Canvas والـ ImageData لتفادي قيود الـ CSP
 */

let worker = null;

function initWorker() {
  if (worker) return;

  const workerURL = chrome.runtime.getURL('workers/ai-worker.js');
  worker = new Worker(workerURL);

  // إعادة توجيه الرسائل من الـ Web Worker إلى الـ Service Worker (background.js)
  worker.onmessage = (event) => {
    chrome.runtime.sendMessage(event.data);
  };
  
  worker.onerror = (err) => {
    console.error("[FitraShield Offscreen] Web Worker Error: ", err);
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CLASSIFY_IN_OFFSCREEN') {
    initWorker();
    const { arrayBuffer, imageData, imgURL, requestId } = message;

    // حالة 1: الصورة مرسلة كـ ImageData جاهزة (صورة محلية)
    if (imageData) {
      worker.postMessage({ type: 'CLASSIFY', imageData, imgURL, requestId });
      return;
    }

    // حالة 2: الصورة مرسلة كـ ArrayBuffer (جلب خارجي لتفادي الـ CORS)
    if (arrayBuffer) {
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 224;
          canvas.height = 224;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, 224, 224);

          const extractedImageData = ctx.getImageData(0, 0, 224, 224);
          
          // تمرير الـ ImageData للـ Web Worker
          worker.postMessage({
            type: 'CLASSIFY',
            imageData: extractedImageData,
            imgURL,
            requestId
          });
        } catch (err) {
          chrome.runtime.sendMessage({
            type: 'RESULT',
            requestId,
            imgURL,
            verdict: 'BLOCK',
            error: 'Canvas rendering error: ' + err.message
          });
        } finally {
          URL.revokeObjectURL(url);
        }
      };

      img.onerror = () => {
        chrome.runtime.sendMessage({
          type: 'RESULT',
          requestId,
          imgURL,
          verdict: 'BLOCK',
          error: 'Image parsing failed inside offscreen'
        });
        URL.revokeObjectURL(url);
      };

      img.src = url;
    }
  }
});
