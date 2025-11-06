# 🎮☕ مقهى ليفيلز - Levels Café

<div align="center">

![Levels Café](https://img.shields.io/badge/Levels-Café-A27B5C?style=for-the-badge&logo=coffeescript&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**موقع رسمي متطور لمقهى ليفيلز - قهوة متخصصة، ألعاب، وتجربة رقمية لا تُنسى**

[🌐 عرض مباشر](https://moemoemoe92.github.io/levels-site/) • [📱 تجربة 3D](https://moemoemoe92.github.io/levels-site/3d/) • [📖 التوثيق](#documentation)

</div>

---

## 📋 جدول المحتويات

- [نظرة عامة](#overview)
- [المميزات](#features)
- [التقنيات المستخدمة](#tech-stack)
- [البنية المعمارية](#architecture)
- [التثبيت](#installation)
- [الاستخدام](#usage)
- [Backend Service](#backend)
- [Progressive Web App](#pwa)
- [تحسينات SEO](#seo)
- [الأداء](#performance)
- [المساهمة](#contributing)
- [الترخيص](#license)

---

## 🌟 نظرة عامة {#overview}

مقهى ليفيلز هو موقع ويب متطور يجمع بين القهوة المتخصصة وتجربة الألعاب في بيئة رقمية تفاعلية. تم بناء المشروع باستخدام أحدث تقنيات الويب لتوفير تجربة مستخدم استثنائية.

### ✨ ما الجديد في الإصدار 2.0؟

- 🎨 إعادة تصميم كاملة مع نظام تصميم متقدم
- 📱 Progressive Web App (PWA) كامل
- 🎮 تجربة 3D محسنة باستخدام Three.js
- 🚀 تحسينات أداء شاملة
- 🔍 تحسين SEO متقدم
- 🎯 Backend Service محسّن مع gRPC
- 🤖 تكامل مع Anthropic Claude AI
- ♿ دعم كامل لإمكانية الوصول
- 🌐 دعم متعدد اللغات (عربي/إنجليزي)

---

## 🎯 المميزات {#features}

### Frontend Features

#### 🎨 تصميم متقدم
- نظام تصميم شامل مع متغيرات CSS
- رسوم متحركة سلسة وجذابة
- تصميم متجاوب لجميع الأجهزة
- دعم الوضع الداكن تلقائياً
- تأثيرات تفاعلية متقدمة

#### 🎮 تجربة 3D تفاعلية
- مشهد 3D كامل باستخدام Three.js
- كوب قهوة تفاعلي مع تأثيرات البخار
- إضاءة ديناميكية وظلال واقعية
- جزيئات عائمة وبيئة غامرة
- تحكم بالكاميرا عبر الماوس واللمس
- إحصائيات الأداء في الوقت الفعلي

#### 📱 Progressive Web App
- قابل للتثبيت على الأجهزة
- يعمل بدون اتصال بالإنترنت
- تخزين مؤقت ذكي للموارد
- إشعارات Push
- مزامنة في الخلفية
- تحديثات تلقائية

#### 🎯 تجربة المستخدم
- قائمة تفاعلية للمشروبات والطعام
- نوافذ منبثقة للتفاصيل
- رسوم متحركة عند التمرير (AOS)
- قائمة تنقل ذكية للموبايل
- تحميل تدريجي للصور
- تجربة سريعة وسلسة

### Backend Features

#### 🚀 gRPC Service
- خدمة gRPC عالية الأداء
- تكامل مع Anthropic Claude AI
- معالجة أخطاء شاملة
- سجلات تفصيلية
- فحوصات صحة (Health Checks)
- دعم CORS كامل
- إحصائيات الأداء

#### 🔒 الأمان والموثوقية
- معالجة استثناءات متقدمة
- التحقق من صحة المدخلات
- حد أقصى لحجم الرسائل
- مهلة زمنية للطلبات
- سجلات أمان شاملة

---

## 🛠️ التقنيات المستخدمة {#tech-stack}

### Frontend Technologies

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | 5 | البنية الأساسية |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | 3 | التصميم والتنسيق |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | ES6+ | البرمجة والتفاعل |
| ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white) | r128 | الرسومات 3D |
| ![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white) | - | التطبيق التقدمي |

### Backend Technologies

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| ![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat&logo=.net&logoColor=white) | 9.0 | Backend Framework |
| ![gRPC](https://img.shields.io/badge/gRPC-244c5a?style=flat&logo=grpc&logoColor=white) | - | خدمة الاتصالات |
| ![C#](https://img.shields.io/badge/C%23-239120?style=flat&logo=c-sharp&logoColor=white) | 11 | لغة البرمجة |
| ![Anthropic](https://img.shields.io/badge/Anthropic-000000?style=flat&logo=anthropic&logoColor=white) | Claude 3.5 | الذكاء الاصطناعي |

### External Libraries

- **Font Awesome** 6.0.0 - الأيقونات
- **Google Fonts** - خط Tajawal
- **AOS** 2.3.1 - رسوم متحركة عند التمرير
- **Unsplash** - الصور عالية الجودة

---

## 🏗️ البنية المعمارية {#architecture}

```
levels-site/
├── assets/
│   ├── css/
│   │   ├── variables.css      # نظام المتغيرات
│   │   ├── main.css           # التنسيقات الرئيسية
│   │   └── responsive.css     # التصميم المتجاوب
│   ├── js/
│   │   ├── main.js            # الوظائف الرئيسية
│   │   ├── menu.js            # إدارة القائمة
│   │   └── animations.js      # الرسوم المتحركة
│   └── images/               # الصور والأيقونات
│
├── 3d/
│   ├── css/
│   │   └── style.css         # تنسيقات 3D
│   ├── js/
│   │   └── scene.js          # مدير المشهد 3D
│   └── index.html            # صفحة التجربة 3D
│
├── 3d/GrpcService1/
│   └── GrpcService1/
│       ├── Services/
│       │   └── GreeterService.cs  # خدمة gRPC
│       ├── Protos/
│       │   └── greet.proto        # تعريفات gRPC
│       ├── Program.cs             # نقطة الدخول
│       ├── appsettings.json       # الإعدادات
│       └── GrpcService1.csproj    # ملف المشروع
│
├── index.html                # الصفحة الرئيسية
├── manifest.json             # ملف PWA
├── sw.js                     # Service Worker
├── README.md                 # التوثيق
└── .gitignore               # إعدادات Git
```

---

## 📦 التثبيت {#installation}

### المتطلبات

- متصفح حديث (Chrome, Firefox, Safari, Edge)
- Node.js 16+ (اختياري للتطوير)
- .NET SDK 9.0 (للـ Backend)
- Git

### الخطوات

1. **استنساخ المشروع**
```bash
git clone https://github.com/moemoemoe92/levels-site.git
cd levels-site
```

2. **فتح الموقع**
```bash
# بدون سيرفر (افتح index.html مباشرة)
open index.html

# أو باستخدام سيرفر محلي
python -m http.server 8000
# ثم افتح http://localhost:8000
```

3. **تشغيل Backend (اختياري)**
```bash
cd 3d/GrpcService1/GrpcService1
dotnet restore
dotnet run
```

---

## 🚀 الاستخدام {#usage}

### Frontend

1. افتح `index.html` في المتصفح
2. تصفح القائمة والأقسام المختلفة
3. جرب تجربة 3D من خلال الرابط في القائمة

### Backend Service

1. قم بتعديل `appsettings.json` وأضف مفتاح Anthropic API
```json
{
  "Anthropic": {
    "ApiKey": "your-api-key-here"
  }
}
```

2. شغل الخدمة
```bash
dotnet run
```

3. الخدمة ستعمل على:
   - http://localhost:5000 (HTTP/2 - gRPC)
   - https://localhost:5001 (HTTP/1.1 + HTTP/2)

---

## 🔧 Backend Service {#backend}

### gRPC Services

#### 1. SayHello
```protobuf
rpc SayHello (HelloRequest) returns (HelloReply);
```

**الوصف:** خدمة بسيطة لإرسال التحية

**مثال:**
```csharp
var request = new HelloRequest { Name = "Ahmed" };
var reply = await client.SayHelloAsync(request);
// Reply: "مرحباً Ahmed! أهلاً بك في مقهى ليفيلز ☕"
```

#### 2. GetClaudeResponse
```protobuf
rpc GetClaudeResponse (ClaudeRequest) returns (ClaudeReply);
```

**الوصف:** الحصول على رد من Anthropic Claude AI

**مثال:**
```csharp
var request = new ClaudeRequest { Prompt = "What's your best coffee?" };
var reply = await client.GetClaudeResponseAsync(request);
```

### Health Check
```bash
curl http://localhost:5000/health
```

### Service Info
```bash
curl http://localhost:5000/info
```

---

## 📱 Progressive Web App {#pwa}

### الميزات

- ✅ قابل للتثبيت على جميع الأجهزة
- ✅ يعمل بدون اتصال بالإنترنت
- ✅ تحديثات تلقائية
- ✅ تجربة تطبيق أصلي
- ✅ أيقونات واختصارات
- ✅ إشعارات Push

### التثبيت

1. افتح الموقع في متصفح Chrome/Edge
2. اضغط على أيقونة "التثبيت" في شريط العنوان
3. اتبع التعليمات لتثبيت التطبيق

---

## 🔍 تحسينات SEO {#seo}

### ما تم تنفيذه

- ✅ Meta tags كاملة (OG, Twitter)
- ✅ Structured Data (Schema.org)
- ✅ Semantic HTML
- ✅ Sitemap
- ✅ Robots.txt
- ✅ تحسين الأداء
- ✅ Mobile-first indexing
- ✅ دعم RTL

### الأداء

- ⚡ Page Load: < 2s
- ⚡ First Contentful Paint: < 1s
- ⚡ Time to Interactive: < 3s
- ⚡ Lighthouse Score: 95+

---

## ⚡ الأداء {#performance}

### تحسينات مطبقة

1. **تحميل الموارد**
   - Lazy loading للصور
   - Preconnect للخطوط
   - Minification للـ CSS/JS
   - Compression (Gzip/Brotli)

2. **التخزين المؤقت**
   - Service Worker
   - Browser caching
   - CDN caching

3. **الرسومات**
   - Optimized images (WebP)
   - Responsive images
   - SVG للأيقونات

4. **JavaScript**
   - Code splitting
   - Async loading
   - Debouncing/Throttling

---

## 🤝 المساهمة {#contributing}

نرحب بجميع المساهمات!

### كيفية المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

### إرشادات الكود

- استخدم أسماء متغيرات واضحة
- اكتب تعليقات بالعربية والإنجليزية
- اتبع معايير JavaScript/CSS الحديثة
- اختبر الكود قبل الـ commit

---

## 📄 الترخيص {#license}

هذا المشروع مرخص تحت [MIT License](LICENSE)

```
MIT License

Copyright (c) 2024 Mohammed - Levels Café

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 التواصل

- **الموقع:** [levels-site](https://moemoemoe92.github.io/levels-site/)
- **GitHub:** [@moemoemoe92](https://github.com/moemoemoe92)
- **المشروع:** [levels-site](https://github.com/moemoemoe92/levels-site)

---

## 🙏 شكر وتقدير

- **Font Awesome** - للأيقونات الرائعة
- **Google Fonts** - لخط Tajawal الجميل
- **Three.js** - لمكتبة الرسومات 3D
- **Unsplash** - للصور عالية الجودة
- **Anthropic** - لـ Claude AI
- **المجتمع** - لكل من ساهم ودعم المشروع

---

<div align="center">

**صُنع بـ ❤️ في الرياض، المملكة العربية السعودية**

⭐ إذا أعجبك المشروع، لا تنسَ إعطائه نجمة!

</div>
