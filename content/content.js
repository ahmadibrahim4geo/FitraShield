/**
 * FitraShield - Content Script
 * يمثل نقطة الدخول لحقن محرك التضبيب الوقائي عند تحميل أي موقع
 */

// جلب الإعدادات من الخلفية عند بدء تحميل المستند لتجنب وميض الصور غير المحجوبة
chrome.runtime.sendMessage({ type: 'GET_BLUR_SETTINGS' }, (response) => {
  if (chrome.runtime.lastError) {
    console.warn("[FitraShield] Failed to contact service worker: ", chrome.runtime.lastError.message);
    return;
  }

  if (response && response.blurEnabled) {
    FitraBlurEngine.init({
      enabled: response.blurEnabled,
      sensitivity: response.blurSensitivity || 'standard',
      whitelist: response.blurWhitelist || [],
      blurRadius: response.blurRadius ?? 30,
      blurGrayscale: response.blurGrayscale !== undefined ? response.blurGrayscale : true
    });
  }
});
