# 🔧 دليل التطوير - Development Guide

دليل شامل لتطوير والعمل على مشروع مقهى ليفيلز.

---

## 📋 جدول المحتويات

- [البيئة المحلية](#local-environment)
- [بنية المشروع](#project-structure)
- [معايير الكود](#code-standards)
- [سير العمل](#workflow)
- [الاختبار](#testing)
- [النشر](#deployment)
- [المساهمة](#contributing)

---

## 🖥️ البيئة المحلية {#local-environment}

### المتطلبات

#### Frontend
- متصفح حديث (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- محرر نصوص (VS Code موصى به)
- Python 3.x (لسيرفر محلي) أو Node.js 16+

#### Backend
- .NET SDK 9.0 أو أحدث
- Visual Studio 2022 أو VS Code مع C# extension
- مفتاح API من Anthropic (اختياري)

### الإعداد الأولي

1. **استنساخ المشروع**
```bash
git clone https://github.com/moemoemoe92/levels-site.git
cd levels-site
```

2. **تشغيل Frontend**

**الطريقة 1: باستخدام Python**
```bash
python -m http.server 8000
# أو
python3 -m http.server 8000
```

**الطريقة 2: باستخدام Node.js**
```bash
npm install -g http-server
http-server -p 8000
```

**الطريقة 3: باستخدام VS Code**
- ثبت extension: Live Server
- انقر بيمين على index.html
- اختر "Open with Live Server"

3. **تشغيل Backend (اختياري)**
```bash
cd 3d/GrpcService1/GrpcService1
dotnet restore
dotnet build
dotnet run
```

### ملف البيئة

أنشئ ملف `appsettings.Development.json` في مجلد Backend:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Anthropic": {
    "ApiKey": "your-api-key-here"
  }
}
```

---

## 🏗️ بنية المشروع {#project-structure}

### Frontend Structure

```
assets/
├── css/
│   ├── variables.css      # المتغيرات والألوان
│   ├── main.css           # التنسيقات الأساسية
│   └── responsive.css     # التصميم المتجاوب
├── js/
│   ├── main.js            # الوظائف الرئيسية
│   └── menu.js            # إدارة القائمة
└── images/               # الصور والأيقونات
```

### Backend Structure

```
GrpcService1/
├── Services/
│   └── GreeterService.cs  # خدمات gRPC
├── Protos/
│   └── greet.proto        # تعريفات Protocol Buffer
├── Program.cs             # نقطة الدخول
├── appsettings.json       # الإعدادات
└── GrpcService1.csproj    # ملف المشروع
```

---

## 📝 معايير الكود {#code-standards}

### HTML

```html
<!-- ✅ جيد -->
<section id="menu" class="menu-section" aria-labelledby="menu-title">
    <h2 id="menu-title" class="section-title">القائمة</h2>
    <div class="menu-content">
        <!-- المحتوى -->
    </div>
</section>

<!-- ❌ سيء -->
<div id="menu">
    <h2>القائمة</h2>
    <div>
        <!-- المحتوى -->
    </div>
</div>
```

### CSS

```css
/* ✅ جيد */
.button {
    padding: var(--spacing-md);
    background: var(--color-accent);
    border-radius: var(--radius-sm);
    transition: all var(--transition-base);
}

/* ❌ سيء */
.button {
    padding: 1rem;
    background: #A27B5C;
    border-radius: 5px;
    transition: 0.3s;
}
```

### JavaScript

```javascript
// ✅ جيد
class MenuManager {
    constructor() {
        this.currentCategory = 'coffee';
        this.init();
    }

    init() {
        this.displayMenuItems();
        this.attachListeners();
    }

    displayMenuItems() {
        // التنفيذ
    }
}

// ❌ سيء
var currentCat = 'coffee';
function show() {
    // التنفيذ
}
```

### C# (Backend)

```csharp
// ✅ جيد
/// <summary>
/// Get AI response from Claude
/// </summary>
public override async Task<ClaudeReply> GetClaudeResponse(
    ClaudeRequest request,
    ServerCallContext context)
{
    _logger.LogInformation("Processing request");
    // التنفيذ
}

// ❌ سيء
public override async Task<ClaudeReply> GetClaudeResponse(ClaudeRequest r, ServerCallContext c)
{
    // التنفيذ
}
```

---

## 🔄 سير العمل {#workflow}

### Git Workflow

1. **إنشاء Branch جديد**
```bash
git checkout -b feature/feature-name
# أو
git checkout -b fix/bug-name
```

2. **التطوير**
- اكتب الكود
- اختبر التغييرات
- اكتب التعليقات

3. **Commit**
```bash
git add .
git commit -m "feat: وصف التغيير بالعربية"
```

### Commit Message Format

استخدم الصيغة التالية:
```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: ميزة جديدة
- `fix`: إصلاح bug
- `docs`: تحديث التوثيق
- `style`: تنسيق الكود
- `refactor`: إعادة هيكلة الكود
- `test`: إضافة اختبارات
- `chore`: مهام صيانة

**أمثلة:**
```bash
git commit -m "feat: إضافة نظام تحليلات متقدم"
git commit -m "fix: إصلاح مشكلة عرض القائمة على الموبايل"
git commit -m "docs: تحديث دليل التطوير"
```

---

## 🧪 الاختبار {#testing}

### Frontend Testing

#### 1. اختبار المتصفحات
```bash
# Chrome
open -a "Google Chrome" http://localhost:8000

# Firefox
open -a "Firefox" http://localhost:8000

# Safari
open -a "Safari" http://localhost:8000
```

#### 2. اختبار الأداء
- استخدم Chrome DevTools > Lighthouse
- استهدف درجة 90+ في جميع المقاييس

#### 3. اختبار الاستجابة
```javascript
// في Chrome DevTools Console
// اختبر أحجام شاشات مختلفة
// Mobile: 375x667
// Tablet: 768x1024
// Desktop: 1920x1080
```

### Backend Testing

```bash
cd 3d/GrpcService1/GrpcService1
dotnet test
```

### Manual Testing Checklist

- [ ] جميع الصفحات تحمل بشكل صحيح
- [ ] القائمة تعمل بشكل صحيح
- [ ] النوافذ المنبثقة تفتح وتغلق
- [ ] التصميم المتجاوب يعمل
- [ ] تجربة 3D تعمل بسلاسة
- [ ] Backend يستجيب بشكل صحيح
- [ ] PWA قابل للتثبيت
- [ ] Service Worker يعمل
- [ ] الصور تحمل بشكل lazy
- [ ] الرسوم المتحركة سلسة

---

## 🚀 النشر {#deployment}

### Frontend Deployment

#### GitHub Pages (التلقائي)
```bash
git push origin main
# GitHub Pages سيقوم بالنشر تلقائياً
```

#### Manual Deployment
```bash
npm install -g gh-pages
npm run deploy
```

### Backend Deployment

#### Local Server
```bash
cd 3d/GrpcService1/GrpcService1
dotnet publish -c Release
cd bin/Release/net9.0/publish
dotnet GrpcService1.dll
```

#### Docker (قريباً)
```bash
docker build -t levels-grpc .
docker run -p 5000:5000 -p 5001:5001 levels-grpc
```

---

## 🤝 المساهمة {#contributing}

### قبل المساهمة

1. اقرأ [CONTRIBUTING.md](CONTRIBUTING.md)
2. تأكد من فهمك لمعايير الكود
3. تحقق من Issues الموجودة

### خطوات المساهمة

1. Fork المشروع
2. أنشئ Branch جديد
3. اكتب الكود
4. اختبر التغييرات
5. Commit مع رسالة واضحة
6. Push إلى Fork الخاص بك
7. افتح Pull Request

---

## 🛠️ أدوات مفيدة

### VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ritwickdey.liveserver",
    "ms-dotnettools.csharp",
    "formulahendry.auto-rename-tag",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Chrome Extensions

- Lighthouse
- React Developer Tools
- Redux DevTools
- JSON Viewer

### Online Tools

- [Can I Use](https://caniuse.com/) - دعم المتصفحات
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - اختبار الأداء
- [WebPageTest](https://www.webpagetest.org/) - اختبار السرعة
- [GTmetrix](https://gtmetrix.com/) - تحليل الأداء

---

## 📚 موارد إضافية

### Documentation

- [MDN Web Docs](https://developer.mozilla.org/)
- [Three.js Docs](https://threejs.org/docs/)
- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [gRPC Documentation](https://grpc.io/docs/)

### Learning Resources

- [Web.dev](https://web.dev/)
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)
- [Anthropic Docs](https://docs.anthropic.com/)

---

## ❓ الأسئلة الشائعة

### كيف أصلح مشكلة في Service Worker؟

```javascript
// في Console
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```

### كيف أحدث الـ Cache؟

قم بتغيير CACHE_NAME في `sw.js`:
```javascript
const CACHE_NAME = 'levels-cafe-v1.0.1'; // زِد الرقم
```

### كيف أختبر Backend محلياً؟

```bash
# Terminal 1: شغل Backend
cd 3d/GrpcService1/GrpcService1
dotnet run

# Terminal 2: اختبر
curl http://localhost:5000/health
curl http://localhost:5000/info
```

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تحقق من [Issues](https://github.com/moemoemoe92/levels-site/issues)
2. افتح Issue جديد إذا لم تجد الحل
3. تواصل مع المطورين

---

**آخر تحديث:** 2024

**الإصدار:** 2.0.0
