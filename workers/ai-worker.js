/**
 * FitraShield - AI Worker
 * يعمل في خيط مستقل تماماً عن واجهة المستخدم لإجراء العمليات الحسابية الثقيلة للذكاء الاصطناعي
 */

importScripts(
  self.location.origin + '/lib/tf.min.js',
  self.location.origin + '/lib/nsfwjs.min.js'
);

let model = null;
let modelLoading = false;

// التحقق من تحميل النموذج ومزامنته
async function ensureModelLoaded() {
  if (model) return true;
  if (modelLoading) {
    await new Promise(resolve => {
      const check = setInterval(() => {
        if (model) {
          clearInterval(check);
          resolve();
        }
      }, 100);
    });
    return true;
  }

  modelLoading = true;
  try {
    const modelURL = self.location.origin + '/model/';
    // تحميل النموذج المحلي بنجاح
    model = await nsfwjs.load(modelURL, { size: 224 });
    modelLoading = false;
    self.postMessage({ type: 'MODEL_READY' });
    return true;
  } catch (err) {
    modelLoading = false;
    self.postMessage({ type: 'MODEL_ERROR', error: err.message });
    return false;
  }
}

self.onmessage = async (event) => {
  const { type, imageData, imgURL, requestId } = event.data;

  if (type === 'CLASSIFY') {
    const ready = await ensureModelLoaded();
    if (!ready) {
      self.postMessage({
        type: 'RESULT',
        requestId,
        imgURL,
        verdict: 'ALLOW',
        error: 'MODEL_NOT_LOADED'
      });
      return;
    }

    try {
      // تحويل الـ ImageData إلى Tensor وإعادة ضبط أبعاده
      const imageTensor = tf.browser.fromPixels(imageData);
      const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);

      // تصنيف الصورة
      const predictions = await model.classify(resized);

      // تفريغ الذاكرة للـ Tensors فوراً لمنع تسرب الذاكرة (Memory Leak)
      imageTensor.dispose();
      resized.dispose();

      self.postMessage({
        type: 'RESULT',
        requestId,
        imgURL,
        predictions,
        verdict: null // يتم معالجته وتحديد النتيجة في الـ content script بناءً على الحساسية
      });
    } catch (err) {
      self.postMessage({
        type: 'RESULT',
        requestId,
        imgURL,
        verdict: 'BLOCK', // الأمان أولاً: عند الخطأ نقوم بالحجب وقائياً
        error: err.message
      });
    }
  }
};
