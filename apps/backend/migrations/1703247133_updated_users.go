package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update
		edit_applications := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "b5rdxzku",
			"name": "applications",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "kt46al122joiha5",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": null,
				"displayFields": null
			}
		}`), edit_applications)
		collection.Schema.AddField(edit_applications)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update
		edit_applications := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "b5rdxzku",
			"name": "applications",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "kt46al122joiha5",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": null,
				"displayFields": null
			}
		}`), edit_applications)
		collection.Schema.AddField(edit_applications)

		return dao.SaveCollection(collection)
	})
}
