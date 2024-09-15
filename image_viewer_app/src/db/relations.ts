import { relations } from "drizzle-orm/relations";
import { appUserInImage, permissionAllocationInImage, appTeamInImage } from "./schema";

export const permissionAllocationInImageRelations = relations(permissionAllocationInImage, ({one}) => ({
	appUserInImage: one(appUserInImage, {
		fields: [permissionAllocationInImage.userId],
		references: [appUserInImage.id]
	}),
	appTeamInImage: one(appTeamInImage, {
		fields: [permissionAllocationInImage.teamId],
		references: [appTeamInImage.id]
	}),
}));

export const appUserInImageRelations = relations(appUserInImage, ({many}) => ({
	permissionAllocationInImages: many(permissionAllocationInImage),
}));

export const appTeamInImageRelations = relations(appTeamInImage, ({many}) => ({
	permissionAllocationInImages: many(permissionAllocationInImage),
}));