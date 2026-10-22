// TEMPORARY MOCK QUESTIONS — only to demonstrate the interface. The real questions come from the backend team.
export const QUESTIONS_MOCK = {
  meta: { mock: true },
  questions: [
    { id: "q1", type: "single", required: true,
      text: { en: "What do you enjoy working on most?", ar: "إيه أكتر حاجة بتحب تشتغل عليها؟" },
      options: [
        { id: "a", label: { en: "Building apps and websites", ar: "بناء تطبيقات ومواقع" } },
        { id: "b", label: { en: "Analyzing data and finding patterns", ar: "تحليل البيانات واكتشاف الأنماط" } },
        { id: "c", label: { en: "Protecting systems from threats", ar: "حماية الأنظمة من الاختراق" } },
        { id: "d", label: { en: "Designing how things look and feel", ar: "تصميم شكل المنتج وتجربة استخدامه" } },
      ] },
    { id: "q2", type: "multiple", required: true, maxSelect: 3,
      text: { en: "Which of these do you like doing?", ar: "إيه الحاجات اللي بتحب تعملها؟" },
      options: [
        { id: "a", label: { en: "Solving logic puzzles", ar: "حل ألغاز ومسائل منطقية" } },
        { id: "b", label: { en: "Drawing or sketching ideas", ar: "الرسم وتجسيد الأفكار" } },
        { id: "c", label: { en: "Working with numbers and charts", ar: "الشغل على أرقام ورسومات بيانية" } },
        { id: "d", label: { en: "Testing things to see what breaks", ar: "تجربة الحاجات عشان أشوف إيه اللي بيبوّظ" } },
        { id: "e", label: { en: "Explaining ideas to other people", ar: "شرح الأفكار للناس" } },
      ] },
    { id: "q3", type: "single", required: true,
      text: { en: "How do you prefer to work?", ar: "بتحب تشتغل إزاي؟" },
      options: [
        { id: "a", label: { en: "Mostly on my own", ar: "لوحدي في الأغلب" } },
        { id: "b", label: { en: "In a small team", ar: "في فريق صغير" } },
        { id: "c", label: { en: "With lots of people", ar: "مع ناس كتير" } },
      ] },
    { id: "q4", type: "single", required: false,
      text: { en: "Where do you want to be in a year?", ar: "عايز تبقى فين بعد سنة؟" },
      options: [
        { id: "a", label: { en: "Landing my first job", ar: "أطلع على أول شغلانة" } },
        { id: "b", label: { en: "Switching to a new field", ar: "أغيّر مجالي" } },
        { id: "c", label: { en: "Growing in my current field", ar: "أتطوّر في مجالي الحالي" } },
      ] },
  ],
};
