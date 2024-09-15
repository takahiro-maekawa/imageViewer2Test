-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "image";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image"."__diesel_schema_migrations" (
	"version" varchar(50) PRIMARY KEY NOT NULL,
	"run_on" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image"."app_user" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"dataowner" varchar(255) DEFAULT 'system',
	"regist_date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"enable_start_date" timestamp DEFAULT '1970-01-01 00:00:00',
	"enable_end_date" timestamp DEFAULT '9999-12-31 23:59:59',
	"version" bigint DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image"."permission_allocation" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"team_id" bigint,
	"ordinary_read" boolean DEFAULT false,
	"hyper_read" boolean DEFAULT false,
	"auth_read" boolean DEFAULT false,
	"ordinary_write" boolean DEFAULT false,
	"hyper_write" boolean DEFAULT false,
	"auth_write" boolean DEFAULT false,
	"dataowner" varchar(255) DEFAULT 'system',
	"regist_date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"enable_start_date" timestamp DEFAULT '1970-01-01 00:00:00',
	"enable_end_date" timestamp DEFAULT '9999-12-31 23:59:59',
	"version" bigint DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image"."app_team" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"api_key" varchar(255) NOT NULL,
	"dataowner" varchar(255) DEFAULT 'system',
	"regist_date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"enable_start_date" timestamp DEFAULT '1970-01-01 00:00:00',
	"enable_end_date" timestamp DEFAULT '9999-12-31 23:59:59',
	"version" bigint DEFAULT 1
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image"."permission_allocation" ADD CONSTRAINT "permission_allocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "image"."app_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image"."permission_allocation" ADD CONSTRAINT "permission_allocation_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "image"."app_team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/