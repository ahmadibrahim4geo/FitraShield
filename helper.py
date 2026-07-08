# -*- coding: utf-8 -*-
import sys
import struct
import json
import os
import csv
import subprocess
import threading
import time
from datetime import datetime
from collections import Counter

# ضبط ترميز الإدخال والإخراج لـ UTF-8 لتجنب مشاكل اللغة العربية في الويندوز
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stdin = codecs.getreader('utf-8')(sys.stdin.buffer, 'strict')

# قائمة العمليات/المتصفحات المحظورة لمنع التفاف الأطفال (مثل استخدام متصفحات بديلة غير خاضعة للرقابة)
BLOCKED_BROWSERS = [
    "firefox.exe", 
    "opera.exe", 
    "tor.exe", 
    "epic.exe", 
    "maxthon.exe",
    "vivaldi.exe",
    "waterfox.exe",
    "pale moon.exe",
    "librewolf.exe",
    "bromite.exe"
]

# دالة لقراءة البيانات القادمة من المتصفح عبر المنفذ القياسي (stdin)
def get_message():
    try:
        raw_length = sys.stdin.buffer.read(4)
        if len(raw_length) == 0:
            sys.exit(0)
        message_length = struct.unpack('@I', raw_length)[0]
        message = sys.stdin.buffer.read(message_length).decode('utf-8')
        return json.loads(message)
    except Exception:
        sys.exit(0)

# - إرسال رد إلى المتصفح عبر المنفذ القياسي (stdout)
def send_message(message):
    try:
        response = json.dumps(message)
        sys.stdout.buffer.write(struct.pack('@I', len(response)))
        sys.stdout.buffer.write(response.encode('utf-8'))
        sys.stdout.buffer.flush()
    except Exception:
        pass

# قفل الخيوط لمنع التعارض أثناء قراءة/كتابة ملف السجلات
file_lock = threading.Lock()

# دالة لتحليل السجلات الحالية وحساب الإحصائيات (محاولات اليوم ووقت الذروة)
def calculate_summary_and_rewrite(log_file, new_entry):
    with file_lock:
        rows = []
        
        # 1. قراءة السجلات الحالية إذا كان الملف موجوداً
        if os.path.exists(log_file):
            try:
                with open(log_file, mode='r', encoding='utf-8') as f:
                    lines = f.readlines()
                    # تخطي أسطر الملخص والرأس بشكل مرن ومقاوم للتغيرات
                    data_lines = [line for line in lines if not line.startswith("═══") and not line.startswith("[ملخص") and not line.startswith("الوقت والتاريخ")]
                    reader = csv.reader(data_lines)
                    for row in reader:
                        if row:
                            rows.append(row)
            except Exception:
                pass

        # 2. إضافة السجل الجديد
        rows.append([
            new_entry.get("timestamp", datetime.now().strftime("%Y-%m-%d %H:%M:%S")),
            new_entry.get("url", "Unknown"),
            new_entry.get("reason", "Unknown"),
            new_entry.get("keyword", ""),
            new_entry.get("action", "حجب وتحويل"),
            new_entry.get("shieldStatus", "نشط")
        ])

        # حد أقصى 2000 سجل في الملف المحلي للحفاظ على سرعة الأداء
        if len(rows) > 2000:
            rows = rows[-2000:]

        # 3. حساب الإحصائيات لليوم الحالي
        from datetime import date
        today = date.today()
        today_count = 0
        today_hours = []

        for r in rows:
            timestamp_str = r[0]
            # استخراج جزء التاريخ ومحاولة تحليله بشكل مرن
            date_part = timestamp_str.replace(",", "").split(" ")[0]
            log_date = None
            for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y"):
                try:
                    log_date = datetime.strptime(date_part, fmt).date()
                    break
                except ValueError:
                    continue

            if log_date == today:
                today_count += 1
                try:
                    time_part = timestamp_str.split(" ")[1]
                    hour = time_part.split(":")[0]
                    ampm = timestamp_str.split(" ")[2] if len(timestamp_str.split(" ")) > 2 else ""
                    
                    if ampm:
                        today_hours.append(f"{hour} {ampm}")
                    else:
                        h_int = int(hour)
                        if h_int == 0:
                            today_hours.append("12 ص")
                        elif h_int == 12:
                            today_hours.append("12 م")
                        elif h_int > 12:
                            today_hours.append(f"{h_int - 12} م")
                        else:
                            today_hours.append(f"{h_int} ص")
                except Exception:
                    pass

        peak_hour = "لا يوجد"
        if today_hours:
            counter = Counter(today_hours)
            peak_hour = counter.most_common(1)[0][0]

        # 4. بناء سطر الملخص وسطر الرأس وكتابة البيانات في ملف التقرير
        shield_status = new_entry.get("shieldStatus", "نشط")
        summary_row = (
            "══════════════════════════════════════════════════════════\n"
            f"[ملخص درع الفطرة] | محاولات اليوم: {today_count} | وقت الذروة: {peak_hour} | الحصن: {shield_status} ✔\n"
            "══════════════════════════════════════════════════════════\n"
        )
        
        header_row = ["الوقت والتاريخ", "الموقع / البحث", "سبب الحجب", "الكلمة المستخدمة", "التصرف الفوري", "حالة الأداة"]
        
        try:
            with open(log_file, mode='w', encoding='utf-8', newline='') as f:
                f.write(summary_row)
                writer = csv.writer(f)
                writer.writerow(header_row)
                writer.writerows(rows)
        except Exception:
            pass# دالة لمراقبة العمليات وإغلاق المتصفحات غير المصرح بها لمنع الالتفاف
