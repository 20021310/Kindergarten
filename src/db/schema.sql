-- ==============================================================================
-- BARA'EM QASSIM KINDERGARTEN LEARNING PLATFORM
-- Relational Database Schema (PostgreSQL / Google Cloud SQL)
-- ==============================================================================

-- 1. User Accounts (Parents, Teachers, Admins)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('parent', 'teacher', 'admin')),
    parent_pin_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Kindergarten Classes (Qassim Education Region)
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    school_name VARCHAR(255) NOT NULL DEFAULT 'روضة النخيل النموذجية - بريدة',
    school_name_ar VARCHAR(255) NOT NULL DEFAULT 'روضة النخيل النموذجية - بريدة',
    grade_level VARCHAR(50) NOT NULL DEFAULT 'KG2',
    teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Children Profiles (Parent-Controlled Accounts)
CREATE TABLE IF NOT EXISTS children (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    age INT NOT NULL CHECK (age >= 3 AND age <= 7),
    gender VARCHAR(10) CHECK (gender IN ('boy', 'girl')),
    avatar_url TEXT,
    stars INT NOT NULL DEFAULT 0,
    current_streak INT NOT NULL DEFAULT 0,
    lessons_completed INT NOT NULL DEFAULT 0,
    accuracy NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    study_time_minutes INT NOT NULL DEFAULT 0,
    screen_time_limit_minutes INT NOT NULL DEFAULT 45,
    screen_time_used_minutes INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Educational Activities & Curriculum Content
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('math', 'language', 'brain', 'attention', 'video')),
    difficulty_level INT NOT NULL CHECK (difficulty_level BETWEEN 1 AND 4),
    description TEXT,
    description_ar TEXT NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 3,
    stars_reward INT NOT NULL DEFAULT 10,
    skill_name_ar VARCHAR(255) NOT NULL,
    thumbnail_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Activity Completion Records & Attempts
CREATE TABLE IF NOT EXISTS activity_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    accuracy NUMERIC(5, 2) NOT NULL,
    duration_seconds INT NOT NULL,
    stars_earned INT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. YouTube Educational Sources & AI Generated Lessons
CREATE TABLE IF NOT EXISTS youtube_source_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_url TEXT NOT NULL,
    youtube_video_id VARCHAR(64) NOT NULL,
    source_title TEXT NOT NULL,
    source_channel TEXT,
    targeted_concept TEXT NOT NULL,
    raw_source_facts JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_explanation_script TEXT NOT NULL,
    ai_inferences JSONB NOT NULL DEFAULT '[]'::jsonb,
    narrator_voice_tone VARCHAR(50) NOT NULL DEFAULT 'kindergarten_warmth',
    subtitles_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    comprehension_checkpoint JSONB,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Badges & Gamification
CREATE TABLE IF NOT EXISTS badges (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_ar TEXT NOT NULL,
    icon VARCHAR(32) NOT NULL,
    badge_color VARCHAR(100) NOT NULL,
    required_stars INT NOT NULL DEFAULT 0
);

-- 8. Child Earned Badges
CREATE TABLE IF NOT EXISTS child_badges (
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    badge_id VARCHAR(64) REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (child_id, badge_id)
);

-- 9. Screen Time Logs & Daily Audits
CREATE TABLE IF NOT EXISTS screen_time_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    minutes_used INT NOT NULL DEFAULT 0,
    limit_minutes INT NOT NULL DEFAULT 45,
    locked_due_to_limit BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(child_id, log_date)
);

-- Indexes for Optimal Query Performance
CREATE INDEX IF NOT EXISTS idx_children_parent ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_class ON children(class_id);
CREATE INDEX IF NOT EXISTS idx_attempts_child ON activity_attempts(child_id);
CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);
CREATE INDEX IF NOT EXISTS idx_youtube_lessons_concept ON youtube_source_lessons(targeted_concept);
