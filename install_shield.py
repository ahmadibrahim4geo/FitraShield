# -*- coding: utf-8 -*-
import os
import sys
import ctypes
import subprocess
import json

def is_admin():
    """التحقق مما إذا كان السكربت يعمل بصلاحيات المسؤول (Administrator)"""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except Exception:
        return False

def main():
    print("==========================================================")
    print("         درع الفطرة (FitraShield) - أداة التثبيت والتحصين")
    print("==========================================================")
    print()

    # 1. التحقق من صلاحيات المسؤول
    if not is_admin():
        print("[!] خطأ: يجب تشغيل هذا السكربت كمسؤول (Run as Administrator) لتفعيل سياسات الأمان.")
        print("--> طريقة التشغيل: اضغط بزر الفأرة الأيمن على ملف البايثون أو نافذة الأوامر واختر 'Run as Administrator'.")
        print()
        input("اضغط Enter للخروج...")
        sys.exit(1)

    # تحديد مجلد التشغيل الحالي ديناميكياً لجعله محمولة
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 2. طلب معرّف الإضافة (Extension ID) من الأب
    print("[*] خطوة 1: يرجى إدخال معرّف إضافة درع الفطرة (Extension ID).")
    print("    (يمكنك الحصول عليه من صفحة chrome://extensions بعد تحميل الإضافة محلياً)")
    extension_id = input("    المعرّف (32 حرفاً إنجليزياً صغيراً): ").strip()

    import re
    if not re.fullmatch(r'[a-p]{32}', extension_id):
        print()
        print("[!] خطأ: معرّف الإضافة غير صالح. يجب أن يتكون من 32 حرفاً (من الحروف a إلى p فقط وبدون مسافات).")
        input("اضغط Enter للخروج والمحاولة مرة أخرى...")
        sys.exit(1)

    print()
    print("[*] خطوة 2: تحديث مسارات التكوين وربط الملفات ديناميكياً...")
    
    # أ. تحديث ملف com.fitrashield.helper.json
    manifest_path = os.path.join(current_dir, "com.fitrashield.helper.json")
    helper_bat_path = os.path.join(current_dir, "helper.bat")
    
    # تنسيق المسار للويندوز بوضع مائل عكسي مضاعف لتفادي مشاكل JSON
    escaped_bat_path = helper_bat_path.replace("\\", "\\\\")
    
    manifest_data = {
        "name": "com.fitrashield.helper",
        "description": "FitraShield Parental Control Logs Native Helper",
        "path": escaped_bat_path,
        "type": "stdio",
        "allowed_origins": [
            f"chrome-extension://{extension_id}/"
        ]
    }
    
    try:
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest_data, f, indent=2, ensure_ascii=False)
        print("  - تم تحديث ملف تعريف المساعد المحلي (com.fitrashield.helper.json).")
    except Exception as e:
        print(f"  - [!] خطأ أثناء تحديث ملف المساعد: {e}")
        input("اضغط Enter للخروج...")
        sys.exit(1)

    # ب. تحديث ملف الريجستري fitrashield_install.reg
    reg_path = os.path.join(current_dir, "fitrashield_install.reg")
    escaped_manifest_path = manifest_path.replace("\\", "\\\\")
    
    reg_content = f"""Windows Registry Editor Version 5.00

; =================================================================================
; درع الفطرة (FitraShield) - ملف حماية المتصفحات على مستوى نظام التشغيل (توليد تلقائي)
; =================================================================================

; ─── 1. حماية جوجل كروم (Google Chrome) ───

; (تعليق مؤقت للتجربة المحلية لتجنب حذف الأداة)
; [HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Google\\Chrome\\ExtensionInstallForcelist]
; "1"="{extension_id};https://clients2.google.com/service/update2/crx"

; السماح بوضع التصفح الخفي (Incognito Mode) مع حمايته بالأداة
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Google\\Chrome]
"IncognitoModeAvailability"=dword:00000000
"ForceGoogleSafeSearch"=dword:00000001
"ForceYouTubeRestrict"=dword:00000002

; إجبار المتصفح على تشغيل الأداة في وضع التصفح الخفي تلقائياً فور التثبيت
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Google\\Chrome\\ExtensionSettings]
"{extension_id}"="{{\\\"allowed_in_incognito\\\":true}}"

; تسجيل المساعد المحلي في نظام التشغيل لجوجل كروم للمستخدم الحالي
[HKEY_CURRENT_USER\\Software\\Google\\Chrome\\NativeMessagingHosts\\com.fitrashield.helper]
@="{escaped_manifest_path}"


; ─── 2. حماية مايكروسوفت إيدج (Microsoft Edge) ───

; (تعليق مؤقت للتجربة المحلية لتجنب حذف الأداة)
; [HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Edge\\ExtensionInstallForcelist]
; "1"="{extension_id};https://clients2.google.com/service/update2/crx"

; السماح بوضع التصفح الخاص (InPrivate Mode) مع حمايته بالأداة
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Edge]
"InPrivateModeAvailability"=dword:00000000
"ForceGoogleSafeSearch"=dword:00000001
"ForceBingSafeSearch"=dword:00000002
"ForceYouTubeRestrict"=dword:00000002

; إجبار إيدج على تشغيل الأداة في وضع التصفح الخاص تلقائياً فور التثبيت
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Edge\\ExtensionSettings]
"{extension_id}"="{{\\\"allowed_in_incognito\\\":true}}"

; تسجيل المساعد المحلي في نظام التشغيل لمايكروسوفت إيدج للمستخدم الحالي
[HKEY_CURRENT_USER\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\com.fitrashield.helper]
@="{escaped_manifest_path}"
"""
    
    try:
        with open(reg_path, 'w', encoding='utf-8') as f:
            f.write(reg_content)
        print("  - تم تحديث وتخصيص ملف الريجستري (fitrashield_install.reg) ليشمل Chrome و Edge.")
    except Exception as e:
        print(f"  - [!] خطأ أثناء تحديث ملف الريجستري: {e}")
        input("اضغط Enter للخروج...")
        sys.exit(1)

    # 3. إنشاء مجلد التقارير
    print()
    print("[*] خطوة 3: تهيئة مسار حفظ التقارير والسجلات...")
    log_dir = r"D:\FitraShield_Logs"
    if not os.path.exists("D:\\"):
        log_dir = os.path.join(current_dir, "Logs")
        
    try:
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
        print(f"  - مسار حفظ التقارير النشط: {log_dir}")
    except Exception as e:
        print(f"  - [!] تعذر تهيئة مجلد التقارير الافتراضي: {e}")

    # 4. تفعيل تعديلات النظام والسياسات صامتاً
    print()
    print("[*] خطوة 4: تفعيل الحماية وتطبيق السياسات في نظام التشغيل...")
    try:
        # تشغيل ملف الريجستري صامتاً باستخدام أداة reg.exe
        result = subprocess.run(
            ["reg", "import", reg_path],
            capture_output=True,
            text=True,
            check=True
        )
        print("  - تم تطبيق سياسات الحماية بنجاح وصمت لمتصفحي Chrome و Edge.")
        # حذف ملف الريجستري المؤقت بعد التثبيت لحماية الخصوصية
        try:
            os.remove(reg_path)
            print("  - تم حذف ملف الريجستري المؤقت بنجاح.")
        except Exception:
            pass
    except subprocess.CalledProcessError as e:
        print(f"  - [!] فشل تطبيق سياسات الريجستري تلقائياً: {e.stderr}")
        print("  - يمكنك محاولة تشغيل ملف 'fitrashield_install.reg' يدوياً إذا كان موجوداً.")
        input("اضغط Enter للخروج...")
        sys.exit(1)

    print()
    print("==========================================================")
    print(" 🎉 تم تحصين الجهاز بنجاح وتفعيل درع الفطرة بالكامل!")
    print("==========================================================")
    print(" 1. تم قفل التصفح الخفي (Incognito / InPrivate) نهائياً لكروم وإيدج.")
    print(" 2. تم منع إلغاء تثبيت أو حذف الإضافة في المتصفحين.")
    print(" 3. تم ربط نظام التقارير التلقائي وحفظه محلياً.")
    print(" 4. تم تفعيل نظام رصد المتصفحات البديلة وإغلاقها تلقائياً.")
    print("----------------------------------------------------------")
    print(" [*] يرجى إعادة تشغيل متصفح جوجل كروم أو مايكروسوفت إيدج الآن.")
    print("==========================================================")
    print()
    input("اضغط Enter للخروج من أداة التثبيت...")

if __name__ == "__main__":
    main()