def monitor_processes(log_file):
    # ننتظر قليلاً حتى تستقر عملية التشغيل
    time.sleep(2)
    
    import locale
    system_encoding = locale.getpreferredencoding()

    while True:
        try:
            # تشغيل أمر tasklist للحصول على العمليات الجارية
            output = subprocess.check_output("tasklist /NH /FO CSV", shell=True, stderr=subprocess.DEVNULL).decode(system_encoding, errors='ignore')
            
            # فحص كل سطر في المخرجات
            for line in output.split('\n'):
                if not line.strip():
                    continue
                
                # استخراج اسم العملية والمعرف الخاص بها (PID)
                parts = line.split(',')
                if len(parts) >= 2:
                    proc_name = parts[0].strip('"').lower()
                    pid = parts[1].strip('"')
                    
                    # إذا كانت العملية متصفحاً محظوراً، نقوم بإنهائها فوراً باستخدام الـ PID
                    if proc_name in BLOCKED_BROWSERS and pid.isdigit():
                        # إنهاء العملية باستخدام PID لضمان الدقة
                        subprocess.run(f'taskkill /F /PID {pid}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                        
                        # تسجيل محاولة الالتفاف في التقرير
                        log_bypass_attempt(log_file, proc_name)
        except Exception:
            pass
        
        # الانتظار 3 ثوانٍ قبل الفحص التالي لتقليل استهلاك المعالج
        time.sleep(3)

# تسجيل محاولة الالتفاف باستخدام متصفح آخر
def log_bypass_attempt(log_file, browser_name):
    # الحصول على الوقت الحالي بالتنسيق العربي
    timestamp = datetime.now().strftime("%d/%m/%Y, %I:%M:%S %p").replace("PM", "مساءً").replace("AM", "صباحاً")
    
    bypass_entry = {
        "timestamp": timestamp,
        "url": f"محاولة استخدام متصفح غير خاضع للرقابة: ({browser_name})",
        "reason": "محاولة التفاف ونقض الحصن ⚠️",
        "keyword": browser_name,
        "action": "إغلاق المتصفح البديل فوراً 🚫",
        "shieldStatus": "نشط"
    }
    
    try:
        calculate_summary_and_rewrite(log_file, bypass_entry)
    except Exception:
        pass

def main():
    # المسار الافتراضي للحفظ (بارتيشن D)
    log_dir = r"D:\FitraShield_Logs"
    
    # فحص احتياطي: إذا لم يكن البارتيشن D متاحاً، يتم الحفظ في مجلد المشروع على C
    if not os.path.exists("D:\\"):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        log_dir = os.path.join(current_dir, "Logs")
        
    try:
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
    except Exception:
        log_dir = os.path.dirname(os.path.abspath(__file__))

    # ملف التقرير المنسق ذو الاسم المموه
    log_file = os.path.join(log_dir, "system_config.dat")
    
    # تشغيل خيط (Thread) مراقبة العمليات في الخلفية لمنع استخدام متصفحات بديلة
    monitor_thread = threading.Thread(target=monitor_processes, args=(log_file,), daemon=True)
    monitor_thread.start()
    
    while True:
        try:
            # استقبال البيانات من كروم
            msg = get_message()
            if not msg:
                break
                
            # التحقق من صحة هيكلية الرسالة لحماية المساعد من الرسائل الخبيثة
            REQUIRED_FIELDS = {"url", "reason", "action", "timestamp"}
            if not isinstance(msg, dict) or not REQUIRED_FIELDS.issubset(msg.keys()):
                send_message({"status": "error", "message": "Invalid message structure"})
                continue

            # حساب الإحصائيات وتحديث ملف التقرير بالكامل
            calculate_summary_and_rewrite(log_file, msg)
            
            # إرسال تأكيد بالنجاح للإضافة
            send_message({"status": "success", "message": "Log recorded to OS level successfully"})
        except Exception as e:
            send_message({"status": "error", "message": str(e)})

if __name__ == "__main__":
    main()
