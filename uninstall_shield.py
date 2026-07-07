# -*- coding: utf-8 -*-
import os
import sys
import ctypes
import winreg

def is_admin():
    """التحقق مما إذا كان السكربت يعمل بصلاحيات المسؤول (Administrator)"""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except Exception:
        return False

def delete_registry_value(key_path, value_name):
    try:
        # فتح المفتاح بصلاحيات الكتابة
        hkey = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path, 0, winreg.KEY_SET_VALUE)
        winreg.DeleteValue(hkey, value_name)
        winreg.CloseKey(hkey)
        print(f"  - تم حذف سياسة: {value_name}")
    except FileNotFoundError:
        pass
    except Exception as e:
        print(f"  - [!] تعذر حذف السياسة {value_name}: {e}")

def delete_registry_key(root_key, key_path):
    try:
        # حذف المفتاح الفرعي
        winreg.DeleteKey(root_key, key_path)
        print(f"  - تم حذف مفتاح التسجيل: {key_path}")
    except FileNotFoundError:
        pass
    except Exception as e:
        print(f"  - [!] تعذر حذف مفتاح التسجيل {key_path}: {e}")

def main():
    print("==========================================================")
    print("         درع الفطرة (FitraShield) - أداة إزالة الحماية")
    print("==========================================================")
    print()

    # 1. التحقق من صلاحيات المسؤول
    if not is_admin():
        print("[!] خطأ: يجب تشغيل هذا السكربت كمسؤول (Run as Administrator) لإزالة سياسات الأمان.")
        print("--> طريقة التشغيل: اضغط بزر الفأرة الأيمن على الملف واختر 'Run as Administrator'.")
        print()
        input("اضغط Enter للخروج...")
        sys.exit(1)

    confirm = input("[?] هل أنت متأكد من رغبتك في إزالة درع الفطرة تماماً من هذا الجهاز؟ (y/n): ").strip().lower()
    if confirm != 'y':
        print("[*] تم إلغاء عملية الإزالة.")
        input("اضغط Enter للخروج...")
        sys.exit(0)

    # 2. طلب معرّف الإضافة (Extension ID) لإلغاء إعدادات التثبيت القسري
    print("[*] يرجى إدخال معرّف الإضافة (Extension ID) لتطهير إعداداته الفريدة.")
    extension_id = input("    المعرّف (32 حرفاً): ").strip()
    
    print()
    print("[*] بدء عملية إزالة الحماية وتطهير سياسات نظام التشغيل...")

    # أ. حذف قيم سياسات جوجل كروم
    chrome_policy_path = r"SOFTWARE\Policies\Google\Chrome"
    delete_registry_value(chrome_policy_path, "IncognitoModeAvailability")
    delete_registry_value(chrome_policy_path, "ForceGoogleSafeSearch")
    delete_registry_value(chrome_policy_path, "ForceYouTubeRestrict")
    
    if len(extension_id) == 32:
        delete_registry_value(chrome_policy_path + r"\ExtensionSettings", extension_id)
        delete_registry_value(chrome_policy_path + r"\ExtensionInstallForcelist", "1")

    # ب. حذف قيم سياسات مايكروسوفت إيدج
    edge_policy_path = r"SOFTWARE\Policies\Microsoft\Edge"
    delete_registry_value(edge_policy_path, "InPrivateModeAvailability")
    delete_registry_value(edge_policy_path, "ForceGoogleSafeSearch")
    delete_registry_value(edge_policy_path, "ForceBingSafeSearch")
    delete_registry_value(edge_policy_path, "ForceYouTubeRestrict")
    
    if len(extension_id) == 32:
        delete_registry_value(edge_policy_path + r"\ExtensionSettings", extension_id)
        delete_registry_value(edge_policy_path + r"\ExtensionInstallForcelist", "1")

    # ج. حذف تسجيل المساعد المحلي (Native Messaging)
    delete_registry_key(winreg.HKEY_CURRENT_USER, r"Software\Google\Chrome\NativeMessagingHosts\com.fitrashield.helper")
    delete_registry_key(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Edge\NativeMessagingHosts\com.fitrashield.helper")

    print()
    print("==========================================================")
    print(" 🎉 تم إزالة درع الفطرة وسياسات الحماية بنجاح من جهازك!")
    print("==========================================================")
    print(" [*] يرجى إعادة تشغيل متصفح جوجل كروم أو مايكروسوفت إيدج الآن.")
    print("==========================================================")
    print()
    input("اضغط Enter للخروج...")

if __name__ == "__main__":
    main()
