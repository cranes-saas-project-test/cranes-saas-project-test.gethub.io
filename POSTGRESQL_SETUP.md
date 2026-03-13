# تعليمات تثبيت وتكوين PostgreSQL

## 1. تثبيت PostgreSQL

### على Windows:
1. قم بتنزيل PostgreSQL من: https://www.postgresql.org/download/windows/
2. قم بتشغيل المثبت وتتبع التعليمات
3. اختر كلمة مرور للمستخدم postgres (يفضل: postgres)
4. تأكد من أن المنفذ الافتراضي 5432 يعمل

### على macOS:
```bash
brew install postgresql
brew services start postgresql
```

### على Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

## 2. إنشاء قاعدة البيانات

1. افتح Command Prompt أو Terminal
2. اتصل بـ PostgreSQL:
```bash
psql -U postgres
```

3. أدخل كلمة المرور التي وضعتها أثناء التثبيت

4. أنشئ قاعدة البيانات:
```sql
CREATE DATABASE crane_system;
```

5. اخرج من psql:
```sql
\q
```

## 3. تحديث ملف .env

في ملف `.env` في جذر المشروع تأكد من الإعدادات التالية:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crane_system
DB_USER=postgres
DB_PASSWORD=postgres
```

استبدل `postgres` بكلمة المرور التي اخترتها.

## 4. تثبيت المكتبات

```bash
npm install
```

## 5. تشغيل السيرفر

```bash
npm start
```

أو للتطوير:
```bash
npm run server
```

## 6. الوصول للتطبيق

افتح المتصفح على:
```
http://localhost:5000
```

بيانات تسجيل الدخول:
- اسم المستخدم: admin
- كلمة المرور: admin123

## 7. استكشاف الأخطاء

### خطأ: "نوع الاتصال قد يتم رفضه"
- تأكد من أن PostgreSQL قيد التشغيل
- تحقق من المنفذ 5432 متاح

### خطأ: "خطأ في المصادقة"
- تحقق من كلمة المرور في .env
- تأكد من اسم المستخدم صحيح

### خطأ: "قاعدة البيانات غير موجودة"
- تأكد من أنك أنشأت قاعدة البيانات `crane_system` بنجاح

## الانتقال من SQLite إلى PostgreSQL

تم تحويل المشروع من SQLite إلى PostgreSQL:
- تم استبدال مكتبة `better-sqlite3` بـ `pg`
- تم إنشاء ملف `db.js` للاتصال والإدارة
- تم تحديث أنواع البيانات لتكون متوافقة مع PostgreSQL
