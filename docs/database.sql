-- PostgreSQL 16+ starting schema. Review and apply through versioned migrations.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE tenant (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE user_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  entra_object_id text NOT NULL,
  email text NOT NULL,
  display_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('learner','instructor','content_admin','tenant_admin')),
  plant_code text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, entra_object_id),
  UNIQUE (tenant_id, email)
);

CREATE TABLE learning_path (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  slug text NOT NULL,
  title text NOT NULL,
  target_role text NOT NULL,
  description text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

CREATE TABLE path_level (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id uuid NOT NULL REFERENCES learning_path(id) ON DELETE CASCADE,
  level_number smallint NOT NULL CHECK (level_number BETWEEN 1 AND 20),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  UNIQUE (path_id, level_number)
);

CREATE TABLE course (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  path_level_id uuid REFERENCES path_level(id) ON DELETE SET NULL,
  slug text NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  estimated_minutes integer NOT NULL DEFAULT 0 CHECK (estimated_minutes >= 0),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

CREATE TABLE lesson (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  sequence_number integer NOT NULL CHECK (sequence_number > 0),
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  video_uri text,
  estimated_minutes integer NOT NULL DEFAULT 0 CHECK (estimated_minutes >= 0),
  UNIQUE (course_id, sequence_number)
);

CREATE TABLE enrollment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  user_id uuid NOT NULL REFERENCES user_profile(id),
  course_id uuid NOT NULL REFERENCES course(id),
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','withdrawn')),
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (user_id, course_id)
);

CREATE TABLE lesson_progress (
  enrollment_id uuid NOT NULL REFERENCES enrollment(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lesson(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  last_position_seconds integer NOT NULL DEFAULT 0 CHECK (last_position_seconds >= 0),
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (enrollment_id, lesson_id)
);

CREATE TABLE quiz (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  title text NOT NULL,
  pass_percent smallint NOT NULL DEFAULT 80 CHECK (pass_percent BETWEEN 0 AND 100)
);

CREATE TABLE quiz_question (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
  sequence_number integer NOT NULL,
  question_type text NOT NULL CHECK (question_type IN ('single_choice','multiple_choice','true_false','short_answer')),
  prompt text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  answer_key jsonb NOT NULL,
  explanation text NOT NULL DEFAULT '',
  UNIQUE (quiz_id, sequence_number)
);

CREATE TABLE quiz_attempt (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  quiz_id uuid NOT NULL REFERENCES quiz(id),
  user_id uuid NOT NULL REFERENCES user_profile(id),
  score_percent numeric(5,2) NOT NULL CHECK (score_percent BETWEEN 0 AND 100),
  passed boolean NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE certificate (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  user_id uuid NOT NULL REFERENCES user_profile(id),
  course_id uuid NOT NULL REFERENCES course(id),
  issued_at timestamptz NOT NULL DEFAULT now(),
  credential_code text NOT NULL UNIQUE,
  UNIQUE (user_id, course_id)
);

CREATE TABLE tech_document (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  title text NOT NULL,
  category text NOT NULL,
  file_name text NOT NULL,
  media_type text NOT NULL,
  blob_uri text NOT NULL,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  status text NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review','approved','rejected','archived')),
  uploaded_by uuid NOT NULL REFERENCES user_profile(id),
  approved_by uuid REFERENCES user_profile(id),
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, blob_uri, version)
);

CREATE TABLE document_tag (
  document_id uuid NOT NULL REFERENCES tech_document(id) ON DELETE CASCADE,
  tag text NOT NULL,
  PRIMARY KEY (document_id, tag)
);

CREATE TABLE document_bookmark (
  user_id uuid NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES tech_document(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, document_id)
);

CREATE TABLE equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  plant_code text NOT NULL,
  equipment_code text NOT NULL,
  name text NOT NULL,
  manufacturer text,
  model text,
  category text NOT NULL,
  UNIQUE (tenant_id, plant_code, equipment_code)
);

CREATE TABLE alarm_guide (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id uuid REFERENCES equipment(id) ON DELETE SET NULL,
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  alarm_code text NOT NULL,
  symptom text NOT NULL,
  possible_causes jsonb NOT NULL DEFAULT '[]'::jsonb,
  checks jsonb NOT NULL DEFAULT '[]'::jsonb,
  corrective_actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  preventive_actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  severity text NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE case_study (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  title text NOT NULL,
  problem text NOT NULL,
  analysis jsonb NOT NULL DEFAULT '{}'::jsonb,
  five_why jsonb NOT NULL DEFAULT '[]'::jsonb,
  fishbone jsonb NOT NULL DEFAULT '{}'::jsonb,
  root_cause text NOT NULL,
  countermeasures jsonb NOT NULL DEFAULT '[]'::jsonb,
  lesson_learned text NOT NULL DEFAULT '',
  impact_metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_by uuid NOT NULL REFERENCES user_profile(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_chunk (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenant(id),
  document_id uuid NOT NULL REFERENCES tech_document(id) ON DELETE CASCADE,
  document_version integer NOT NULL,
  chunk_number integer NOT NULL,
  source_page integer,
  source_section text,
  content_hash text NOT NULL,
  indexed_at timestamptz,
  UNIQUE (document_id, document_version, chunk_number)
);

CREATE INDEX ix_course_published ON course (tenant_id, category) WHERE status = 'published';
CREATE INDEX ix_enrollment_user_status ON enrollment (tenant_id, user_id, status);
CREATE INDEX ix_document_tenant_status ON tech_document (tenant_id, status, created_at DESC);
CREATE INDEX ix_alarm_tenant_code ON alarm_guide (tenant_id, alarm_code);
CREATE INDEX ix_equipment_tenant_model ON equipment (tenant_id, model);
CREATE INDEX ix_case_tenant_status ON case_study (tenant_id, status, created_at DESC);
CREATE INDEX ix_quiz_attempt_user ON quiz_attempt (tenant_id, user_id, submitted_at DESC);
