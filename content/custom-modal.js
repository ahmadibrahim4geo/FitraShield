/**
 * FitraShield - Parent Verification Modal
 * واجهة تحقق مخصصة آمنة بديلة لـ prompt() لمنع التفاف الأبناء وتوفير مظهر عصري
 */

const FitraPasswordModal = (() => {
  let activeCallback = null;
  let modalElement = null;

  function createModal() {
    if (modalElement) return;

    modalElement = document.createElement('div');
    modalElement.id = 'fs-secure-modal-overlay';
    
    // حقن كود الـ HTML للنافذة
    modalElement.innerHTML = `
      <div class="fs-modal-content">
        <div class="fs-modal-header">
          <div class="fs-modal-title-wrapper">
            <span class="fs-modal-logo">🛡️</span>
            <h3>درع الفطرة — رقابة الوالدين</h3>
          </div>
          <button class="fs-modal-close-btn" id="fs-close-btn-top">&times;</button>
        </div>
        <div class="fs-modal-body">
          <p>هذا المحتوى محجوب بموجب إعدادات الحماية البصرية. الرجاء إدخال كلمة مرور الوالدين لعرضه مؤقتاً:</p>
          <div class="fs-input-group">
            <input type="password" id="fs-parent-password" placeholder="أدخل كلمة المرور هنا..." autofocus />
            <div class="fs-error-msg" id="fs-modal-error"></div>
          </div>
        </div>
        <div class="fs-modal-actions">
          <button id="fs-modal-cancel" class="fs-btn btn-secondary">إلغاء</button>
          <button id="fs-modal-submit" class="fs-btn btn-primary">تأكيد الكشف</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalElement);

    // ربط الأحداث والأزرار
    modalElement.querySelector('#fs-close-btn-top').addEventListener('click', () => hide());
    modalElement.querySelector('#fs-modal-cancel').addEventListener('click', () => hide());
    modalElement.querySelector('#fs-modal-submit').addEventListener('click', submit);
    
    const passwordInput = modalElement.querySelector('#fs-parent-password');
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submit();
      }
    });
  }

  function show(callback) {
    createModal();
    activeCallback = callback;
    
    // تصفية الحقول السابقة
    const input = document.getElementById('fs-parent-password');
    input.value = '';
    showError('');
    
    modalElement.classList.add('fs-modal-active');
    setTimeout(() => input.focus(), 150);
  }

  function hide(success = false) {
    if (!modalElement) return;
    modalElement.classList.remove('fs-modal-active');
    activeCallback = null;
  }

  function submit() {
    const input = document.getElementById('fs-parent-password');
    const password = input.value.trim ? input.value.trim() : input.value;
    
    if (!password) {
      showError('الرجاء إدخال كلمة المرور أولاً.');
      return;
    }
    
    if (activeCallback) {
      activeCallback(password);
    }
  }

  function showError(msg) {
    const errorEl = document.getElementById('fs-modal-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = msg ? 'block' : 'none';
      if (msg) {
        const input = document.getElementById('fs-parent-password');
        input.classList.add('input-error');
        input.focus();
      }
    }
  }

  return {
    show,
    hide,
    showError
  };
})();
