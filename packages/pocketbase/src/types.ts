/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Applications = "applications",
	Scripts = "scripts",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ApplicationsRecord<Ttags = unknown> = {
	description?: string
	is_banned?: boolean
	is_deprecated?: boolean
	is_private?: boolean
	is_verified?: boolean
	latest_version: string
	name: string
	scripts?: RecordIdString[]
	tags?: null | Ttags
	user?: RecordIdString
}

export type ScriptsRecord = {
	application?: RecordIdString
	tag?: string
	userscript_file?: string
	userscript_meta_file?: string
	userscript_update_file?: string
	version?: string
}

export type UsersRecord = {
	applications?: RecordIdString[]
	avatar?: string
	is_admin?: boolean
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ApplicationsResponse<Ttags = unknown, Texpand = unknown> = Required<ApplicationsRecord<Ttags>> & BaseSystemFields<Texpand>
export type ScriptsResponse<Texpand = unknown> = Required<ScriptsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	applications: ApplicationsRecord
	scripts: ScriptsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	applications: ApplicationsResponse
	scripts: ScriptsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'applications'): RecordService<ApplicationsResponse>
	collection(idOrName: 'scripts'): RecordService<ScriptsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
