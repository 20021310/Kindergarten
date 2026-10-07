import React, { useState } from 'react';
import {
  TeacherClass,
  ChildProfile,
  ClassAssignment,
  ActivityItem,
  Language,
  ActivityCategory
} from '../../types';
import { sound } from '../../services/sound';
import {
  Users,
  Plus,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  School,
  Search,
  Check
} from 'lucide-react';

interface TeacherDashboardProps {
  classes: TeacherClass[];
  childrenList: ChildProfile[];
  assignments: ClassAssignment[];
  activities: ActivityItem[];
  lang: Language;
  onCreateAssignment: (assignment: Omit<ClassAssignment, 'id' | 'completedStudentIds'>) => void;
  onAddActivity: (activity: ActivityItem) => void;
  onOpenAiStudio?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  classes,
  childrenList,
  assignments,
  activities,
  lang,
  onCreateAssignment,
  onAddActivity,
  onOpenAiStudio
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'roster' | 'assignments' | 'cms'>('roster');
  const [searchStudent, setSearchStudent] = useState('');

  // New assignment modal state
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);
  const [assignmentTitleAr, setAssignmentTitleAr] = useState('');
  const [assignmentActivityId, setAssignmentActivityId] = useState(activities[0]?.id || '');
  const [assignmentDueDate, setAssignmentDueDate] = useState('2026-10-18');

  // CMS state for adding activity
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [newActTitleAr, setNewActTitleAr] = useState('');
  const [newActTitleEn, setNewActTitleEn] = useState('');
  const [newActCategory, setNewActCategory] = useState<ActivityCategory>('math');
  const [newActLevel, setNewActLevel] = useState<1 | 2 | 3 | 4>(2);
  const [newActDuration, setNewActDuration] = useState(4);
  const [newActStars, setNewActStars] = useState(10);
  const [newActSkillAr, setNewActSkillAr] = useState('');

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classStudents = childrenList.filter(c => currentClass?.studentIds.includes(c.id));

  const filteredStudents = classStudents.filter(s =>
    s.nameAr.toLowerCase().includes(searchStudent.toLowerCase()) ||
    s.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const handleCreateAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitleAr.trim()) return;

    sound.playSuccess();
    const act = activities.find(a => a.id === assignmentActivityId);
    onCreateAssignment({
      title: assignmentTitleAr,
      titleAr: assignmentTitleAr,
      activityId: assignmentActivityId,
      classId: selectedClassId,
      category: act?.category || 'math',
      dueDate: assignmentDueDate,
      assignedDate: '2026-10-06'
    });
    setShowNewAssignmentModal(false);
    setAssignmentTitleAr('');
  };

  const handleCreateActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitleAr.trim()) return;

    sound.playSuccess();
    const newAct: ActivityItem = {
      id: `custom-act-${Date.now()}`,
      title: newActTitleEn || newActTitleAr,
      titleAr: newActTitleAr,
      category: newActCategory,
      level: newActLevel,
      description: 'Kindergarten educational challenge curated by teacher.',
      descriptionAr: 'نشاط تعليمي مخصص لرياض الأطفال أعدته معلمات روضة النخيل.',
      durationMinutes: newActDuration,
      starsReward: newActStars,
      thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
      iconName: 'Sparkles',
      skillName: newActSkillAr || 'Kindergarten Skill',
      skillNameAr: newActSkillAr || 'مهارة إثرائية',
      recommendedAge: '4-6 سنوات'
    };
    onAddActivity(newAct);
    setShowAddActivityModal(false);
    setNewActTitleAr('');
    setNewActTitleEn('');
    setNewActSkillAr('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
            <School className="w-4 h-4 text-emerald-600" />
            <span>{currentClass?.schoolNameAr}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'بوابة المعلمات وإدارة الروضة' : 'Kindergarten Teacher Portal'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'متابعة أداء الأطفال، إسناد الأنشطة والألعاب، وإدارة المحتوى التعليمي.'
              : 'Track child performance, assign playful activities, and manage kindergarten content.'}
          </p>
        </div>

        {/* Class Selector Dropdown */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-600 px-2">
            {lang === 'ar' ? 'الفصل:' : 'Class:'}
          </span>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => {
                sound.playClick();
                setSelectedClassId(cls.id);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                cls.id === selectedClassId
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              {lang === 'ar' ? cls.nameAr : cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('roster');
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roster' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>{lang === 'ar' ? 'قائمة الأطفال والأداء' : 'Student Roster'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('assignments');
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'assignments' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>{lang === 'ar' ? 'الواجبات والتحديات' : 'Assignments'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('cms');
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cms' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>{lang === 'ar' ? 'إدارة المحتوى (CMS)' : 'Content CMS'}</span>
          </button>

          {onOpenAiStudio && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenAiStudio();
              }}
              className="px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-xs flex items-center gap-1.5"
            >
              <span>✨</span>
              <span>{lang === 'ar' ? 'استوديو يوتيوب والذكاء الاصطناعي' : 'YouTube AI Studio'}</span>
            </button>
          )}
        </div>

        {activeTab === 'assignments' && (
          <button
            onClick={() => {
              sound.playClick();
              setShowNewAssignmentModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'إسناد نشاط جديد' : 'New Assignment'}</span>
          </button>
        )}

        {activeTab === 'cms' && (
          <button
            onClick={() => {
              sound.playClick();
              setShowAddActivityModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'إضافة نشاط للمكتبة' : 'Add Activity'}</span>
          </button>
        )}
      </div>

      {/* Tab 1: Student Roster */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="text-sm font-extrabold text-slate-900">
              {lang === 'ar'
                ? `طلاب ${currentClass?.nameAr} (${classStudents.length} أطفال)`
                : `Students in ${currentClass?.name} (${classStudents.length} children)`}
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute top-2.5 left-3 pointer-events-none" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder={lang === 'ar' ? 'البحث عن اسم الطفل...' : 'Search student...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="py-3 px-2 font-semibold">{lang === 'ar' ? 'الطفل' : 'Child'}</th>
                  <th className="py-3 px-2 font-semibold text-center">{lang === 'ar' ? 'النجوم' : 'Stars'}</th>
                  <th className="py-3 px-2 font-semibold text-center">{lang === 'ar' ? 'الأنشطة المكتملة' : 'Completed'}</th>
                  <th className="py-3 px-2 font-semibold text-center">{lang === 'ar' ? 'معدل الدقة' : 'Accuracy'}</th>
                  <th className="py-3 px-2 font-semibold">{lang === 'ar' ? 'توصيات واحتياج الممارسة' : 'Needs Practice'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.map((child) => (
                  <tr key={child.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-2 flex items-center gap-3">
                      <img
                        src={child.avatarUrl}
                        alt={child.nameAr}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-50"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {lang === 'ar' ? child.nameAr : child.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {child.age} {lang === 'ar' ? 'سنوات' : 'years'} · {child.gender === 'boy' ? '👦' : '👧'}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-2 text-center font-bold text-amber-600 font-mono">
                      ⭐ {child.stars}
                    </td>

                    <td className="py-3.5 px-2 text-center font-bold text-slate-700 font-mono">
                      {child.lessonsCompleted}
                    </td>

                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] ${
                        child.accuracy >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {child.accuracy}%
                      </span>
                    </td>

                    <td className="py-3.5 px-2">
                      {child.needsPracticeSkills.length > 0 ? (
                        <div className="flex items-center gap-1 text-[11px] text-amber-800">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate max-w-xs">{child.needsPracticeSkills[0]}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{lang === 'ar' ? 'متقن لكافة المفاهيم' : 'Mastered all concepts'}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">
            {lang === 'ar' ? 'الأنشطة المسندة للفصل' : 'Class Assignments'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((asg) => {
              const targetActivity = activities.find(a => a.id === asg.activityId);
              const completionRate = Math.round((asg.completedStudentIds.length / Math.max(1, classStudents.length)) * 100);

              return (
                <div key={asg.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">
                        {asg.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {lang === 'ar' ? asg.titleAr : asg.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {lang === 'ar' ? targetActivity?.titleAr : targetActivity?.title}
                      </p>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono">
                      تسليم: {asg.dueDate}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>{lang === 'ar' ? 'نسبة إكمال الطلاب:' : 'Completion:'}</span>
                      <span className="font-bold font-mono">{completionRate}% ({asg.completedStudentIds.length}/{classStudents.length})</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${completionRate}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Content Management System (CMS) */}
      {activeTab === 'cms' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {lang === 'ar' ? 'مكتبة المحتوى والأنشطة (CMS)' : 'Educational Content Management'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ar'
                  ? 'إجمالي الأنشطة المتاحة في منصة براعم القصيم: '
                  : 'Total active kindergarten activities: '}
                <span className="font-mono font-bold text-indigo-600">{activities.length}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activities.map((act) => (
              <div key={act.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {act.category} · المستوى {act.level}
                    </span>
                    <span className="text-xs text-amber-600 font-bold">
                      +{act.starsReward} ⭐
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">
                    {lang === 'ar' ? act.titleAr : act.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {lang === 'ar' ? act.descriptionAr : act.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{act.recommendedAge}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> {lang === 'ar' ? 'منشور' : 'Published'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Assignment Modal */}
      {showNewAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {lang === 'ar' ? 'إسناد نشاط جديد للفصل' : 'Assign New Activity'}
            </h3>

            <form onSubmit={handleCreateAssignmentSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'عنوان الواجب أو التحدي:' : 'Assignment Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={assignmentTitleAr}
                  onChange={(e) => setAssignmentTitleAr(e.target.value)}
                  placeholder="مثال: تحدي الجمع لروضة 2"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'اختر النشاط من المكتبة:' : 'Select Activity:'}
                </label>
                <select
                  value={assignmentActivityId}
                  onChange={(e) => setAssignmentActivityId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {activities.map((a) => (
                    <option key={a.id} value={a.id}>
                      {lang === 'ar' ? a.titleAr : a.title} ({a.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'تاريخ الاستحقاق:' : 'Due Date:'}
                </label>
                <input
                  type="date"
                  value={assignmentDueDate}
                  onChange={(e) => setAssignmentDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-hidden"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewAssignmentModal(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إسناد الآن' : 'Assign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Activity Modal (CMS) */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {lang === 'ar' ? 'إضافة نشاط تعليمي جديد (CMS)' : 'Add Kindergarten Activity'}
            </h3>

            <form onSubmit={handleCreateActivitySubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'العنوان بالعربية:' : 'Title (Arabic):'}
                </label>
                <input
                  type="text"
                  required
                  value={newActTitleAr}
                  onChange={(e) => setNewActTitleAr(e.target.value)}
                  placeholder="مثال: مطابقة الأشكال الهندسية في واحة بريدة"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'المجال / الفئة:' : 'Category:'}
                </label>
                <select
                  value={newActCategory}
                  onChange={(e) => setNewActCategory(e.target.value as ActivityCategory)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white outline-hidden"
                >
                  <option value="math">رياضيات وعد (Math)</option>
                  <option value="language">حروف ولغة (Language)</option>
                  <option value="brain">نادي الذكاء والذاكرة (Brain Gym)</option>
                  <option value="attention">قوة الملاحظة (Attention)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'المستوى (1-4):' : 'Level (1-4):'}
                  </label>
                  <select
                    value={newActLevel}
                    onChange={(e) => setNewActLevel(Number(e.target.value) as 1 | 2 | 3 | 4)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value={1}>المستوى 1 (KG1)</option>
                    <option value={2}>المستوى 2 (KG2)</option>
                    <option value={3}>المستوى 3 (متقدم)</option>
                    <option value={4}>المستوى 4 (تحدي)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'مكافأة النجوم:' : 'Stars Reward:'}
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={newActStars}
                    onChange={(e) => setNewActStars(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'ar' ? 'اسم المهارة المستهدفة:' : 'Target Skill:'}
                </label>
                <input
                  type="text"
                  value={newActSkillAr}
                  onChange={(e) => setNewActSkillAr(e.target.value)}
                  placeholder="مثال: تمييز المثلث والمربع"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'نشر النشاط' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
