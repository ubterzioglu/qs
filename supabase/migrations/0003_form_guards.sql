-- Defense-in-depth for the public (anon-INSERT) form tables.
-- Zod enforces these in the server action, but a bot could hit PostgREST directly
-- with the public anon key and bypass Zod — so enforce hard length caps at the DB
-- layer too. Prevents giant-row storage abuse; does not stop volume flooding
-- (rate limiting belongs at the edge/CDN, tracked in MIGRATION.md).

alter table contact_messages
  drop constraint if exists contact_len,
  add constraint contact_len check (
    length(first_name) <= 200 and length(last_name) <= 200 and
    length(email) <= 320 and length(coalesce(phone,'')) <= 60 and
    length(message) <= 4000
  );

alter table career_applications
  drop constraint if exists career_len,
  add constraint career_len check (
    length(first_name) <= 200 and length(last_name) <= 200 and
    length(email) <= 320 and length(coalesce(phone,'')) <= 60 and
    length(coalesce(dob,'')) <= 40 and length(coalesce(resume_url,'')) <= 1000
  );

alter table innoventure_applications
  drop constraint if exists innoventure_len,
  add constraint innoventure_len check (
    length(first_name) <= 200 and length(last_name) <= 200 and
    length(email) <= 320 and length(coalesce(phone,'')) <= 60 and
    length(company) <= 300 and length(position) <= 300 and
    length(country) <= 300 and length(project) <= 4000 and
    length(coalesce(cv_url,'')) <= 1000
  );

alter table startup_hub_submissions
  drop constraint if exists startup_len,
  add constraint startup_len check (
    length(first_name) <= 200 and length(last_name) <= 200 and
    length(email) <= 320 and length(coalesce(company,'')) <= 300 and
    length(coalesce(file_url,'')) <= 1000 and length(coalesce(message,'')) <= 4000
  );
