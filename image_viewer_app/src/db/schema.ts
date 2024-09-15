import { pgTable, pgSchema, varchar, timestamp, bigserial, bigint, foreignKey, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const image = pgSchema("image");



export const dieselSchemaMigrationsInImage = image.table("__diesel_schema_migrations", {
	version: varchar("version", { length: 50 }).primaryKey().notNull(),
	runOn: timestamp("run_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const appUserInImage = image.table("app_user", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	dataowner: varchar("dataowner", { length: 255 }).default('system'),
	registDate: timestamp("regist_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	enableStartDate: timestamp("enable_start_date", { mode: 'string' }).default('1970-01-01 00:00:00'),
	enableEndDate: timestamp("enable_end_date", { mode: 'string' }).default('9999-12-31 23:59:59'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	version: bigint("version", { mode: "number" }).default(1),
});

export const permissionAllocationInImage = image.table("permission_allocation", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	teamId: bigint("team_id", { mode: "number" }),
	ordinaryRead: boolean("ordinary_read").default(false),
	hyperRead: boolean("hyper_read").default(false),
	authRead: boolean("auth_read").default(false),
	ordinaryWrite: boolean("ordinary_write").default(false),
	hyperWrite: boolean("hyper_write").default(false),
	authWrite: boolean("auth_write").default(false),
	dataowner: varchar("dataowner", { length: 255 }).default('system'),
	registDate: timestamp("regist_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	enableStartDate: timestamp("enable_start_date", { mode: 'string' }).default('1970-01-01 00:00:00'),
	enableEndDate: timestamp("enable_end_date", { mode: 'string' }).default('9999-12-31 23:59:59'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	version: bigint("version", { mode: "number" }).default(1),
},
(table) => {
	return {
		permissionAllocationUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [appUserInImage.id],
			name: "permission_allocation_user_id_fkey"
		}),
		permissionAllocationTeamIdFkey: foreignKey({
			columns: [table.teamId],
			foreignColumns: [appTeamInImage.id],
			name: "permission_allocation_team_id_fkey"
		}),
	}
});

export const appTeamInImage = image.table("app_team", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	apiKey: varchar("api_key", { length: 255 }).notNull(),
	dataowner: varchar("dataowner", { length: 255 }).default('system'),
	registDate: timestamp("regist_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	enableStartDate: timestamp("enable_start_date", { mode: 'string' }).default('1970-01-01 00:00:00'),
	enableEndDate: timestamp("enable_end_date", { mode: 'string' }).default('9999-12-31 23:59:59'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	version: bigint("version", { mode: "number" }).default(1),
});