/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Applications = "applications",
	Files = "files",
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
	name: string
	tags?: null | Ttags
	user: RecordIdString
}

export type FilesRecord = {
	application: RecordIdString
	file: string
	meta: string
	tag: string
	update: string
	user: RecordIdString
	version: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ApplicationsResponse<Ttags = unknown, Texpand = unknown> = Required<ApplicationsRecord<Ttags>> & BaseSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	applications: ApplicationsRecord
	files: FilesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	applications: ApplicationsResponse
	files: FilesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'applications'): RecordService<ApplicationsResponse>
	collection(idOrName: 'files'): RecordService<FilesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
