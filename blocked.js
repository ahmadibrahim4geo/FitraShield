/**
 * FitraShield - Blocked Page Script
 * يدير عرض تفاصيل الموقع المحجوب وإرسال طلبات الاستثناء بأمان
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── استخراج معلمات الرابط ───
  const params = new URLSearchParams(window.location.search);
  const originalUrl = params.get('url') || 'موقع غير معروف';
  const reason = params.get('reason') || 'تطابق كلمة دلالية محظورة';
  const keyword = params.get('keyword') || '';

  // ─── عرض بيانات الحجب في صندوق المعلومات ───
  const urlEl = document.getElementById('blocked-url');
  const reasonEl = document.getElementById('blocked-reason');
  
  if (urlEl) urlEl.textContent = originalUrl;
  if (reasonEl) reasonEl.textContent = reason;

  // عرض الكلمة المرصودة فقط إذا كانت موجودة
  if (keyword && keyword.trim() !== '') {
    const keywordItem = document.getElementById('keyword-item');
    const keywordBadge = document.getElementById('blocked-keyword');
    if (keywordItem) keywordItem.style.display = '';
    if (keywordBadge) keywordBadge.textContent = keyword;
  }

  // ─── زر العودة للأمان ───
  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  // ─── زر طلب استثناء من الوالدين ───
  const btnException = document.getElementById('btn-exception');
  const confirmationMsg = document.getElementById('confirmation-msg');

  if (btnException) {
    btnException.addEventListener('click', () => {
      // منع الضغط المتكرر
      if (btnException.disabled) return;

      // إرسال الطلب للخلفية لحفظه بأمان وموثوقية
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: "requestException", url: originalUrl }, (response) => {
          if (response && response.success) {
            showConfirmation(response.cloud ?? false);
          }
        });
      } else {
        // بيئة بدون بيئة الإضافات (للاختبار)
        showConfirmation(false);
      }
    });
  }

  // الاستماع لرفض الطلب سحابياً من الوالد لإعلام الطفل فوراً
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "CLOUD_REQUEST_REJECTED") {
        showRejection();
      }
    });
  }

  /**
   * عرض رسالة التأكيد وتعطيل الزر
   */
  function showConfirmation(cloud = false) {
    if (confirmationMsg) {
      if (cloud) {
        confirmationMsg.innerHTML = '<span>⏳</span><span>تم تنبيه الوالد سحابياً على الهاتف. يرجى الانتظار، سيتم فتح الموقع تلقائياً بمجرد موافقته...</span>';
        confirmationMsg.style.background = 'rgba(217, 119, 6, 0.12)';
        confirmationMsg.style.borderColor = 'rgba(217, 119, 6, 0.3)';
        confirmationMsg.style.color = 'var(--accent-gold)';
      } else {
        confirmationMsg.innerHTML = '<span>✅</span><span>تم تسجيل طلب الاستثناء للوالد بنجاح.</span>';
      }
      confirmationMsg.classList.add('visible');
    }
    if (btnException) {
      btnException.disabled = true;
      btnException.innerHTML = cloud ? '<span>⏳</span><span>في انتظار الموافقة...</span>' : '<span>✅</span><span>تم إرسال الطلب</span>';
    }
  }

  /**
   * عرض حالة الرفض
   */
  function showRejection() {
    if (confirmationMsg) {
      confirmationMsg.innerHTML = '<span>❌</span><span>تم رفض هذا الطلب من قبل الوالد. سيبقى الموقع محظوراً.</span>';
      confirmationMsg.style.background = 'var(--danger-bg)';
      confirmationMsg.style.borderColor = 'var(--danger-border)';
      confirmationMsg.style.color = 'var(--danger-color)';
      confirmationMsg.classList.add('visible');
    }
    if (btnException) {
      btnException.disabled = true;
      btnException.innerHTML = '<span>❌</span><span>تم رفض الطلب</span>';
    }
  }
});
