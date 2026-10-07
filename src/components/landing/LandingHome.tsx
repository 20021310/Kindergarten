import React, { useState } from 'react';
import { UserRole, Language } from '../../types';
import { sound } from '../../services/sound';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Heart,
  Smile,
  Brain,
  Video,
  CheckCircle2,
  Users,
  Clock
} from 'lucide-react';

interface LandingHomeProps {
  lang: Language;
  onEnterRole: (role: UserRole) => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({ lang, onEnterRole }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      qAr: 'هل المنصة آمنة ومخصصة لأعمار 4 إلى 6 سنوات؟',
      qEn: 'Is the platform safe and designed specifically for 4-6 year olds?',
      aAr: 'نعم، المنصة خالية تماماً من الإعلانات ومن روابط التواصل الخارجي، وتتميز بأزرار كبيرة وتعليمات صوتية بالعربية الفصحى تناسب الطفل الذي لم يتعلم القراءة بعد.',
      aEn: 'Yes! Completely ad-free, with zero external links, large tactile buttons, and friendly voice guidance tailored for kindergarteners.'
    },
    {
      qAr: 'كيف يستطيع ولي الأمر ضبط وقت استخدام الشاشة؟',
      qEn: 'How can parents limit or monitor screen time?',
      aAr: 'تحتوي لوحة تحكم ولي الأمر على محدد ذكي لوقت الشاشة اليومي محمي برمز PIN سري، مما يضمن ألا يتجاوز الطفل المدة الصحية المحددة.',
      aEn: 'The Parent Dashboard features an adjustable daily screen-time limiter protected by a parental PIN code.'
    },
    {
      qAr: 'هل تستطيع رياض الأطفال والمعلمات استخدام المنصة في الفصول؟',
      qEn: 'Can kindergartens and teachers use the platform in classrooms?',
      aAr: 'بالتأكيد، توفر بوابة المعلم إدارة فصول الروضة في القصيم، وتكليف الطلاب بأنشطة تفاعلية ومتابعة تقارير الدقة والمهارات الفردية.',
      aEn: 'Yes, teachers have a dedicated portal to manage classroom rosters, assign activities, and monitor progress across learning milestones.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-4 py-1.5 rounded-full text-xs font-extrabold text-indigo-700 mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              {lang === 'ar'
                ? 'المنصة الرقمية الأولى لرياض الأطفال في منطقة القصيم 🇸🇦'
                : 'The #1 Kindergarten EdTech Hub in Qassim 🇸🇦'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            {lang === 'ar' ? 'نتعلّم... نلعب... ونكتشف!' : "Learn... Play... and Discover!"}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'منصة تعليمية تفاعلية تساعد أطفال الروضة على التعلم من خلال اللعب، الرياضيات، التفكير، والفيديوهات التعليمية الآمنة.'
              : 'An interactive learning universe helping kindergarten children thrive through games, early mathematics, cognitive exercises, and joyful learning.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onEnterRole('child');
              }}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-indigo-200 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'ابدأ رحلة التعلم 🚀' : 'Start Learning Journey 🚀'}</span>
              {lang === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onEnterRole('parent');
              }}
              className="px-6 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-sm sm:text-base rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'ar' ? 'لوحة ولي الأمر' : 'Parent Dashboard'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onEnterRole('teacher');
              }}
              className="px-6 py-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-sm sm:text-base rounded-2xl transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'بوابة المعلمات' : 'Teacher Portal'}</span>
            </button>
          </div>

          {/* Visual Showcase Feature Card Strip */}
          <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-tr from-indigo-100/60 via-purple-50 to-amber-50 rounded-3xl p-4 sm:p-6 border border-indigo-100 shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-2xl p-4 shadow-xs">
                <div className="text-3xl mb-1">🔢</div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? 'رياضيات تفاعلية' : 'Early Math'}
                </h4>
                <p className="text-[11px] text-slate-400">4 مستويات متدرجة</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-xs">
                <div className="text-3xl mb-1">🔤</div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? 'الحروف الهجائية' : 'Arabic Phonics'}
                </h4>
                <p className="text-[11px] text-slate-400">أصوات ونطق سليم</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-xs">
                <div className="text-3xl mb-1">🧠</div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? 'نادي تنمية التفكير' : 'Brain Gym'}
                </h4>
                <p className="text-[11px] text-slate-400">ذاكرة وأنماط منطقية</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-xs">
                <div className="text-3xl mb-1">🏆</div>
                <h4 className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? 'أوسمة وجوائز' : 'Star Badges'}
                </h4>
                <p className="text-[11px] text-slate-400">تحفيز إيجابي مستمر</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Baraem Qassim */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === 'ar' ? 'لماذا منصة براعم القصيم؟' : 'Why Baraem Qassim?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {lang === 'ar'
              ? 'صممت خصيصاً لتلائم الخصائص النمائية للطفل في المملكة وتدعم المعايير التعليمية الوطنية'
              : 'Crafted specifically for the developmental milestones of kindergarten learners in Saudi Arabia'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {lang === 'ar' ? 'بيئة آمنة 100% وخالية من الإعلانات' : '100% Safe & Ad-Free'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'لا نجمع أي بيانات حساسة، ولا نسمح بالمحادثات الخاصة بين الأطفال أو الروابط المشتتة.'
                : 'Zero intrusive advertisements, no third-party tracking, and protected screen bounds for young children.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {lang === 'ar' ? 'تصميم بصري وصوتي يلائم 4-6 سنوات' : 'Visual & Audio First UX'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'أزرار لمس كبيرة، وتفاعل حركي محبب، وقراءة صوتية للتعليمات تمكن الطفل من التعلم بمفرده.'
                : 'Large touch targets, audio speech synthesis for instructions, and rewarding positive reinforcement.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {lang === 'ar' ? 'تركيز على جودة التعلم وليس إطالة الشاشة' : 'Learning Quality Over Screen Time'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'أنشطة مركزة من 1 إلى 5 دقائق تعزز الفهم والاستيعاب دون التسبب في إجهاد بصري أو إدمان رقمي.'
                : 'Bite-sized 1 to 5 minute exercises that maximize cognitive retention and respect healthy limits.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 3 Roles Breakdown */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {lang === 'ar' ? 'منظومة متكاملة لثلاثة أطراف' : 'A Unified Three-Pillar System'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              {lang === 'ar'
                ? 'الطفل يتعلّم بمرح، والوالدان يطمئنان، والمعلمات يقمن بالمتابعة والتوجيه.'
                : 'Children learn playfully, parents monitor healthy growth, and teachers guide classroom milestones.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Child Pillar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-3xl block mb-3">🧒</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {lang === 'ar' ? 'عالم الطفل المستكشف' : 'Child Learning World'}
                </h3>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>عد الفواكه ورطب القصيم</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>الحروف العربية بالصوت والصورة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>تمارين الذاكرة والألغاز البصرية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>جمع النجوم وفتح المقتنيات المدرسية</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onEnterRole('child');
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'دخول وضع الطفل' : 'Open Child Hub'}
              </button>
            </div>

            {/* Parent Pillar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-3xl block mb-3">👨‍👩‍👧</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {lang === 'ar' ? 'لوحة تحكم الوالدين' : 'Parent Dashboard'}
                </h3>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>مؤشرات الإنجاز والدقة ونشاط الأسبوع</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>تحديد مدة الشاشة اليومية بقفل PIN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>رصد نقاط القوة والمهارات التي تحتاج تدريباً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>تقارير تقدم المواد (الرياضيات، القراءة، العلوم)</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onEnterRole('parent');
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'فتح لوحة ولي الأمر' : 'Open Parent Dashboard'}
              </button>
            </div>

            {/* Teacher Pillar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-3xl block mb-3">👩‍🏫</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {lang === 'ar' ? 'بوابة المعلمات وإدارة الروضة' : 'Teacher Portal'}
                </h3>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>متابعة فصول الروضة وقوائم الطلاب</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>إسناد الأنشطة والألعاب ومتابعة الإكمال</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>إدارة ونشر المحتوى التعليمي عبر الـ CMS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>فرز الطلاب الذين يحتاجون لدعم إضافي</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onEnterRole('teacher');
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'دخول بوابة المعلم' : 'Open Teacher Portal'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar' ? 'كل ما يهمك معرفته حول منصة براعم القصيم' : 'Everything you need to know about the platform'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => {
                    sound.playClick();
                    setOpenFaqIndex(isOpen ? null : index);
                  }}
                  className="w-full p-4 text-start flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span>{lang === 'ar' ? faq.qAr : faq.qEn}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {lang === 'ar' ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-400 space-y-2">
        <p>
          {lang === 'ar'
            ? 'منصة براعم القصيم التعليمية © 2026 — مصممة لرياض الأطفال في منطقة القصيم، المملكة العربية السعودية.'
            : 'Baraem Qassim Kindergarten Learning Hub © 2026 — Built for Kindergarten Education in Qassim, Saudi Arabia.'}
        </p>
        <p className="text-[11px] text-slate-400">
          {lang === 'ar'
            ? 'متوافقة مع معايير حماية بيانات الطفل وأفضل ممارسات تكنولوجيا التعليم المبكر.'
            : 'Compliant with child privacy safeguards and early childhood development principles.'}
        </p>
      </footer>
    </div>
  );
};
